'use strict';

const gulp = require('gulp');

module.exports = function(options) {
	return function() {
		const ftpConfig = require('./ftp-config')();
		const connect = ftpConfig.connect;
		const path = ftpConfig.path;

		return gulp.src(options.src, {base: './dist/img', buffer: false})
			.pipe(connect.newer(`${path}img`))
			.pipe(connect.dest(`${path}img`))
			.pipe(connect.clean(`${path}img/**`, './dist/img'));
	};
};