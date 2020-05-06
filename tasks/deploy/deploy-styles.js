'use strict';

const gulp = require('gulp');

module.exports = function (options) {
    return function () {
        const deployConfig = require('./deploy-config')();
        const connect = deployConfig.connect;
        const path = deployConfig.path;

        return gulp
            .src(options.src, {base: './dist/css', buffer: false})
            .pipe(connect.newer(`${path}css`))
            .pipe(connect.dest(`${path}css`));
        // .pipe(connect.clean(`${path}css`, './dist/css'));
    };
};
