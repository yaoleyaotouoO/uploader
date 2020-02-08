var gulp = require('gulp');
var concat = require('gulp-concat');
var del = require('del');

const libList = [
  'moment.min.js',
]

function buildLib() {
  return gulp.src(libList.map(lib => `../src/ui/js/${lib}`))
    .pipe(concat('common-plugins.js'))
    .pipe(gulp.dest('../dist/lib/'));
}

const styleList = [
]

function buildCss() {
  return gulp.src(styleList.map(style => `../src/ui/styles/${style}`))
    .pipe(concat('common.css'))
    .pipe(gulp.dest('../dist/css/'));
}

function copySource() {
  return gulp.src(['../src/ui/sources/**/*'])
    .pipe(gulp.dest('../dist/sources'));
}

function clean() {
  return del([
    '../dist/**/*',
    '!../dist/dll',
    '!../dist/dll/vendor-manifest.json',
    '!../dist/dll/vendor.dll.js'
  ], { force: true });
}

function prehook() {
  return gulp.src(['../../.git-hooks/*'])
    .pipe(gulp.dest('../../.git/hooks/'));
}

gulp.task('resource', gulp.series(
  prehook,
  clean,
  buildLib,
  // buildCss,
  // copySource
))