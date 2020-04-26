const path = require("path")
const merge = require("webpack-merge")
const baseConfig = require("./webpack.base")(true)

const cwd = process.cwd()
const proj = source => path.resolve(cwd, source)

const componentsJSON = require(proj("src/components.json"))

Object.keys(componentsJSON).forEach(key => {
  componentsJSON[key] = componentsJSON[key].replace("@src", "./src")
})

module.exports = merge.smart(baseConfig, {
  entry: componentsJSON,
  output: {
    path: proj("lib/components"),
    publicPath: "",
    filename: "[name].js",
    chunkFilename: "[id].js",
    libraryTarget: "commonjs2"
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        loaders: ["style-loader", "css-loader"]
      },
      {
        test: /\.(svg|otf|ttf|woff2?|eot|gif|png|jpe?g)(\?\S*)?$/,
        loader: "url-loader",
        query: {
          limit: 10000,
          name: path.posix.join("static", "[name].[hash:7].[ext]")
        }
      }
    ]
  }
})
