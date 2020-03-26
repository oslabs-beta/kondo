const puppeteer = require('puppeteer');
const parser = require('heapsnapshot-parser');

const getData = async (req, res, next) => {
  // launch puppeteer browser, create CDP session, and navigate to inputted url
  const browser = await puppeteer.launch({ headless: false, devtools: true });
  const page = (await browser.pages())[0];
  const client = await page.target().createCDPSession();
  await client.send('Page.navigate', { url: 'http://localhost:8080' });

  // enable CDP domains necessary for data collection
  await client.send('Page.enable');
  await client.send('HeapProfiler.enable');
  await client.send('Runtime.enable');
  await client.send('HeapProfiler.startTrackingHeapObjects');

  // wait for page to load before running code
  client.on('Page.loadEventFired', async ({ timestamp }) => {
    console.log('page loaded at ', timestamp);
    // variables for data collection
    let snap = '';
    const snapshots = [];
    let count = 1;
    let ms = 0;
    const time = [];
    const heapUsage = [];

    // listener for incoming heap snapshot chunks
    client.on('HeapProfiler.addHeapSnapshotChunk', ({ chunk }) => {
      snap += chunk;
    });

    // collect initial heap usage data
    let runtime = await client.send('Runtime.getHeapUsage');
    heapUsage.push(runtime.usedSize);
    time.push(ms);

    // collect data every 1000ms for 7 intervals
    function collect() {
      return new Promise(resolve => {
        const interval = setInterval(async () => {
          // run script
          runtime = await client.send('Runtime.getHeapUsage');
          heapUsage.push(runtime.usedSize);
          ms += 1000;
          time.push(ms);
          await client.send('HeapProfiler.takeHeapSnapshot');
          snapshots.push(parser.parse(snap).nodes);
          snap = '';
          count += 1;

          // break after 7 intervals
          if (count > 7) {
            clearInterval(interval);
            res.locals.heapUsageOverTime = {
              time: time,
              heapUsage: heapUsage,
              totalHeapSize: runtime.totalSize,
            };
            res.locals.memoryLeaks = {
              snapshots: snapshots,
            };
            resolve();
          }
        }, 1000);
      });
    }

    // analyze data collected
    function analyze() {
      return new Promise(resolve => {
        // set initial growth status of nodes in snapshot 1 to true
        // set intial growth status of nodes in all other snapshots to false
        for (let i = 0; i < snapshots.length; i++) {
          for (let node of snapshots[i]) {
            if (i === 0) node.growing = true;
            else node.growing = false;
          }
        }

        // compare each snapshot to previous snapshot and update growth status of nodes
        for (let i = 0; i < snapshots.length - 1; i++) {
          updateGrowthStatus(snapshots[i][0], snapshots[i + 1][0]);
        }

        // filter growing nodes
        const growing = findGrowing(snapshots[snapshots.length - 1]);
        for (let node of growing){
          try {
            const nodeDescription = await client.send(
              "HeapProfiler.getObjectByHeapObjectId", {objectId: node.id.toString()}
            )
          
          } catch (err){}
        }

      });
    }
    const updateGrowthStatus = function(root1, root2) {
      // using a breadth-first traversal, trace the shortest path to each node by edges
      const heapgraph1 = [root1];
      const heapgraph2 = [root2];
      const visit = new Set();
      visit.add(root1.id);

      while (heapgraph1.length > 0) {
        const node1 = heapgraph1.shift();
        const node2 = heapgraph2.shift();

        // if a node was previously marked as growing and the number of edges increased
        // from the previous snapshot, mark the node as growing
        if (
          node1.growing === true &&
          node1.references.length < node2.references.length
        ) {
          node2.growing = true;
        }

        // add nodes referenced out by the edges of the current node (breadth-first traversal) if
        // they follow same paths from the previous snapshot's heapgraph
        for (let i = 0; i < node1.references.length; i++) {
          const edge1 = node1.references[i];
          const edge2 = node2.references[i];
          if (
            edge1.name === edge2.name &&
            edge1.toNode.id === edge2.toNode.id &&
            !visit.has(edge1.toNode.id)
          ) {
            heapgraph1.push(edge1.toNode);
            heapgraph2.push(edge2.toNode);
            visit.add(edge1.toNode.id);
          }
        }
      }
    };

    const findGrowing = function(arr) {
      const growing = [];
      for (let node of arr) {
        if (node.growing) {
          growing.push(node);
        }
      }
      return growing;
    };

    async function functionName() {
      await collect();
      console.log('collect completed');
      await analyze();
    }

    functionName();
    next();
  });
};

module.exports = { getData };
