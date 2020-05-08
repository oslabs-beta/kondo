# kondo (BETA)

Identify potential memory leaks in your Javascript applications.

View useful memory metrics and changes over time.

Save all of your browser actions and state changes so you only have to do them once.

## Getting Started

Install our npm package

`npm install kondo`

To create a script to be reproduced within Puppeteer and analyzed for memory leaks, run:

`npm run record <scriptName> <url>`

This will load your site into a browser with a customized version of the Puppeteer Recorder Chrome extension (https://github.com/checkly/puppeteer-recorder). 
Click on the extension and press 'Start' to begin recording. 
Begin toggling visual states and performing any actions within your site that don't trigger a reload of the page. 
Press 'Stop' in the extension when finished to end recording and store a Puppeteer script to your local userscripts.js file automatically.

To run an existing script and analyze your page for memory leaks, run:

`npm run script <scriptName>`

Open http://localhost:8000 to view your results. It can take 30-60 seconds to finish loading.

## Built with:

* [React](https://reactjs.org/)
* [Node](https://nodejs.org/)
* [Express](https://expressjs.com/)
* [Chart.js](https://www.chartjs.org/)
* [Puppeteer](https://developers.google.com/web/tools/puppeteer)

## Contributors:

* **Dakota Gilbreath** - [GitHub](https://github.com/dgilbrea92)
* **Yena Choi** - [GitHub](http://github.com/cychoi00)
* **Andie Ritter** - [GitHub](https://github.com/andieritter)
* **Ashley Austin** - [GitHub](https://github.com/mraustin2u)
* **Elizabeth Soto** - [GitHub](https://github.com/elizabeth87)

