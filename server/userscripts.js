module.exports = {
  startStop: async (page) => {
    await page.waitForSelector('body > #leak-button')
    await page.click('body > #leak-button')
    await page.waitForSelector('body > #stop-button')
    await page.click('body > #stop-button')
  }
}