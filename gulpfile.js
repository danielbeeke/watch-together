'use strict';

let gulp = require('gulp');
let requireDir = require('require-dir');
let browserSync = require('browser-sync').create();

process.setMaxListeners(0);

global.paths = {
    'html': './views/**/*.handlebars',
    'scss': './scss/**/*.scss',
    'css': './static/css',
    'js': './static/javascript/**/*.js',
    'src': './src'
};

global.browserSync = browserSync;

requireDir('./gulp', { recurse: false });
gulp.task('default', gulp.series('serve'));