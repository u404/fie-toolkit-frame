const gulp = require("gulp")
const sass = require("gulp-sass")
const autoprefixer = require("gulp-autoprefixer")
const cssmin = require("gulp-cssmin")
const gulpif = require("gulp-if")
const replace = require("gulp-replace")

const cwd = process.cwd()

const compile = () => {
  console.log("编译scss")
  return gulp.src("./src/themes/**/*.scss", {
    ignore: "./src/themes/*/common/*",
    cwd
  })
    .pipe(sass.sync())
    .pipe(gulpif(file => {
      return /components$/.test(file.dirname)
    }, replace(/(?<=url\((?:"|')?)(fonts|images)/g, `"../$1"`)))
    .pipe(autoprefixer({
      overrideBrowserslist: ["ie > 9", "last 2 versions"],
      cascade: false
    }))
    .pipe(cssmin({ showLog: false }))
    .pipe(gulp.dest("./lib/themes", { cwd }))
}

const copyfont = () => {
  console.log("拷贝字体文件")
  return gulp.src("./src/themes/*/fonts/**", { cwd })
    .pipe(gulp.dest("./lib/themes"), { cwd })
}

const copyimage = () => {
  console.log("拷贝图片文件")
  return gulp.src("./src/themes/*/images/**", { cwd })
    .pipe(gulp.dest("./lib/themes"), { cwd })
}

module.exports = gulp.series(compile, copyfont, copyimage)
