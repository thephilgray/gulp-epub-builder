const gulp = require("gulp");
const sharedAPI = require("./sharedAPI");
const pages = require("./tasks/pages");
const scripts = require("./tasks/scripts");
const styles = require("./tasks/styles");
const media = require("./tasks/media");
const package = require("./tasks/package");

const build = gulp.series(
  pages(sharedAPI),
  scripts(sharedAPI),
  styles(sharedAPI),
  media(sharedAPI),
  package(sharedAPI)
);
const dev = gulp.series(build);
const publish = gulp.series(build);

module.exports = {
  default: build,
  build,
  dev,
  publish
};
