'use strict';

const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const del = require('del');
const filepathdel = require('path');

module.exports = function(options) {
	return function() {
		gulp.watch(options.styleWatch, gulp.series('style', 'ftp-styles'))
			.on('unlink', function(filepath) {
				$.remember.forget('style', filepathdel.resolve(filepath));
				delete $.cached.caches.style[filepathdel.resolve(filepath)];
			});
		
		gulp.watch(options.cssLibsWatch, gulp.series('cssLibs', 'ftp-styles'))
			.on('unlink', function(filepath) {
				$.remember.forget('cssLibs', filepathdel.resolve(filepath));
				delete $.cached.caches.cssLibs[filepathdel.resolve(filepath)];
			});
	
		gulp.watch(options.jsWatch, gulp.series('js', 'ftp-scripts'))
			.on('unlink', function(filepath) {
				$.remember.forget('js', filepathdel.resolve(filepath));
				delete $.cached.caches.js[filepathdel.resolve(filepath)];
			});
	
		gulp.watch(options.jsLibsWatch, gulp.series('jsLibs', 'ftp-scripts'))
			.on('unlink', function(filepath) {
				$.remember.forget('jsLibs', filepathdel.resolve(filepath));
				delete $.cached.caches.jsLibs[filepathdel.resolve(filepath)];
			});
	
		gulp.watch(options.imgWatch, gulp.series('img', 'ftp-images'))
			.on('unlink', function(filepath) {
				delete $.cached.caches.img[filepathdel.resolve(filepath)];
				let filePathFromSrc = filepathdel.relative(filepathdel.resolve('src'), filepath);
				let destFilePath = filepathdel.resolve('dist', filePathFromSrc);
				del.sync(destFilePath);
			});
		
		gulp.watch(options.fontsWatch, gulp.series('fonts', 'ftp-add'))
			.on('unlink', function(filepath) {
				delete $.cached.caches.fonts[filepathdel.resolve(filepath)];
				let filePathFromSrc = filepathdel.relative(filepathdel.resolve('src'), filepath);
				let destFilePath = filepathdel.resolve('dist', filePathFromSrc);
				del.sync(destFilePath);
			});
	};
};