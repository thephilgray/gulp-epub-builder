const gulp = require("gulp");
const constants = require("../constants");
const assetsParser = require("../plugins/gulp-assets-parser");

module.exports = sharedAPI => {
  return function media(done) {
    return gulp
      .src(constants.MEDIA_PATHS)
      .pipe(
        assetsParser({
          cache: sharedAPI
        })
      )
      .pipe(gulp.dest(constants.CONTENT_PATH));
    done();
  };
};
