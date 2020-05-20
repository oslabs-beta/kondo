const puppeteer = require("puppeteer");
const express = require('express');
const pathToExtension = require("path").join(__dirname, "../node_modules/kondo-recorder/build");
const scripts = require("./userscripts.js");
const scriptController = require('./controllers/scriptController');

const app = express();
const PORT = 8000;

app.use(express.json());

// RECORD USER ACTIONS FROM BROWSER AND CREATE PUPPET SCRIPT
const createScript = async (name, inputURL) => {
  if (!inputURL) {
    console.log("Please provide a URL to connect to.");
    process.exit(0);
  }
  if (scripts[name]) {
    console.log("That script name already exists. Please try a new one.");
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

app.post("/code", scriptController.storeScript, /*heapController.postHeap,*/(req, res) => {
  res.status(200).send("OK");
  process.exit(0);
}
);

// determines whether to save a new script or run an existing one in headless mode
const scriptName = process.argv[2];

// take the URL to open in Puppeteer from the input script parameter
let inputURL;
if (process.argv[3]) {
  inputURL = process.argv[3];
}

// handle input parameters
// if (!runMode) {
//   console.log(
//     'Please enter "npm start -- create scriptName url" to create a new script, or "npm start -- run scriptName" to run an existing one.'
//   );
// } else {
app.listen(PORT, () => { console.log('Kondo is listening on port ' + PORT) });
// expects 'npm start -- create scriptName URL' or 'npm start -- run scriptName'
// if (runMode == 'create') {
createScript(scriptName, inputURL);
// } else if (runMode != 'run') {
//   console.log(
//     'Please enter "npm start -- create scriptName url" to create a new script, or "npm start -- run scriptName" to run an existing one.',
//   );
// process.exit(0);
// }
// }



