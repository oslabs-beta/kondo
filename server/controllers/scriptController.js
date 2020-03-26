const puppeteer = require('puppeteer');
const pathToExtension = require('path').join(__dirname, '../../extension');
const scripts = require('../userscripts.js');

// RUN THIS TO RECORD USER ACTIONS FROM BROWSER AND CREATE PUPPET SCRIPT
const createScript = async (name, inputURL) => {
  if (scripts[name]) {
    console.log('That script name already exists. Please try a new one.');
    process.exit(0);
  } else {
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
  }
};

// RUN THIS AFTER RECORDING PUPPET SCRIPT
// launch puppeteer headless and open the page provided by the user
const runScript = async (script) => {
  console.log('RUN SCRIPT');
  let browser = await puppeteer.launch();
  let context = await browser.createIncognitoBrowserContext();
  let page = await context.newPage();
  await page.goto(scripts[script].url);
  await page.content();

  let count = 0;

  try {
    while (count < 7) {
      // Do something a couple of times. (insert recorded puppeteer scripts here)
      scripts[script].func();
      count++;
    }
  } catch (err) {
    console.log('ERROR: ', err);
  }
  browser.close();
  process.exit(0);
};

module.exports = {
  createScript, runScript
}