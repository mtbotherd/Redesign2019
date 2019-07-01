"use strict";

var gulp = require("gulp"),
  sass = require("gulp-sass"),
  del = require("del"),
  uglify = require("gulp-uglify"),
  cleanCSS = require("gulp-clean-css"),
  rename = require("gulp-rename"),
  merge = require("merge-stream"),
  htmlreplace = require("gulp-html-replace"),
  autoprefixer = require("gulp-autoprefixer"),
  browserSync = require("browser-sync").create();

// Clean task
gulp.task("clean", function() {
  return del(["dist", "src/css/app.css"]);
});

// Copy third party libraries from node_modules into /vendor
gulp.task("vendor:js", function() {
  return gulp
    .src([
      "./node_modules/jquery/dist/*",
      "!./node_modules/jquery/dist/core.js",
      "./node_modules/popper.js/dist/umd/popper.*",
      "./node_modules/bootstrap/dist/js/*"
    ])
    .pipe(gulp.dest("./src/js/vendor"));
});

// Copy font-awesome from node_modules into /fonts
// gulp.task("vendor:fonts", function() {
//   return gulp
//     .src([
//       "./node_modules/font-awesome/**/*",
//       "!./node_modules/font-awesome/{less,less/*}",
//       "!./node_modules/font-awesome/{scss,scss/*}",
//       "!./node_modules/font-awesome/.*",
//       "!./node_modules/font-awesome/*.{txt,json,md}"
//     ])
//     .pipe(gulp.dest("./src/fonts/font-awesome"));
// });

// vendor task
//gulp.task("vendor", gulp.parallel("vendor:fonts", "vendor:js"));
gulp.task("vendor", gulp.parallel("vendor:js"));

// Copy vendor's js to /dist
gulp.task("vendor:build", function() {
  var jsStream = gulp
    .src([
      "./src/js/vendor/bootstrap.bundle.min.js",
      "./src/js/vendor/jquery.slim.min.js",
      "./src/js/vendor/popper.min.js"
    ])
    .pipe(gulp.dest("./dist/src/js/vendor"));
  //   var fontStream = gulp
  //     .src(["./src/fonts/font-awesome/**/*.*"])
  //     .pipe(gulp.dest("./dist/src/fonts/font-awesome"));
  //return merge(jsStream, fontStream);
  return merge(jsStream);
});

// Copy Bootstrap SCSS(SASS) from node_modules to /src/scss/bootstrap
gulp.task("bootstrap:scss", function() {
  return gulp
    .src(["./node_modules/bootstrap/scss/**/*"])
    .pipe(gulp.dest("./src/scss/bootstrap"));
});

// Compile SCSS(SASS) files
gulp.task(
  "scss",
  gulp.series("bootstrap:scss", function compileScss() {
    return gulp
      .src(["./src/scss/*.scss"])
      .pipe(
        sass
          .sync({
            outputStyle: "expanded"
          })
          .on("error", sass.logError)
      )
      .pipe(autoprefixer())
      .pipe(gulp.dest("./src/css"));
  })
);

// Minify CSS
gulp.task(
  "css:minify",
  gulp.series("scss", function cssMinify() {
    return gulp
      .src("./src/css/app.css")
      .pipe(cleanCSS())
      .pipe(
        rename({
          suffix: ".min"
        })
      )
      .pipe(gulp.dest("./dist/src/css"))
      .pipe(browserSync.stream());
  })
);

// Minify Js
gulp.task("js:minify", function() {
  return gulp
    .src(["./src/js/app.js"])
    .pipe(uglify())
    .pipe(
      rename({
        suffix: ".min"
      })
    )
    .pipe(gulp.dest("./dist/src/js"))
    .pipe(browserSync.stream());
});

// Replace HTML block for Js and Css file upon build and copy to /dist
gulp.task("replaceHtmlBlock", function() {
  return gulp
    .src(["*.html"])
    .pipe(
      htmlreplace({
        js: "src/js/app.min.js",
        css: "src/css/app.min.css"
      })
    )
    .pipe(gulp.dest("dist/"));
});

// Configure the browserSync task and watch file path for change
gulp.task("dev", function browserDev(done) {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
  gulp.watch(
    ["src/scss/*.scss", "src/scss/**/*.scss", "!src/scss/bootstrap/**"],
    gulp.series("css:minify", function cssBrowserReload(done) {
      browserSync.reload();
      done(); //Async callback for completion.
    })
  );
  gulp.watch(
    "src/js/app.js",
    gulp.series("js:minify", function jsBrowserReload(done) {
      browserSync.reload();
      done();
    })
  );
  gulp.watch(["*.html"]).on("change", browserSync.reload);
  done();
});

// Build task
gulp.task(
  "build",
  gulp.series(
    gulp.parallel("css:minify", "js:minify", "vendor"),
    "vendor:build",
    function copysrc() {
      return gulp
        .src(["*.html", "favicon.ico", "src/img/**"], { base: "./" })
        .pipe(gulp.dest("dist"));
    }
  )
);

// Default task
gulp.task("default", gulp.series("clean", "build", "replaceHtmlBlock"));
