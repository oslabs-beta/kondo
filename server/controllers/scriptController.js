const fs = require('fs');

// the name of the script to be saved or executed
const scriptName = process.argv[3];

// take the URL to open in Puppeteer from the input script parameter
let inputURL;
if (process.argv[4]) {
  inputURL = process.argv[4];
}

exports.storeScript = (req, res, next) => {
  let input = req.body.code;
  // sanitize the puppeteer script sent from the chrome extension
  // remove the first two lines containing the URL and viewport information
  let newString = input.slice(input.indexOf(`)`) + 1);
  // replace blank lines with semi-colons
  newString = newString
    .slice(newString.indexOf(`)`) + 3)
    .replace(/\)\n/g, ');');
  // build an object containing the url and sanitized puppeteer script
  let newScript = `exports.${scriptName} = {
    url: '${inputURL}',
    func: async (page) => {${newString}  }
  }

  `;
  // add the object locally to the userscripts file
  fs.appendFile(
    path.join(__dirname, './userscripts.js'),
    newScript,
    'utf-8',
    function(err) {
      if (err) next(err);
      console.log(
        `Saved successfully! You can run this test by entering "npm start -- run ${scriptName}"`,
      );
      next();
    },
  );
}
