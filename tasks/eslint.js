'use strict';

const gulp = require('gulp');
const $ = require('gulp-load-plugins')();

module.exports = function (options) {
    return function () {
        return gulp.src([options.src]).pipe($.eslint()).pipe($.eslint.format()).pipe($.eslint.failAfterError());
    };
};
