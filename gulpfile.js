'use strict';

const gulp = require('gulp');
const path = {
	dist: { 
		html: 'dist/',
		style: 'dist/css/',
		js: 'dist/js/',
		img: 'dist/img/',
		fonts: 'dist/fonts/',
		svg: 'src/img/svg/',
		ftpAdd: 'dist/fonts/**/*',
		ftpStyles: 'dist/css/**',
		ftpScripts: 'dist/js/**',
		ftpImages: 'dist/img/**/*'
	},
	src: {
		html: 'src/*.html',
		style: 'src/scss/**/*.scss',
		cssLibs: 'src/libs-css/**/*.css',
		js: 'src/js/**/*.js',
		jsLibs: 'src/libs-js/**/*.js',
		img: 'src/img/**/*',
		fonts: 'src/fonts/**/*',
		svg: 'src/img/svg/**/*.svg'
	},
	watch: {
		html: ['src/*.html', 'src/template/*.html'],
		style: 'src/scss/**/*.scss',
		cssLibs: 'src/libs-css/**/*.css',
		js: 'src/js/**/*.js',
		jsLibs: 'src/libs-js/**/*.js',
		img: 'src/img/**/*',
		fonts: 'src/fonts/**/*'
	}
};

// Lazy Task
function lazyRequireTask(taskName, path, options = {}) {
	options.taskName = taskName;
	gulp.task(taskName, function(callback) {
		let task = require(path).call(this, options);
		return task(callback);
	});
}

// HTML
lazyRequireTask('html', './tasks/html.js', {
	src: path.src.html,
	dist: path.dist.html
});

// SCSS to CSS
lazyRequireTask('style', './tasks/style.js', {
	src: path.src.style,
	dist: path.dist.style
});

// CSSlibs to dist
lazyRequireTask('cssLibs', './tasks/css-libs.js', {
	src: path.src.cssLibs,
	dist: path.dist.style
});

// JS
lazyRequireTask('js', './tasks/script.js', {
	src: path.src.js,
	dist: path.dist.js
});

// JSlibs to dist
lazyRequireTask('jsLibs', './tasks/js-libs.js', {
	src: path.src.jsLibs,
	dist: path.dist.js
});

// Img
lazyRequireTask('img', './tasks/img-min.js', {
	src: path.src.img,
	dist: path.dist.img
});

// Fonts
lazyRequireTask('fonts', './tasks/fonts.js', {
	src: path.src.fonts,
	dist: path.dist.fonts
});

// SVG
lazyRequireTask('svg-sprite', './tasks/svg-sprite.js', {
	src: path.src.svg,
	dist: path.dist.svg
});

// Clear dir
lazyRequireTask('clean', './tasks/clean.js', {
	src: 'dist'
});

// Browser-Sync
lazyRequireTask('browser-sync', './tasks/browser-sync.js', {
	src: 'dist/**/*.*'
});

// FTP-add
lazyRequireTask('ftp-add', './tasks/ftp/ftp-add.js', {
	src: path.dist.ftpAdd
});

// FTP-styles
lazyRequireTask('ftp-styles', './tasks/ftp/ftp-styles.js', {
	src: path.dist.ftpStyles
});

// FTP-scripts
lazyRequireTask('ftp-scripts', './tasks/ftp/ftp-scripts.js', {
	src: path.dist.ftpScripts
});

// FTP-images
lazyRequireTask('ftp-images', './tasks/ftp/ftp-images.js', {
	src: path.dist.ftpImages
});

// Builder
gulp.task('build', gulp.parallel(
	'html',
	'style',
	'cssLibs',
	'js',
	'jsLibs',
	'img',
	'fonts'
));

// Watcher
lazyRequireTask('watch', './tasks/watcher.js', {
	htmlWatch: path.watch.html,
	styleWatch: path.watch.style,
	cssLibsWatch: path.watch.cssLibs,
	jsWatch: path.watch.js,
	jsLibsWatch: path.watch.jsLibs,
	imgWatch: path.watch.img,
	fontsWatch: path.watch.fonts
});

// Start
gulp.task('default', gulp.series('build', gulp.parallel(
	'watch',
	'browser-sync'
)));

// Builder for FTP
gulp.task('build-ftp', gulp.series(
	gulp.parallel(
		'style',
		'cssLibs',
		'js',
		'jsLibs',
		'img',
		'fonts'
	),
	gulp.series(
		'ftp-styles',
		'ftp-scripts',
		'ftp-images',
		'ftp-add'
	)
));

// Watcher for FTP
lazyRequireTask('watch-ftp', './tasks/ftp/watcher-ftp.js', {
	styleWatch: path.watch.style,
	cssLibsWatch: path.watch.cssLibs,
	jsWatch: path.watch.js,
	jsLibsWatch: path.watch.jsLibs,
	imgWatch: path.watch.img,
	fontsWatch: path.watch.fonts
});

// Start Deploy
gulp.task('deploy', gulp.series('build-ftp', gulp.parallel('watch-ftp')));