const path = require("path")
const del = require("del")
const gulp = require("gulp")
const buildEntry = require("./build-entry")
const buildCommon = require("./build-common")
const buildComponent = require("./build-component")
const buildSrc = require("./build-src")
const buildThemes = require("./build-themes")

module.exports = async () => {
  del.sync(path.resolve(process.cwd(), "lib"))
  buildEntry()
  await buildCommon()
  await buildComponent()
  await new Promise(resolve => {
    gulp.series(buildSrc, buildThemes, () => {
      resolve()
    })()
  })
}
