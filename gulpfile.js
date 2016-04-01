'use strict';

var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');


gulp.task('default',function(){
    return browserify({
        entries: ['public/js/app.js'],
        debug: true
    }).bundle()
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(gulp.dest('public/js/'));
});

gulp.task('watch',function() {
   gulp.watch(); 
});