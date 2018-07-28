var gulp = require('gulp'),
    path = require('./path.js'),
    plugins = require('gulp-load-plugins')();

// Сжимаем картинки
gulp.task('img:build', function() {
    gulp.src(path.path.src.img)
        .pipe(plugins.changed(path.path.build.img))
        .pipe(plugins.plumber())
        //.pipe(plugins.tinypng('J7PHQA2MyeIgr8WkaJHWH0J89I3XssPD'))
        //.pipe(plugins.debug({title: path.path.build.img}))
        .pipe(plugins.imagemin({
            progressive: true,
            svgoPlugins: [{ removeViewBox: false }],
            interlaced: true
        }))
        .pipe(gulp.dest(path.path.build.img))
});

// Копирование картинок в папку шаблона cms
gulp.task('copyImages:build', function() {
    gulp.src('dist/images/**/*.*')
        .pipe(plugins.changed(path.path.cms.cmsPath + 'images'))
        .pipe(gulp.dest(path.path.cms.cmsPath + 'images'))
});