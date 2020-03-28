exports.newScript = { 
    url: 'http://localhost:3000',
    func: async (page) => { 
  await page.waitForSelector('body > #leak-button');  await page.click('body > #leak-button');  
  } 
  }
    
  