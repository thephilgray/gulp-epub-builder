// const fs = require("fs");
// const path = require("path");
const gulp = require("gulp");
const pug = require("gulp-pug");
const rename = require("gulp-rename");
const prettier = require("@o2team/gulp-prettier-eslint");
const constants = require("../constants");
const assetsParser = require("../plugins/gulp-assets-parser");

module.exports = sharedAPI => {
  return function pages(done) {
    const { book, pages } = sharedAPI.getBookAndPagesData();

    pages.forEach(page => {
      return gulp
        .src(`${constants.PAGE_TEMPLATES_PATH}/${page.template}.pug`)
        .pipe(
          pug({
            locals: {
              book,
              ...page.data
            }
          })
        )
        .pipe(rename(`pages/${page.id}.xhtml`))
        .pipe(
          assetsParser({
            dependencies: constants.EXTENSIONS_MAP.map(ext => ext.name),
            cache: sharedAPI
          })
        )
        .pipe(prettier())
        .pipe(gulp.dest(`${constants.CONTENT_PATH}`));
    });
    done();
  };
};
