// const fs = require("fs");
// const path = require("path");
const gulp = require('gulp');
const pug = require('gulp-pug');
const rename = require('gulp-rename');
const prettier = require('@o2team/gulp-prettier-eslint');
const constants = require('../constants');
const assetsParser = require('../plugins/gulp-assets-parser');

module.exports = assetsAPI => {
  return function pages(done) {
    const { book, pages } = assetsAPI.getBookAndPagesData();

    pages.forEach(page => {
      return gulp
        .src(`${constants.PAGE_TEMPLATES_PATH}/${page.template}.pug`)
        .pipe(
          pug({
            locals: {
              book,
              pages,
              ...page.data
            }
          })
        )
        .pipe(rename(`pages/${page.id}`))
        .pipe(
          assetsParser({
            dependencies: constants.EXTENSIONS_MAP.map(ext => ext.name),
            cache: assetsAPI
          })
        )
        .pipe(prettier())
        .pipe(gulp.dest(`${constants.CONTENT_PATH}`));
    });
    done();
  };
};
