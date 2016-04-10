'use strict';

var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');


gulp.task('bundle',function(){
    return browserify({
        entries: ['public/src/js/app.js'],
        debug: true
    }).bundle()
    .on('error', function(error) {
    console.log(error.toString());
    this.emit('end');
    })
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(gulp.dest('public/js/'));
});

gulp.task('sass', function () {
  return gulp.src('./public/src/scss/app.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('./public/css'));
});

gulp.task('watch', function() {
	gulp.watch('public/src/js/**/*.js', ['bundle']);
});

gulp.task('default', ['bundle','sass', 'watch']);