'use strict';

const gulp = require('gulp');

module.exports = function(options) {
	return function() {
		const ftpConfig = require('./ftp-config')();
		const connect = ftpConfig.connect;
		const path = ftpConfig.path;

		return gulp.src(options.src, {base: './dist/js', buffer: false})
			.pipe(connect.newer(`${path}js`))
			.pipe(connect.dest(`${path}js`))
			.pipe(connect.clean(`${path}js/**`, './dist/js'));
	};
};