#!/usr/bin/env node
const express = require('express');
const path = require('path');
const CLI = require('./CLI');
const scripts = require('./userscripts');

const app = express();
const PORT = 3000;

console.log(process.argv);
// take the URL to open in Puppeteer from the input script parameter
const inputURL = process.argv.slice(2)[0];

// determines whether to get a new script or run an existing one in headless mode
const runMode = process.argv.slice(3)[0];

// handle input parameters
if (!inputURL)
  console.log(
    'Please provide a URL to connect to e.g. npm start -- http://localhost:3000 <scriptName(optional)>',
  );
else if (!runMode) CLI.addScript(inputURL);
else if (runMode === '?') console.log(Object.keys(scripts));
else {
  // CLI.runScript(scripts[runMode], inputURL);

  // start server --> route handling
  app.get('/client/index.js', (req, res) => {
    console.log('sent index.js');
    res.sendFile(path.join(__dirname, '../client/index.js'));
  });

  app.use('/', (req, res) => {
    console.log('sent index.html');
    res.sendFile(path.join(__dirname, '../index.html'));
  });

  // app.use('/', express.static('../index.html'));

  app.listen(PORT, () => {
    console.log(`kondo listening on port ${PORT}`);
  });
}

module.exports = app;
