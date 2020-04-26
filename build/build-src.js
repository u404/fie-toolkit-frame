const path = require("path")
const gulp = require("gulp")
const babel = require("gulp-babel")
const replace = require("gulp-replace")

const cwd = process.cwd()
const proj = source => path.resolve(cwd, source)
const frame = source => path.resolve(__dirname, "../", source)

module.exports = () => {
  const packageJSON = require(proj("package.json"))

  const projectName = packageJSON.name

  const babelOptions = {
    babelrc: false,
    presets: [
      [
        frame("node_modules/babel-preset-env"),
        {
          loose: true,
          modules: "commonjs",
          targets: {
            browsers: ["> 1%", "last 2 versions", "not ie <= 8"]
          }
        }
      ],
      frame("node_modules/babel-preset-stage-2")
    ]
    // plugins: [
    //   [
    //     frame("node_modules/babel-plugin-module-resolver"),
    //     {
    //       root: ["./src"],
    //       alias: {
    //         "@src": `${projectName}/lib`
    //       }
    //     }
    //   ]
    // ]
  }

  console.log("编译src中的js")

  return gulp.src("src/**/*.js", {
    ignore: ["src/index.js", "src/components/**/*"],
    cwd
  })
    .pipe(babel(babelOptions))
    .pipe(replace("require(\"@src/", `require("${projectName}/lib/`))
    .pipe(gulp.dest("lib", { cwd }))
}
