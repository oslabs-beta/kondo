#!/usr/bin/env node
const express = require('express');
const path = require('path');
const action = require('./controllers/scriptController');

const app = express();
const PORT = 8000;

// determines whether to save a new script or run an existing one in headless mode
const runMode = process.argv.slice(2)[0];

// the name of the script to be saved or executed
const scriptName = process.argv.slice(3)[0];

// take the URL to open in Puppeteer from the input script parameter
const inputURL = process.argv.slice(4)[0];

// handle input parameters
<<<<<<< HEAD
// if (!runMode) {
//   console.log(
//     'Please enter "create" to make a new script or "run" to execute an existing one e.g. "npm start -- create/run scriptName url"',
//   );
// } else
//   switch (runMode) {
//     case 'create':
//       // expect npm start -- create scriptName URL
//       // if scriptName and URL exist, run createScript and write to userscripts.js
//       if (scriptName && inputURL) {
//         app.listen(PORT, () => console.log('kondo listening on port ' + PORT));
//         action.createScript(scriptName, inputURL);
//       }
//       // else print syntax explanation
//       else
//         console.log(
//           "Please enter the name of the script you'd like to create followed by the page URL.",
//         );
//       break;
//     case 'run':
// expect npm start -- run scriptName overrideURL(optional)
// if scriptName exists, execute runScript with overrideURL
// if (scriptName) {
// static files
app.use('/assets', express.static(path.join(__dirname, '../assets')));

app.post('/code', (req, res) => {
  console.log('REQUEST BODY: ' + req.body);
});

app.get('/analytics', (req, res) => {
  // add middleware functions
  res.sendStatus(200);
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});

app.listen(PORT, () => console.log('kondo listening on port ' + PORT));
// action.runScript(scriptName, inputURL);
//     }
//     // else print syntax explanation
//     else console.log("Please enter the name of the script you'd like to run");
//     break;
//   default:
//     console.log(
//       'Please enter "create" to make a new script or "run" to execute an existing one e.g. "npm start -- create/run scriptName url"',
//     );
// }
=======
// if (!inputURL)
//   console.log(
//     'Please provide a URL to connect to e.g. npm start -- http://localhost:3000 <scriptName(optional)>',
//   );
// else if (!runMode) CLI.addScript(inputURL);
// else if (runMode === '?') console.log(Object.keys(scripts));
// else {
//   CLI.runScript(scripts[runMode], inputURL);

  // ***START SERVER - ROUTE HANDLING***//

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
//}
>>>>>>> 10149507474d62a39c032f8d855514601ee6028f

module.exports = app;
