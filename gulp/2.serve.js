'use strict';

let gulp = require('gulp');
let browserSync = require('browser-sync');
let nodemon = require('gulp-nodemon');
let reload = global.browserSync.reload;
let gulpMultiProcess = require('gulp-multi-process');

gulp.task('browsersync', function(cb) {
  global.browserSync.init({
    proxy: "http://localhost:5000",
    port: 7000,
    ghostMode: false
  });

  gulp.watch([global.paths.html, global.paths.js]).on('change', reload);
  gulp.watch(global.paths.scss, gulp.series('css'));

  cb();
});

gulp.task('nodemon', function (cb) {
  let started = false;
  return nodemon({
    script: 'index.js'
  }).on('start', function () {
    if (!started) {
      cb();
      started = true;
    }
  });
});

gulp.task('websockets', function (cb) {
  let started = false;
  return nodemon({
    script: 'websockets.js'
  }).on('start', function () {
    if (!started) {
      cb();
      started = true;
    }
  });
});

gulp.task('servers', () => {
  return gulpMultiProcess(['websockets', 'nodemon']);
});

gulp.task('serve', gulp.series('browsersync', 'servers', 'css'));