const path = require("path")
const webpack = require("webpack")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const merge = require("webpack-merge")
const baseConfig = require("./webpack.base")(false)

const cwd = process.cwd()
const proj = source => path.resolve(cwd, source)

module.exports = merge.smart(baseConfig, {
  entry: "./demo/main.js",
  output: {
    path: proj("demo/dist/"),
    publicPath: "",
    filename: "[name].[hash:7].js",
    chunkFilename: "[name].js"
  },
  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        include: proj("demo"),
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "sass-loader",
            options: {
              data: `@import "~@demo/common/styles/define.scss";`
            }
          }
        ]
      },
      {
        test: /\.(scss|css)$/,
        exclude: proj("demo"),
        use: [
          "style-loader",
          "css-loader",
          "sass-loader"
        ]
      },
      {
        test: /\.(svg|otf|ttf|woff2?|eot|gif|png|jpe?g)(\?\S*)?$/,
        loader: "url-loader",
        // todo: 这种写法有待调整
        query: {
          limit: 10000,
          name: path.posix.join("static", "[name].[hash:7].[ext]")
        }
      }
    ]
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: "./demo/index.html",
      filename: "./index.html"
    })
  ],
  optimization: {
    minimizer: []
  },
  devtool: "#eval-source-map",
  devServer: {
    // host: '0.0.0.0',
    port: 8085,
    publicPath: "/",
    hot: true,
    open: true
  },
  node: {
    fs: "empty",
    path: true,
    url: false
  }
})
