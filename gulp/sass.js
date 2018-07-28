var gulp = require('gulp'),
    path = require('./path.js'),
    plugins = require('gulp-load-plugins')();

// перевод scss в css
gulp.task('style:build', function() {
    gulp.src(path.path.src.style)
        .pipe(plugins.plumber())
        .pipe(plugins.sourcemaps.init({ largeFile: true }))
        .pipe(plugins.sass())
        .pipe(plugins.autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(plugins.duration('sass'))
        .pipe(plugins.sourcemaps.write('.'))
        .pipe(gulp.dest(path.path.build.style))
});

// задача - создание карты подкл., создание минимизированной версии с суффиксом .min
gulp.task('styleMin:build', function() {
    gulp.src(path.path.src.style)
        .pipe(plugins.plumber())
        .pipe(plugins.sourcemaps.init({ largeFile: true }))
        .pipe(plugins.sass().on('error', plugins.sass.logError))
        .pipe(plugins.cssnano({ zindex: false }))
        .pipe(plugins.autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(plugins.rename({ suffix: '.min' }))
        .pipe(plugins.sourcemaps.write('.'))
        .pipe(gulp.dest(path.path.build.style))
});

// Копирование css файлов в папку шаблона cms
gulp.task('copyStyles:build', function() {
    gulp.src('dist/css/*.+(map|css)')
        .pipe(plugins.changed(path.path.cms.cmsPath + 'css'))
        .pipe(gulp.dest(path.path.cms.cmsPath + 'css'))
});