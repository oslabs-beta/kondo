const express = require('express');
const path = require('path');
const scriptController = require('./controllers/scriptController');
const { createScript } = require('./createScript');
const heapController = require('./controllers/heapController');
const app = express();
const PORT = 8000;

// determines whether to save a new script or run an existing one in headless mode
const runMode = process.argv[2];
const scriptName = process.argv[3];

// take the URL to open in Puppeteer from the input script parameter
let inputURL;
if (process.argv[4]) {
  inputURL = process.argv[4];
}

// handle input parameters
if (!runMode) {
  console.log(
    'Please enter "npm start -- create scriptName url" to create a new script, or "npm start -- run scriptName" to run an existing one.'
  );
} else {
  app.listen(PORT, () => console.log('Kondo is listening on port ' + PORT));
  // expects 'npm start -- create scriptName URL' or 'npm start -- run scriptName'
  if (runMode == 'create') {
    createScript(scriptName, inputURL);
  } else if (runMode != 'run') {
    console.log(
      'Please enter "npm start -- create scriptName url" to create a new script, or "npm start -- run scriptName" to run an existing one.',
    );
    process.exit(0);
  }
}

// *** ERROR HANDLING *** //
function logErrors(err, req, res, next) {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr);
  console.log(errorObj.log);
  res.status(errorObj.status).json(errorObj.message);
}

// *** SERVER ROUTES *** //
app.use(express.json());

// static files
app.use('/assets', express.static(path.join(__dirname, '../assets')));

app.post('/code', scriptController.storeScript, (req, res) => {
  res.status(200).send('OK');
  process.exit(0);
});

app.get('/data', heapController.getData, (req, res) => {
  res.json(res.locals);
  process.exit(0);
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});