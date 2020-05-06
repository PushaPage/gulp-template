'use strict';

const ftp = require('vinyl-ftp');
const $ = require('gulp-load-plugins')();

module.exports = function () {
    return {
        connect: ftp.create({
            host: 'work1.nestersoft.com',
            user: 'sitedev',
            password: 'Fhruso39dhgs',
            port: 21510,
            parallel: 3,
            reload: true,
            maxConnections: 5,
            log: $.util.log,
        }),
        path: 'work1.nestersoft.com/wp-content/themes/worktime/assets/',
    };
};
