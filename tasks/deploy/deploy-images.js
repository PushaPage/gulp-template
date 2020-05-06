'use strict';

const gulp = require('gulp');

module.exports = function (options) {
    return function () {
        const deployConfig = require('./deploy-config')();
        const connect = deployConfig.connect;
        const path = deployConfig.path;

        return gulp
            .src(options.src, {base: './dist/img', buffer: false})
            .pipe(connect.newer(`${path}img`))
            .pipe(connect.dest(`${path}img`));
        // .pipe(connect.clean(`${path}img`, './dist/img'));
    };
};
