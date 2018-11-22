'use strict';

let gulp = require('gulp');
let autoprefixer = require('gulp-autoprefixer');
let sass = require('gulp-sass');
let sassGlob = require('gulp-sass-glob');

gulp.task('css', function () {
    return gulp.src(global.paths.scss)
    .pipe(sassGlob())
    .pipe(sass())
    .pipe(autoprefixer({
        browsers: ['last 20 versions'],
        cascade: false
    }))
    .pipe(gulp.dest(global.paths.css))
    .pipe(global.browserSync.stream());
});