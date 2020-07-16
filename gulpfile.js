const gulp = require("gulp");
const postcss = require("gulp-postcss");
const tailwindcss = require("tailwindcss");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
var gls = require("gulp-live-server");

const build = gulp.task("build", function() {
  return gulp
    .src("./src/style.css")
    .pipe(
      postcss([
        tailwindcss,
        autoprefixer,
        cssnano({
          preset: "default"
        })
      ])
    )
    .pipe(gulp.dest("./"));
});

gulp.task("serve", function() {
  var server = gls.static("./", 8888);
  server.start();

  gulp.watch(["./**/*.css", "./**/*.html"], function(file) {
    server.notify.apply(server, [file]);
  });

  gulp.watch(["./src/**/*.css"], build);

});
