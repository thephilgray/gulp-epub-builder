const gulp = require("gulp");
const pug = require("gulp-pug");
const rename = require("gulp-rename");
const uuidv5 = require("uuid/v5");
const constants = require("../constants");

module.exports = sharedAPI => {
  return function package(done) {
    const { book, pages } = sharedAPI.getBookAndPagesData();
    const assets = sharedAPI.getAssetsArray();

    return gulp
      .src(constants.PACKAGE_TEMPLATE_PATH)
      .pipe(
        pug({
          doctype: "xml",
          pretty: true,
          locals: {
            assets,
            book: {
              ...book,
              modified: constants.MODIFIED_DATE,
              identifier: {
                text: uuidv5(book.title, constants.IDENTIFIER_NAMESPACE),
                scheme: "URN"
              }
            },
            pages
          }
        })
      )
      .pipe(rename(`content.opf`))
      .pipe(gulp.dest(constants.CONTENT_PATH));
    done();
  };
};
