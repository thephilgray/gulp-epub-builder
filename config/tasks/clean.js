const gulp = require('gulp');
const del = require('del');
const constants = require('../constants.js');

module.exports = () => del([constants.CONTENT_PATH]);
