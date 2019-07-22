const gulp = require('gulp');
const sharedAPI = require('./sharedAPI');
const pages = require('./tasks/pages');
const scripts = require('./tasks/scripts');
const styles = require('./tasks/styles');
const media = require('./tasks/media');
const package = require('./tasks/package');
const clean = require('./tasks/clean');
const init = require('./tasks/init');
const devServer = require('./tasks/devServer');
const zip = require('./tasks/zip.js');
const constants = require('./constants');

const buildContent = gulp.series(
  clean,
  pages(sharedAPI),
  scripts(sharedAPI),
  styles(sharedAPI),
  media(sharedAPI),
  package(sharedAPI)
);

const build = gulp.series(init, buildContent);

const watchPug = () => gulp.watch(constants.ALL_PUG, buildContent);
const watchLess = () => gulp.watch(constants.ALL_LESS, buildContent);
const watchBabel = () => gulp.watch(constants.ALL_JS, buildContent);
const watchMedia = () => gulp.watch(constants.MEDIA_PATHS, buildContent);
const watchData = () => gulp.watch(constants.ALL_DATA, buildContent);

const dev = gulp.series(
  build,
  devServer,
  gulp.parallel(watchPug, watchLess, watchBabel, watchMedia, watchData)
);
const publish = gulp.series(build, zip(sharedAPI));

module.exports = {
  default: build,
  build,
  dev,
  publish
};
