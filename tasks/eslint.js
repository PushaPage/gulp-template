'use strict';

const gulp = require('gulp');
const $ = require('gulp-load-plugins')();

module.exports = function (options) {
    return function () {
        return gulp
            .src([options.src])
            .pipe($.eslint())
            .pipe($.eslint.format())
            .pipe(
                $.eslint.result(result => {
                    if (result.warningCount) {
                        console.log('\x1b[33m', `# Eslint Warnings: ${result.warningCount}. FIX IT!`);
                    }

                    if (result.errorCount) {
                        console.log('\x1b[31m', `# Eslint Errors: ${result.errorCount}. FIX IT!`);
                    }
                })
            )
            .pipe($.eslint.failAfterError());
    };
};
