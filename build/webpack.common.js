const path = require("path")
const camelcase = require("camelcase")
const merge = require("webpack-merge")
const baseConfig = require("./webpack.base")(true)

const cwd = process.cwd()
const proj = source => path.resolve(cwd, source)

const packageJSON = require(proj("package.json"))

const projectName = packageJSON.name.replace(/^@sc\//, "")

module.exports = merge(baseConfig, {
  entry: {
    app: ["./src/index.js"]
  },
  output: {
    path: proj("lib"),
    publicPath: "/",
    filename: "index.common.js",
    chunkFilename: "[id].js",
    libraryExport: "default",
    library: camelcase(projectName, { pascalCase: true }),
    libraryTarget: "commonjs2"
  }
})
