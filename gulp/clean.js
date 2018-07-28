var gulp = require('gulp'),
    path = require('./path.js'),
    del = require('del');

gulp.task('clean', function() {
    return del([
        path.path.clean.all
    ]);
});