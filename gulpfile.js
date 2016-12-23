var gulp = require('gulp');
var del = require('del');
var runSequence = require('run-sequence');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var babel = require('gulp-babel');
var pug = require('gulp-pug');
var watch = require('gulp-watch');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var plumber = require('gulp-plumber');

gulp.task('default', function(cb) {
  runSequence('clean', 'js', 'sass', 'pug', 'prefix', 'watch', cb);
});

gulp.task('watch', function(cb) {
  gulp.watch('src/style/**/*.scss', ['sass']);
  gulp.watch('src/**/*.js', ['js']);
  gulp.watch('src/**/*.pug', ['pug']);
  return cb;
});

gulp.task('sass', function() {
  return gulp.src('src/**/*.scss')
    .pipe(plumber())
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('dist'))
});

gulp.task('pug', function() {
  return gulp.src("src/**/*.pug")
    .pipe(plumber())
    .pipe(pug())
    .pipe(gulp.dest('dist'))
});

gulp.task('js', function() {
  return gulp.src("src/**/*.js")
    .pipe(plumber())
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

gulp.task('prefix', function() {
  return gulp.src("dist/style/main.css")
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(gulp.dest('dist/style'))
});
