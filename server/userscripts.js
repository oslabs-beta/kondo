exports.newScript = { 
  url: 'http://localhost:3000',
  func: async () => { 
  await page.waitForSelector('body > #leak-button');  await page.click('body > #leak-button');  
  await page.waitForSelector('body > #leak-button');  await page.click('body > #leak-button');  
  await page.waitForSelector('body > #stop-button');  await page.click('body > #stop-button');  
  } 
}
  
