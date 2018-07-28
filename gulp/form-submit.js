var gulp = require('gulp'),
    path = require('./path.js'),
    plugins = require('gulp-load-plugins')();

// Копирование js-файлов в папку шаблона cms
gulp.task('formSubmit:build', function() {
    gulp.src(path.path.src.php)
        .pipe(plugins.changed(path.path.src.php))
        .pipe(gulp.dest(path.path.build.php))
});