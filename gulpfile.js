'use strict';

var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');


gulp.task('bundle',function(){
    return browserify({
        entries: ['public/js/app.js'],
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

gulp.task('watch', function() {
	gulp.watch('public/src/js/**/*.js', ['bundle']);
});

gulp.task('default', ['bundle', 'watch']);