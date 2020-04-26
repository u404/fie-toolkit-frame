const path = require("path")
const ProgressBarPlugin = require("progress-bar-webpack-plugin")
const nodeExternals = require("webpack-node-externals")
const VueLoaderPlugin = require("vue-loader/lib/plugin")
const fs = require("fs-extra")

const cwd = process.cwd()
const proj = source => path.resolve(cwd, source)
const frame = source => path.resolve(__dirname, "../", source)

const componentsJSON = require(proj("src/components.json"))

const packageJSON = require(proj("package.json"))

const projectName = packageJSON.name

const getExternals = (isProd) => {
  const externals = {}

  const getFilesExternals = (dirName) => {
    if (dirName === "components") {
      Object.keys(componentsJSON).forEach(name => {
        externals[`@src/${dirName}/${name}/index.js`] = `${projectName}/lib/${dirName}/${name}.js`
      })
    } else {
      const fileList = fs.readdirSync(proj(`src/${dirName}`))
      fileList.forEach(file => {
        file = path.basename(file, ".js")
        externals[`@src/${dirName}/${file}`] = `${projectName}/lib/${dirName}/${file}`
      })
    }
  }

  getFilesExternals("components")
  getFilesExternals("directives")
  getFilesExternals("mixins")
  getFilesExternals("utils")

  return isProd ? [
    nodeExternals(),
    { ...externals, vue: "vue" }
  ] : { vue: "Vue" }
}

const babelOptions = {
  babelrc: false,
  presets: [
    [
      frame("node_modules/babel-preset-env"),
      {
        loose: true,
        modules: false,
        targets: {
          browsers: ["> 1%", "last 2 versions", "not ie <= 8"]
        }
      }
    ],
    frame("node_modules/babel-preset-stage-2")
  ],
  plugins: [frame("node_modules/babel-plugin-transform-vue-jsx")]
}

module.exports = (isProd) => ({
  mode: isProd ? "production" : "development",
  resolve: {
    extensions: [".js", ".vue", ".json", ".scss"],
    alias: {
      "@src": proj("src"),
      "@demo": proj("demo"),
      "@lib": proj("lib")
    },
    modules: ["node_modules"],
    descriptionFiles: ["package.json"]
  },
  externals: getExternals(isProd),
  performance: {
    hints: false
  },
  stats: {
    children: false
  },
  optimization: {
    minimize: false
  },
  resolveLoader: {
    modules: [frame("node_modules"), "node_modules"]
  },
  module: {
    rules: [
      {
        test: /\.(jsx?|babel|es6)$/,
        include: cwd,
        exclude: /node_modules|utils\/popper\.js|utils\/date\.js/,
        loader: "babel-loader",
        options: babelOptions
      },
      {
        test: /\.vue$/,
        loader: "vue-loader",
        options: {
          compilerOptions: {
            preserveWhitespace: false
          }
        }
      }
    ]
  },
  plugins: [
    new ProgressBarPlugin(),
    new VueLoaderPlugin()
  ]
})
