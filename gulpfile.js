var
    gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    rename = require('gulp-rename'),
    jshint = require('gulp-jshint'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify-es').default,
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    sourcemaps = require('gulp-sourcemaps'),
    cleanCSS = require('gulp-clean-css'),
    browserSync = require('browser-sync').create(),
    connect = require('gulp-connect'),
    imagemin = require('gulp-imagemin'),
    babel = require('gulp-babel');


function onError(err) {
    console.log(err);
}

function BrowserSync() {
    var files = [
        'site/*.html',
        'src/js/**/*.js'
    ];

    return browserSync.init(files, {
        proxy: 'http://localhost:9000',
        port: 9001
    });
}

function Server() {
    return connect.server({
        name: "Pardot Dark",
        root: 'site',
        port: 9000,
    })
}

function Scripts() {
    return gulp.src('src/js/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(plumber({ errorHandler: onError }))
        .pipe(concat('scripts.js'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('site/js/'))
}

function Lint() {
    return gulp.src('src/js/scripts.js')
        .pipe(plumber({ errorHandler: onError }))
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
}

function Styles() {
    return gulp.src('src/scss/**/*.scss')
        .pipe(plumber({ errorHandler: onError }))
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError ))
        .pipe(autoprefixer())
        .pipe(cleanCSS({ compatibility: 'ie10' }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('site/css/'))
        .pipe(browserSync.stream())
}

function Images() {
    return gulp.src('src/img/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('site/img/'))
}

function Watch() {
    gulp.watch('src/scss/**/*.scss', gulp.series([Styles]));
    gulp.watch('src/js/**/*.js', gulp.series([Lint, Scripts]));
    gulp.watch('src/img/**/*.(jpg|png|gif|svg)', gulp.series([Images]));
}

var build = gulp.parallel([Lint, Scripts, Styles, Images, Server, BrowserSync, Watch]);

gulp.task('default', build);