const puppeteer = require("puppeteer");
const pathToExtension = require("path").join(__dirname, "../extension");
const scripts = require("./userscripts.js");

// RECORD USER ACTIONS FROM BROWSER AND CREATE PUPPET SCRIPT
exports.createScript = async (name, inputURL) => {
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
