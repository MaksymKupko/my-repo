const gulp = require("gulp");
const clean = require("del");
const terser = require("gulp-terser");

const path = {
    dist: {
        html: "dist/",
        js: "dist/scripts/",
    },
    src: {
        html: "src/index.html",
        js: "src/scripts/*.js",
    },
    watch: {
        html: "src/html-fragments/**/*.html",
        js: "src/js/**/*.js",
    },
};

const cleanDist = () => clean("dist");

const html = () => gulp.src(path.src.html).pipe(gulp.dest(path.dist.html));

const js = () => gulp.src(path.src.js).pipe(terser({toplevel: true})).pipe(gulp.dest(path.dist.js));


gulp.task("build", gulp.series(cleanDist, gulp.parallel(html, js)))