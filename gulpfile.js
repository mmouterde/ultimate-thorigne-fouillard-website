const gulp = require("gulp");
const postcss = require("gulp-postcss");
const tailwindcss = require("tailwindcss");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const path = require("path");
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
  const express = require("express");
  const app = express();

  app.use((req, res, next) => {
    if (req.path === "/style.css") {
      res.sendFile(
        path.join(__dirname, "./node_modules/tailwindcss/dist/tailwind.min.css")
      );
    } else {
      next();
    }
  });
  app.use(express.static("./"));
  app.listen(8888, () => console.log("app listening on port 8888!"));

  gulp.watch(["./**/*.css", "./**/*.html"], build);
});
