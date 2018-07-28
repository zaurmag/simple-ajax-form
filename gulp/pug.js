var gulp = require('gulp'),
    path = require('./path.js'),
    plugins = require('gulp-load-plugins')();

// Собираем Html файлы
gulp.task('pug:build', function() {
    gulp.src(path.path.src.pug)
        .pipe(plugins.plumber())
        .pipe(plugins.pug({
            pretty: true
        }))
        .pipe(gulp.dest(path.path.build.html))
});