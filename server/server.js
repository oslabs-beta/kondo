#!/usr/bin/env node
const express = require('express');
const path = require('path');
const CLI = require('./CLI');
const scripts = require('./userscripts');

const app = express();
const PORT = 3000;

// take the URL to open in Puppeteer from the input script parameter
const inputURL = process.argv.slice(2)[0];

// determines whether to get a new script or run an existing one in headless mode
const runMode = process.argv.slice(3)[0];

// handle input parameters
// if (!inputURL)
//   console.log(
//     'Please provide a URL to connect to e.g. npm start -- http://localhost:3000 <scriptName(optional)>',
//   );
// else if (!runMode) CLI.addScript(inputURL);
// else if (runMode === '?') console.log(Object.keys(scripts));
// else {
//   CLI.runScript(scripts[runMode], inputURL);

  // ***START SERVER - ROUTE HANDLING***

  // static files
  app.use('/assets', express.static(path.join(__dirname, '../assets')));

  app.get('/analytics', (req, res) => {
    // add middleware functions
    res.sendStatus(200);
  });

  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'));
  });

  app.listen(PORT, () => {
    console.log(`kondo listening on port ${PORT}`);
  });
// }

module.exports = app;
