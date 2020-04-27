'use strict';

const gulp = require('gulp');
const $ = require('gulp-load-plugins')();

module.exports = function (options) {
    return function () {
        return gulp
            .src(options.src)
            .pipe($.cached('img'))
            .pipe($.newer(options.dist))
            .pipe($.debug({title: 'DEBUG img'}))
            .pipe(
                $.imagemin({
                    interlaced: true,
                    progressive: true,
                    optimizationLevel: 5,
                })
            )
            .pipe(gulp.dest(options.dist));
    };
};
