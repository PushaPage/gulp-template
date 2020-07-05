'use strict';

const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const del = require('del');
const filePathDel = require('path');

module.exports = function (options) {
    return function () {
        gulp.watch(options.htmlWatch, gulp.series('html')).on('unlink', function (filepath) {
            $.remember.forget('html', filePathDel.resolve(filepath));
            delete $.cached.caches.html[filePathDel.resolve(filepath)];
            const filePathFromSrc = filePathDel.relative(filePathDel.resolve('src'), filepath);
            const destFilePath = filePathDel.resolve('dist', filePathFromSrc);
            del.sync(destFilePath);
        });

        gulp.watch(options.styleWatch, gulp.series('style')).on('unlink', function (filepath) {
            $.remember.forget('style', filePathDel.resolve(filepath));
            delete $.cached.caches.style[filePathDel.resolve(filepath)];
        });

        gulp.watch(options.cssLibsWatch, gulp.series('cssLibs')).on('unlink', function (filepath) {
            $.remember.forget('cssLibs', filePathDel.resolve(filepath));
            delete $.cached.caches.cssLibs[filePathDel.resolve(filepath)];
        });

        gulp.watch(options.jsWatch, gulp.series('js')).on('unlink', function (filepath) {
            $.remember.forget('js', filePathDel.resolve(filepath));
            delete $.cached.caches.js[filePathDel.resolve(filepath)];
        });

        gulp.watch(options.eslintWatch, gulp.series('eslint'));

        gulp.watch(options.jsLibsWatch, gulp.series('jsLibs')).on('unlink', function (filepath) {
            $.remember.forget('jsLibs', filePathDel.resolve(filepath));
            delete $.cached.caches.jsLibs[filePathDel.resolve(filepath)];
        });

        gulp.watch(options.imgWatch, gulp.series('img')).on('unlink', function (filepath) {
            delete $.cached.caches.img[filePathDel.resolve(filepath)];
            const filePathFromSrc = filePathDel.relative(filePathDel.resolve('src'), filepath);
            const destFilePath = filePathDel.resolve('dist', filePathFromSrc);
            del.sync(destFilePath);
        });

        gulp.watch(options.fontsWatch, gulp.series('fonts')).on('unlink', function (filepath) {
            delete $.cached.caches.fonts[filePathDel.resolve(filepath)];
            const filePathFromSrc = filePathDel.relative(filePathDel.resolve('src'), filepath);
            const destFilePath = filePathDel.resolve('dist', filePathFromSrc);
            del.sync(destFilePath);
        });
    };
};
