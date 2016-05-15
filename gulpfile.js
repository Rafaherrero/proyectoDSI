(() => {
    'use strict';

    const gulp        = require('gulp');
    const clean       = require('gulp-clean');
    const browserSync = require('browser-sync');
    const gls         = require('gulp-live-server');
    const jshint      = require('gulp-jshint');
    const jscs        = require('gulp-jscs');
    const scsslint    = require('gulp-scss-lint');

    gulp.task('default', ['browser-sync']);

    gulp.task('clean', () => {
        return gulp.src([
                'public/stylesheets/*.css'
            ])
            .pipe(clean());
    });

    gulp.task('clean-all', ['clean'], () => {
        return gulp.src([
                'node_modules',
                'public/vendor'
            ])
            .pipe(clean());
    });

    gulp.task('browser-sync', ['serve'], () => {
        browserSync.init(null, {
            proxy: 'http://localhost:8080',
            files: [
                'views/**/*.ejs',
                'public/javascripts/**/*.js',
                'public/images/**/*.*',
                'public/vendor/**/*.*',
                'assets/frontend/stylesheets/**/*.scss',
                'routes/**/*',
                'app.js'
            ],
            port: 8081,
            ui: {
                port: 8082
            },
            reloadDelay: 600
        });
    });

    gulp.task('serve', () => {
        var server = gls.new('bin/www');
        server.start();

        gulp.watch([
                'app/controllers/**/*.js',
                'app.js'
            ],
            (file) => {
                console.log('[GLS] File changed');
                var promise = server.stop();
                promise.then(function(result) {
                    server.start();
                });
            }
        );

        gulp.watch('myapp.js', server.start.bind(server));
    });

    gulp.task('lint', ['lint:jshint', 'lint:jscs', 'lint:scss']);

    // Tarea para pasar el JSHint a el código
    gulp.task('lint:jshint', () => {
        return gulp.src([
                'gulpfile.js',
                'public/js/**/*.js',
                'routes/**/*.js',
                'assets/modules/**/*.js',
                'db/models/**/*.js'
            ])
            .pipe(jshint('.jshintrc'))
            .pipe(jshint.reporter('jshint-stylish'));
    });

    // Tarea para pasar el JSCS a el código
    gulp.task('lint:jscs', () => {
        return gulp.src([
                'gulpfile.js',
                'public/js/**/*.js',
                'routes/**/*.js',
                'assets/modules/**/*.js',
                'db/models/**/*.js'
            ])
            .pipe(jscs())
            .pipe(jscs.reporter());
    });

    // Tarea para pasar el SCSS-Lint a el código
    gulp.task('lint:scss', () => {
        return gulp.src('assets/frontend/stylesheets/**/*.scss')
            .pipe(scsslint());
    });

})();