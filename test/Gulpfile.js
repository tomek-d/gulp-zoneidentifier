
var gulp = require('gulp');
var zoneIdentifier = require('../.')

gulp.task('default', function () {
  return gulp.src('in.js')
    .pipe(zoneIdentifier({zoneId: 2}))
    .pipe(gulp.dest('output'));
})
