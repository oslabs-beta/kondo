const puppeteer = require('puppeteer');
const fs = require('fs');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const path = require('path');
const scripts = require('../userscripts.js');

// RUN THIS TO RECORD USER ACTIONS FROM BROWSER AND CREATE PUPPET SCRIPT
exports.createScript = async (name, inputURL) => {
  if (scripts[name]) {
    console.log('That script name already exists. Please try a new one.');
    process.exit(0);
  } else {
    const pathToExtension = require('path').join(__dirname, '../../extension');
    const browser = await puppeteer.launch({
      headless: false,
      args: [
        `--disable-extensions-except=${pathToExtension}`,
        `--load-extension=${pathToExtension}`,
      ],
    });
    const page = (await browser.pages())[0];
    await page.goto(inputURL);
    await page.content();
    exports.storeScript(name);
  }
};

// TAKE USER INPUT AND WRITE TO SCRIPT FILE
exports.storeScript = async name => {
  const input = [];

  console.log("Please enter the function you'd like to store then hit Ctrl+C");
  rl.prompt();

  rl.on('line', function(line) {
    input.push(line);
  });

  rl.on('close', function(cmd) {
    // build answer by making string from input array and then replacing the \n chars with spaces
    let answer = input.join('\n').replace(/\n  /g, '; ');
    // leave the spacing below intact to make sure the file formatting is correct
    let newScript = `exports.${name} = async () => {${answer}}

`;

    fs.appendFile(
      path.join(__dirname, '../userscripts.js'),
      newScript,
      'utf-8',
      function(err) {
        if (err) throw err;
        console.log('saved!');
        process.exit(0);
      },
    );
  });
};

// RUN THIS AFTER RECORDING PUPPET SCRIPT
// launch puppeteer headless and open the page provided by the user
exports.runScript = async (script, inputURL) => {
  console.log('RUN SCRIPT');
  let browser = await puppeteer.launch();
  let context = await browser.createIncognitoBrowserContext();
  let page = await context.newPage();
  await page.goto(inputURL);
  await page.content();

  let count = 0;

  try {
    while (count < 7) {
      // Do something a couple of times. (insert recorded puppeteer scripts here)
      scripts[script]();
      count++;
    }
  } catch (err) {
    console.log('ERROR: ', err);
  }
  // context.close();
  browser.close();
  process.exit(0);
};
