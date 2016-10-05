'use strict';

//let connect = require('gulp-connect');
let gulp = require('gulp');
let connect = require('gulp-connect-php');
let jade = require('gulp-jade');
let uglify = require('gulp-uglify');
let sass = require('gulp-sass');
let resize = require('gulp-image-resize');

gulp.task('server', function() {
    connect.server({
    port: 8002,
    base: 'dist'
  });
});

gulp.task('compress', function() {
  gulp.src('./js/*.js')
    //.pipe(uglify({
    //  preserveComments: 'license'
    //}).on('error', console.error.bind(console)))
    .pipe(gulp.dest('./dist/js'));
});

gulp.task('templates', function() {
  var YOUR_LOCALS = {};
 
  gulp.src('./jade/*.jade')
    .pipe(jade({
      locals: YOUR_LOCALS
    }))
    .pipe(gulp.dest('./dist/'));

  gulp.src('./jade/include/*.jade');
});

gulp.task('watch', function() {
  gulp.watch('jade/**/*.jade', ['templates']);
  gulp.watch('js/**/*.js', ['compress']);
  gulp.watch('sass/**/*.scss', ['sass']);
});

gulp.task('sass', function () {
  gulp.src('./sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('resize', function(){
  gulp.src('./team/*.jpg')
      .pipe(resize({
        width: 150,
        height: 150
      }).on('error', sass.logError))
      .pipe(gulp.dest('./dist/team'));
});

gulp.task('default', ['templates', 'sass', 'compress', 'server', 'watch']);