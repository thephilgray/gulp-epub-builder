const gulp = require("gulp");
const constants = require("../constants");
const rollup = require("gulp-better-rollup");
const babel = require("rollup-plugin-babel");
const resolve = require("rollup-plugin-node-resolve");
const commonjs = require("rollup-plugin-commonjs");
const assetsParser = require("../plugins/gulp-assets-parser");

module.exports = sharedAPI =>
  function scripts(done) {
    return gulp
      .src(constants.SCRIPT_PATHS)
      .pipe(
        rollup({
          plugins: [
            babel({
              babelrc: false,
              presets: [["@babel/preset-env"]]
            }),
            resolve(),
            commonjs()
          ],
          format: "iife"
        })
      )
      .pipe(
        assetsParser({
          dependencies: constants.EXTENSIONS_MAP.map(ext => ext.name),
          cache: sharedAPI
        })
      )
      .pipe(gulp.dest(constants.CONTENT_PATH));
    done();
  };
