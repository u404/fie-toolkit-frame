const path = require("path")
const gulp = require("gulp")
const babel = require("gulp-babel")

const cwd = process.cwd()
const proj = source => path.resolve(cwd, source)
const frame = source => path.resolve(__dirname, "../", source)

const babelOptions = {
  babelrc: false,
  plugins: [
    frame("node_modules/babel-plugin-add-module-exports"),
    [frame("node_modules/babel-plugin-transform-es2015-modules-umd"), { loose: true }]
  ]
}

module.exports = () =>
  gulp.src("src/**/*.js", {
    ignore: ["src/index.js", "src/components/**/*"],
    cwd
  })
    .pipe(babel(babelOptions))
    .pipe(gulp.dest("lib", { cwd }))
