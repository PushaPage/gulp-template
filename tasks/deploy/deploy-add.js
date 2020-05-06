'use strict';

const gulp = require('gulp');

module.exports = function (options) {
    return function () {
        const deployConfig = require('./deploy-config')();
        const connect = deployConfig.connect;
        const path = deployConfig.path;

        return gulp
            .src(options.src, {base: './dist/fonts', buffer: false})
            .pipe(connect.newer(`${path}fonts`))
            .pipe(connect.dest(`${path}fonts`));
        // .pipe(connect.clean(`${path}fonts`, './dist/fonts'));
    };
};
