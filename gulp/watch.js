var gulp = require('gulp'),
    plugins = require('gulp-load-plugins')(),
    path = require('./path.js');

// Запуск команд Watch
gulp.task('watch', function() {
    gulp.watch(path.path.watch.style, ['styleMin:build', 'style:build']);
    gulp.watch(path.path.watch.pug, ['pug:build']);
    gulp.watch(path.path.watch.img, ['img:build']);
    gulp.watch(path.path.watch.jsConct, ['jsConct:build']);
    gulp.watch(path.path.watch.php, ['formSubmit:build']);

    // Copy assets to cms template
    // gulp.watch(path.path.watch.copyCss, ['copyStyles:build']);
    // gulp.watch(path.path.watch.copyJs, ['copyScripts:build']);

});