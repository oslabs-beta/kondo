const puppeteer = require('puppeteer');
const fs = require('fs');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
const path = require('path');

// RUN THIS TO RECORD USER ACTIONS FROM BROWSER AND CREATE PUPPET SCRIPT
exports.createScript = async (name, inputURL) => {
  console.log('RECORD SCRIPT');
  const pathToExtension = require('path').join(__dirname, '../../extension');
  const browser = await puppeteer.launch({
    headless: false,
    args: [
      `--disable-extensions-except=${pathToExtension}`,
      `--load-extension=${pathToExtension}`
    ]
  });
  const page = await browser.newPage();
  await page.goto(inputURL);
  await page.content();
  exports.storeScript(name);
}

// TAKE USER INPUT AND WRITE TO SCRIPT FILE
exports.storeScript = async (name) => {
  let input = [];

  console.log('Please enter the function you\'d like to store');
  rl.prompt();

  rl.on('line', function (line) {
      input.push(line);
  })

  rl.on('close', function (cmd) {
    let answer = input.join('\n');
      
    fs.readFile(path.join(__dirname, '../userscripts.json'), function (err, data) {
      if (err) throw err;
      let json = JSON.parse(data);
      json[name] = { 
          arguments:'page', 
          body: answer.toString() 
      }
      fs.writeFile(path.join(__dirname, '../userscripts.json'), JSON.stringify(json), function(err) {
        if (err) throw err;
        console.log('saved!');
        process.exit(0);
      })
    })
  })
}
// may need to set up variables in global memory to get this working
var AsyncFunction = Object.getPrototypeOf(async function(){}).constructor;

// RUN THIS AFTER RECORDING PUPPET SCRIPT
// launch puppeteer headless and open the page provided by the user
exports.runScript = async (script, inputURL) => {
  
  console.log('RUN SCRIPT');
  let browser = await puppeteer.launch();
  let context = await browser
      .createIncognitoBrowserContext();
  let page = await context.newPage();
  await page.goto(inputURL);
  await page.content();

  let json = fs.readFileSync(path.join(__dirname, '../userscripts.json'))
  json = JSON.parse(json);
  // console.log('JSON: ', json);
  // remove \n before evaluation
  let body = json[script].body.replace(/\n  /g, ' ');
  // let asyncCb = new AsyncFunction(json[script].arguments, body);
  console.log(typeof body);
  let func = new AsyncFunction;
  
  console.log('JSON: ', json);    
  console.log('FUNC: ', func);
  // if (json) {
    let count = 0;
    // console.log(' json exists ')
    while (count < 7) {
      // Do something a couple of times. (insert recorded puppeteer scripts here)
      // await script(page);
      // eval(json[script].body);
      // eval("(async (page) => {" + json + "})()")
      // eval(json);
      // console.log('working?')
      func(page);
      count++;
    }
  // }
  
  // context.close();
  browser.close();
}