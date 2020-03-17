#!/usr/bin/env node
const express = require('express');
const puppeteer = require('puppeteer');
const app = express();
const path = require('path');
const fs = require('fs');
const scripts = require('./userscripts');

// take the URL to open in Puppeteer from the input script parameter
let inputURL = process.argv.slice(2)[0];

// determines whether to get a new script or run an existing one in headless mode
let runMode = process.argv.slice(3)[0];

// RUN THIS AFTER RECORDING PUPPET SCRIPT
// launch puppeteer headless and open the page provided by the user
const runScript = async (script) => {
  console.log('RUN SCRIPT');
  let browser = await puppeteer.launch();
  let context = await browser
      .createIncognitoBrowserContext();
  let page = await context.newPage();
  await page.goto(inputURL);
  await page.content();
  
  let count = 0;
  while (count < 7) {
    // Do something a couple of times. (insert recorded puppeteer scripts here)
    await script(page);
    count++;
  }
  // context.close();
  browser.close();
}

// RUN THIS TO RECORD USER ACTIONS FROM BROWSER AND CREATE PUPPET SCRIPT
const addScript = async () => {
  console.log('RECORD SCRIPT');
  const pathToExtension = require('path').join(__dirname, '../extension');
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
}

// handle input parameters
if (!inputURL) console.log('Please provide a URL to connect to e.g. npm start -- http://localhost:3000 <scriptName(optional)>');
else {
  app.listen(3999, () => console.log('kondo connected to server on port 3999'));

  if (!runMode) addScript();
  else if (runMode === '?') {
    console.log(Object.keys(scripts));
  }
  else {
    runScript(scripts[runMode]);
  }
}

//route handling
app.get('/index', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.js'));
})

app.use('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
})

module.exports = app;
