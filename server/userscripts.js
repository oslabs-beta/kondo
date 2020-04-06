exports.newScript = {
  url: 'http://127.0.0.1:5500/index.html',
  func: async (page) => {  
  await page.waitForSelector('body > #leak-button');  await page.click('body > #leak-button');  
  }
}

