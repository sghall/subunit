var gulp   = require('gulp');
var jshint = require('gulp-jshint');
var shell  = require('gulp-shell');

gulp.task('convert', function () {
  return gulp.src('src/index.js')
    .pipe(shell('babel src/index.js -o dist/subunit.js'))
});

gulp.task('lint', function() {
  return gulp.src('src/**/**.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('default', ['convert', 'lint'])

var watcher = gulp.watch('src/**/*.js', ['default']);

watcher.on('change', function(event) {
  console.log('File ' + event.path + ' was ' + event.type + ', compiling and linting...');
})