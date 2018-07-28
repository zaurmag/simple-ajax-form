var gulp = require('gulp'), // подключаем Gulp
    plugins = require('gulp-load-plugins')({
        overridePattern: true,
        pattern: '*'
    }),
    reqDir = require('require-dir');
    reqDir('./gulp', { recurse: true });

gulp.task('build', [
    'pug:build',
    'style:build',
    'styleMin:build',
    'img:build',
    'jsConct:build',
    'formSubmit:build'

    // Копирование файлов в шаблон CMS. Путь до шаблона меняется в файле - gulp/path.js
    // 'copyStyles:build',
    // 'copyScripts:build',
    // 'copyImages:build',
]);

// Запуск команд по умолчанию
gulp.task('default', ['build', 'browser-sync', 'watch']);