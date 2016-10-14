var gulp = require('gulp');
var del = require('del');
var runSequence = require('run-sequence');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var babel = require('gulp-babel');
var pug = require('gulp-pug');
var watch = require('gulp-watch');
var scss = require('gulp-scss');


gulp.task('default', function(cb) {
  runSequence('clean', 'js', 'scss', 'pug', 'watch', cb);
});

gulp.task('watch', function(cb) {
  gulp.watch('src/style/**/*.scss', ['scss']);
  gulp.watch('src/**/*.js', ['js']);
  gulp.watch('src/**/*.pug', ['pug']);
  return cb;
});

gulp.task('scss', function() {
  return gulp.src('src/**/*.scss')
    .pipe(scss().on('error', console.error))
    .pipe(gulp.dest('dist'))
});

gulp.task('pug', function() {
  return gulp.src("src/**/*.pug")
    .pipe(pug())
    .pipe(gulp.dest('dist'))
});

gulp.task('js', function() {
  return gulp.src("src/**/*.js")
    .pipe(concat('index.js'))
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(uglify())
    .pipe(gulp.dest('dist'))
});

gulp.task('clean', function() {
  return del('dist');
});
