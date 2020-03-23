const puppeteer = require('puppeteer');
const path = require('path');

const CLI = {};

// RUN THIS AFTER RECORDING PUPPET SCRIPT
// launch puppeteer headless and open the page provided by the user
CLI.runScript = async (script, inputURL) => {
  console.log('RUN SCRIPT');
  const browser = await puppeteer.launch({
    headless: false,
    args: [`--incognito`],
  });
  // const context = await browser.createIncognitoBrowserContext();
  const page = (await browser.pages())[0];
  await page.goto(inputURL);
  await page.content();

  let count = 0;
  while (count < 7) {
    // Do something a couple of times. (insert recorded puppeteer scripts here)
    await script(page);
    count += 1;
  }
  // context.close();
  browser.close();
};

// RUN THIS TO RECORD USER ACTIONS FROM BROWSER AND CREATE PUPPET SCRIPT
CLI.addScript = async inputURL => {
  console.log('RECORD SCRIPT');
  const pathToExtension = path.join(__dirname, '../extension');
  const browser = await puppeteer.launch({
    headless: false,
    args: [
      `--disable-extensions-except=${pathToExtension}`,
      `--load-extension=${pathToExtension}`,
      `--incognito`,
    ],
  });
  const page = (await browser.pages())[0];
  await page.goto(inputURL);
  await page.content();
};

module.exports = CLI;
