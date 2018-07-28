var gulp = require('gulp'),
    path = require('./path.js'),
    browserSync = require('browser-sync').create();

gulp.task('browser-sync', ['watch'], function() {
    browserSync.init({
        server: {
            baseDir: "./dist/"
        }
    });
    gulp.watch('dist/**/*.+(html|js|css)').on("change", browserSync.reload);
});