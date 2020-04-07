const fs = require("fs");
const path = require("path");
const scriptName = process.argv[3];
const inputURL = process.argv[4];
const { Runs, Scripts } = require("../models/models");

const trimScript = (input) => {
  // remove first two lines containing URL and viewport info, replace blank lines with semicolons
  let newString = input.slice(input.indexOf(`}`) + 3).replace(/\)\n/g, ");");
  // build an object containing the url and sanitized puppeteer script
  return `exports.${scriptName} = {
  url: '${inputURL}',
  func: async (page) => {${newString}  }
}

`;
};

const scriptController = {};

scriptController.postScript = (req, res, next) => {
  Scripts.create(
    {
      name: scriptName,
      script: `${req.body.code}`,
    },
    (err, scriptData) => {
      if (err) return next(err);
      console.log(
        `Saved successfully! You can run this test by entering "npm start -- run ${scriptName}"`
      );
      return next();
    }
  )
}

// scriptController.storeScript = (req, res, next) => {
//   // call helper function to process and return new script string
//   console.log('script:' + req.body.code);
//   let newScript = trimScript(req.body.code);
//   // add the object locally to the userscripts file
//   fs.appendFile(
//     path.join(__dirname, "../userscripts.js"),
//     newScript,
//     "utf-8",
//     function (err) {
//       if (err) next(err);
//       console.log(
//         `Saved successfully! You can run this test by entering "npm start -- run ${scriptName}"`
//       );
//       next();
//     }
//   );
// };

module.exports = scriptController;
