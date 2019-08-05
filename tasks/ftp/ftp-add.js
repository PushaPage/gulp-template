'use strict';

const gulp = require('gulp');

module.exports = function(options) {
	return function() {
		const ftpConfig = require('./ftp-config')();
		const connect = ftpConfig.connect;
		const path = ftpConfig.path;

		return gulp.src(options.src, {base: './dist/fonts', buffer: false})
			.pipe(connect.newer(`${path}fonts`))
			.pipe(connect.dest(`${path}fonts`))
			.pipe(connect.clean(`${path}fonts/**`, './dist/fonts'));
	};
};