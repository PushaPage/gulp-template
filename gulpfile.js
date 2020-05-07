'use strict';

const gulp = require('gulp');
const path = {
    dist: {
        html: 'dist/',
        style: 'dist/css/',
        js: 'dist/js/',
        img: 'dist/img/',
        fonts: 'dist/fonts/',
        deployAdd: 'dist/fonts/**/*',
        deployStyles: 'dist/css/**',
        deployScripts: 'dist/js/**',
        deployImages: 'dist/img/**/*',
    },
    src: {
        html: 'src/*.html',
        style: 'src/scss/**/*.scss',
        cssLibs: 'src/libs-css/**/*.css',
        js: ['node_modules/@babel/polyfill/dist/polyfill.js', 'src/js/**/*.js'],
        eslint: 'src/js/**/*.js',
        jsLibs: 'src/libs-js/**/*.js',
        img: 'src/img/**/*',
        fonts: 'src/fonts/**/*',
    },
    watch: {
        html: ['src/*.html', 'src/template/*.html'],
        style: 'src/scss/**/*.scss',
        cssLibs: 'src/libs-css/**/*.css',
        js: 'src/js/**/*.js',
        jsLibs: 'src/libs-js/**/*.js',
        img: 'src/img/**/*',
        fonts: 'src/fonts/**/*',
    },
};

// Lazy Task
function lazyRequireTask(taskName, path, options = {}) {
    options.taskName = taskName;
    gulp.task(taskName, function (callback) {
        const task = require(path).call(this, options);
        return task(callback);
    });
}

// HTML
lazyRequireTask('html', './tasks/html.js', {
    src: path.src.html,
    dist: path.dist.html,
});

// SCSS to CSS
lazyRequireTask('style', './tasks/style.js', {
    src: path.src.style,
    dist: path.dist.style,
});

// CSSlibs to dist
lazyRequireTask('cssLibs', './tasks/css-libs.js', {
    src: path.src.cssLibs,
    dist: path.dist.style,
});

// JS
lazyRequireTask('js', './tasks/script.js', {
    src: path.src.js,
    dist: path.dist.js,
});

// ESLint
lazyRequireTask('eslint', './tasks/eslint.js', {
    src: path.src.eslint,
});

// JSlibs to dist
lazyRequireTask('jsLibs', './tasks/js-libs.js', {
    src: path.src.jsLibs,
    dist: path.dist.js,
});

// Img
lazyRequireTask('img', './tasks/img-min.js', {
    src: path.src.img,
    dist: path.dist.img,
});

// Fonts
lazyRequireTask('fonts', './tasks/fonts.js', {
    src: path.src.fonts,
    dist: path.dist.fonts,
});

// Clear dir
lazyRequireTask('clean', './tasks/clean.js', {
    src: 'dist',
});

// Browser-Sync
lazyRequireTask('browser-sync', './tasks/browser-sync.js', {
    src: 'dist/**/*.*',
});

// FTP-add
lazyRequireTask('deploy-add', './tasks/deploy/deploy-add.js', {
    src: path.dist.deployAdd,
});

// FTP-styles
lazyRequireTask('deploy-styles', './tasks/deploy/deploy-styles.js', {
    src: path.dist.deployStyles,
});

// FTP-scripts
lazyRequireTask('deploy-scripts', './tasks/deploy/deploy-scripts.js', {
    src: path.dist.deployScripts,
});

// FTP-images
lazyRequireTask('deploy-images', './tasks/deploy/deploy-images.js', {
    src: path.dist.deployImages,
});

// Builder
gulp.task('build', gulp.parallel('html', 'style', 'cssLibs', 'js', 'eslint', 'jsLibs', 'img', 'fonts'));

// Watcher
lazyRequireTask('watch', './tasks/watcher.js', {
    htmlWatch: path.watch.html,
    styleWatch: path.watch.style,
    cssLibsWatch: path.watch.cssLibs,
    jsWatch: path.watch.js,
    eslintWatch: path.src.eslint,
    jsLibsWatch: path.watch.jsLibs,
    imgWatch: path.watch.img,
    fontsWatch: path.watch.fonts,
});

// Start
gulp.task('default', gulp.series('build', gulp.parallel('watch', 'browser-sync')));

// Builder for FTP
gulp.task(
    'build-deploy',
    gulp.series(
        gulp.parallel('style', 'cssLibs', 'js', 'eslint', 'jsLibs', 'img', 'fonts'),
        gulp.parallel('deploy-styles', 'deploy-scripts', 'deploy-images', 'deploy-add')
    )
);

// Watcher for FTP
lazyRequireTask('watch-deploy', './tasks/deploy/watcher-deploy.js', {
    styleWatch: path.watch.style,
    cssLibsWatch: path.watch.cssLibs,
    jsWatch: path.watch.js,
    eslintWatch: path.src.eslint,
    jsLibsWatch: path.watch.jsLibs,
    imgWatch: path.watch.img,
    fontsWatch: path.watch.fonts,
});

// Start Deploy
gulp.task('deploy', gulp.series('build-deploy', gulp.parallel('watch-deploy')));
