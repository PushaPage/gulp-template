'use strict';

const ftp = require('vinyl-ftp');
const $ = require('gulp-load-plugins')();

module.exports = function () {
    return {
        connect: ftp.create({
            host: 'host',
            user: 'username',
            password: 'password',
            parallel: 3,
            reload: true,
            maxConnections: 5,
            log: $.util.log,
        }),
        path: 'test6.octarine.com.ua/test/',
    };
};
