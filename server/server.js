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
    app.listen(PORT, () => console.log('kondo listening on port ' + PORT));
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
function logErrors (err, req, res, next) {
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

app.use('/assets', express.static(path.join(__dirname, '../assets')));

<<<<<<< HEAD
// post request for newly created user script
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
    func: async (page) => {${newString}  } 
  }
    
  `;
  fs.appendFile(
    path.join(__dirname, './userscripts.js'),
    newScript,
    'utf-8',
    function (err) {
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
=======
app.post('/code', scriptController.storeScript, (req, res) => {
  res.status(200).send('OK');
  process.exit(0);
>>>>>>> cd5d123d2b6a839d24075f532a616fc6fe0f5cd6
});

app.get('/data', heapController.getData, (req, res) => {
  res.json(res.locals);
  process.exit(0);
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});

module.exports = {
  scriptName,
  inputURL
}