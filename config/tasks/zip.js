const fs = require('fs');
const path = require('path');
const epubZip = require('epub-zip');
const dateFormat = require('date-fns/format');
const minimist = require('minimist');
const constants = require('../constants.js');

module.exports = (sharedAPI, date) => {
  const book = sharedAPI.getBookData();
  let filename = `${constants.DIST_PATH}/${book.name}`;

  // sometimes you want to publish with a timestamp
  // run from cli as npm run publish -- --date
  let appendTimestamp = date || minimist(process.argv.slice(2)).date;
  if (appendTimestamp) {
    filename += `_${dateFormat(
      constants.MODIFIED_DATE.replace('Z', ''),
      'YYYYMMDD-hhmm'
    )}`;
  }

  return function zip(done) {
    if (!fs.existsSync(constants.DIST_PATH)) {
      fs.mkdirSync(constants.DIST_PATH);
    }

    const content = epubZip(constants.BUILDS_PATH);
    fs.writeFileSync(`${filename}.epub`, content);

    done();
  };
};
