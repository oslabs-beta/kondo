#!/usr/bin/env node
const express = require('express');
const path = require('path');
const fs = require('fs');
const { createScript, runScript } = require('./controllers/scriptController');
const { getData } = require('./controllers/heapController');

const app = express();
const PORT = 8000;

// determines whether to save a new script or run an existing one in headless mode
const runMode = process.argv.slice(2)[0];

// the name of the script to be saved or executed
const scriptName = process.argv.slice(3)[0];

// take the URL to open in Puppeteer from the input script parameter
let inputURL;
if (process.argv.slice(4)[0]) {
  inputURL = process.argv.slice(4)[0];
}

// handle input parameters
if (!runMode) {
  console.log(
    'Please enter "npm start -- create scriptName url" to create a new script, or "npm start -- run scriptName" to run an existing one.',
  );
} else
  switch (runMode) {
    case 'create':
      // expects npm start -- create scriptName URL
      // if scriptName and URL exist, run createScript and write to userscripts.js
      if (scriptName && inputURL) {
        // START SERVER
        createScript(scriptName, inputURL);
      }
      // else print syntax explanation
      else
        console.log(
          "Please enter the name of the script you'd like to create followed by the page URL.",
        );
      break;
    case 'run':
      // expects npm start -- run scriptName
      if (scriptName) {
        app.listen(PORT, () => console.log('kondo listening on port ' + PORT));
        // runScript(scriptName);
      }
      // else print syntax explanation
      else console.log("Please enter the name of the script you'd like to run");
      break;
    default:
      console.log(
        'Please enter "npm start -- create scriptName url" to create a new script, or "npm start -- run scriptName" to run an existing one.',
      );
  }

// *** SERVER ROUTES *** //
app.use(express.json());

// static files
app.use('/assets', express.static(path.join(__dirname, '../assets')));

app.post('/code', (req, res) => {
  // sanitize the puppeteer script sent from the chrome extension
  let input = req.body.code;
  // remove the first two lines containing the URL and viewport information
  let newString = input.slice(input.indexOf(`)`) + 1);
  // replace blank lines with semi-colons
  newString = newString
    .slice(newString.indexOf(`)`) + 3)
    .replace(/\)\n/g, ');');
  let newScript = `exports.${scriptName} = { 
    url: '${inputURL}',
    func: async () => {${newString}  } 
  }
    
  `;
  fs.appendFile(
    path.join(__dirname, './userscripts.js'),
    newScript,
    'utf-8',
    function(err) {
      if (err) throw err;
      console.log(
        'Saved successfully! You can run this test by entering "npm start -- run ' +
          scriptName +
          '"',
      );
      res.status(200).send('OK');
      process.exit(0);
    },
  );
});

app.get('/data', getData, (req, res) => {
  res.json(res.locals);
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});
