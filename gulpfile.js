
const gulp        = require('gulp');
const browserSync = require('browser-sync').create();
const less        = require('gulp-less');
const haml = require("gulp-ruby-haml");
const prettyHtml = require('gulp-pretty-html');

// Compile LESS to CSS and autoinject to browser
gulp.task('less', function() {
    return gulp.src("./less/**/*.less")
        .pipe(less())
        .pipe(gulp.dest("./css"))
        .pipe(browserSync.stream());
});

// Compile HAML to HTML and autoinject to browser
gulp.task('haml', function() {
    return gulp.src("./haml/*.haml")
    .pipe(haml())
    .pipe(haml({doubleQuote: true}))
    .pipe(gulp.dest("./"))
    .pipe(browserSync.stream());
});

gulp.task('pages', function () {
    return gulp.src('./*.html')
        .pipe(prettyHtml())
        .pipe(gulp.dest('./'));
});

// Static Server + watching less/haml/html files
gulp.task('serve', gulp.series('less', 'haml', 'pages', function() {

    browserSync.init({
        server: "./"
    });

    gulp.watch("./less/**/*.less", gulp.series('less'));
    gulp.watch("./haml/*.haml", gulp.series('haml'));
    gulp.watch("./*.haml", gulp.series('pages'));
    gulp.watch("./*.html").on('change', browserSync.reload);
}));

// Serve!
gulp.task('default', gulp.series('serve'));