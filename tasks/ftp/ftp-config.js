'use strict';

const ftp = require('vinyl-ftp');
const $ = require('gulp-load-plugins')();

module.exports = function() {
	return {
		connect: ftp.create({
			host: 's106.aiwebhost.com',
			user: 'airstudi',
			password: 'uev37U77pT',
			parallel: 10,
			reload: true,
			maxConnections: 15,
			log: $.util.log
		}),
		path: 'test4.octarine.com.ua/test/'
	};
};