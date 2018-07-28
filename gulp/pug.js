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

// Копирование в папку шаблона cms
gulp.task('pugCopy:build', function() {
    gulp.src(path.path.build.html + '*.html')
        .pipe(plugins.changed(path.path.src.pug))
        .pipe(gulp.dest(path.path.cms.cmsPath))
});