const puppeteer = require('puppeteer');
const parser = require('heapsnapshot-parser');

const heapController = {};

heapController.getData = async (req, res, next) => {
  // launch puppeteer browser, create CDP session, and navigate to inputted url
  const browser = await puppeteer.launch({ headless: false, devtools: true });
  const page = (await browser.pages())[0];
  const client = await page.target().createCDPSession();
  await client.send('Page.navigate', { url: inputURL });

  // enable CDP domains necessary for data collection
  await client.send('Page.enable');
  await client.send('HeapProfiler.enable');
  await client.send('Runtime.enable');
  await client.send('HeapProfiler.startTrackingHeapObjects');

  // wait for page to load before running code
  client.on('Page.loadEventFired', async () => {
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
      });
    }

    async function functionName() {
      await collect();
      res.locals.heapUsageOverTime = {
        time: time,
        heapUsage: heapUsage,
        totalHeapSize: runtime.totalSize,
      };
      res.locals.memoryLeaks = {
        snapshots: snapshots,
      };
    }

    functionName();
    next();
  });
};
