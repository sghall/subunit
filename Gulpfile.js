var gulp   = require('gulp');
var jshint = require('gulp-jshint');
var shell  = require('gulp-shell');

gulp.task('compile', function () {
  return gulp.src('src/index.js')
    .pipe(shell('compile-modules convert src/index.js -o dist/subunit.js'))
});

gulp.task('lint', function() {
  return gulp.src('src/**/**.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('default', ['compile', 'lint'])

var watcher = gulp.watch('src/**/*.js', ['default']);

watcher.on('change', function(event) {
  console.log('File ' + event.path + ' was ' + event.type + ', compiling and linting...');
})