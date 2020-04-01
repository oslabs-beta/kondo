<<<<<<< HEAD
exports.startStop = {
  url: 'http://localhost:8080',
  func: async page => {
    await page.waitForSelector('body > #leak-button');
    await page.click('body > #leak-button');
    await page.waitForSelector('body > #stop-button');
    await page.click('body > #stop-button');
  },
};
exports.start = {
  url: 'http://localhost:8080',
  func: async (page) => {
    await page.waitForSelector('body > #leak-button'); await page.click('body > #leak-button');
  }
}



=======
>>>>>>> cd5d123d2b6a839d24075f532a616fc6fe0f5cd6
