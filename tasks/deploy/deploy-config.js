'use strict';

const ftp = require('vinyl-ftp');
const $ = require('gulp-load-plugins')();

module.exports = function () {
    return {
        connect: ftp.create({
            host: 'host',
            user: 'user',
            password: 'password',
            parallel: 10,
            reload: true,
            maxConnections: 15,
            log: $.util.log,
        }),
        path: 'test4.octarine.com.ua/test/',
    };
};
