exports.newScriptThree = async () => {await page.waitForSelector('body > #leak-button'); await page.click('body > #leak-button'); ; await page.waitForSelector('body > #stop-button')}

exports.newScriptFour = async () => {console.log('test')}

exports.newScriptFive = async () => {await page.waitForSelector('body > #leak-button'); await page.click('body > #leak-button'); ; await page.waitForSelector('body > #leak-button'); await page.click('body > #leak-button'); ; await page.waitForSelector('body > #stop-button')}

