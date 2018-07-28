var gulp = require('gulp'),
    path = require('./path.js'),
    plugins = require('gulp-load-plugins')();

// задача - сжимаем javascript
gulp.task('jsConct:build', function() {
    gulp.src(path.path.src.js)
        .pipe(plugins.changed(path.path.build.js))
        .pipe(plugins.plumber())
        .pipe(plugins.concat('scripts.js'))
        .pipe(gulp.dest(path.path.build.js))
        .pipe(plugins.uglify())
        .pipe(plugins.rename('scripts.min.js'))
        .pipe(gulp.dest(path.path.build.js))
});

// Копирование js-файлов в папку шаблона cms
gulp.task('copyScripts:build', function() {
    gulp.src('dist/js/*.js')
        .pipe(plugins.changed(path.path.cms.cmsPath + 'js'))
        .pipe(gulp.dest(path.path.cms.cmsPath + 'js'))
});