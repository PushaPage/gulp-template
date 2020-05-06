'use strict';

const gulp = require('gulp');

module.exports = function (options) {
    return function () {
        const deployConfig = require('./deploy-config')();
        const connect = deployConfig.connect;
        const path = deployConfig.path;

        return gulp
            .src(options.src, {base: './dist/js', buffer: false})
            .pipe(connect.newer(`${path}js`))
            .pipe(connect.dest(`${path}js`));
        // .pipe(connect.clean(`${path}js`, './dist/js'));
    };
};
