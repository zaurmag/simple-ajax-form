module.exports = {
    path: {
        build: { // Готовые файлы
            html: 'dist/',
            style: 'dist/css',
            img: 'dist/images',
            js: 'dist/js',            
            fonts: 'dist/fonts',
            php: 'dist/form-submit'
        },
        src: { // Файлы исходники
            pug: 'src/pug/*.pug',
            style: 'src/sass/main.sass',
            img: 'src/images/**/*.*',
            js: 'src/js/**/*.js',
            php: 'src/form-submit/*.*'
        },
        watch: { // Изменение файлов   
            style: 'src/sass/**/*.+(sass|scss)',
            pug: 'src/pug/**/*.pug',
            img: 'src/images/**/*.*',
            js: 'src/js/**/*.js',
            php: 'src/form-submit/*.php',
            jsConct: 'src/js/**/*.js',
            copyCss: 'dist/css/*.css',
            copyJs: 'dist/js/*.js',
            copyImages: 'dist/images/**/*.*'
        },
        clean: {
            all: './dist'
        },
        cms: {
            cmsPath: 'template_path' // Path to cms template
        }
    }
}