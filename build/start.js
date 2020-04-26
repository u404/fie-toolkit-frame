const webpack = require("webpack")
const Server = require("webpack-dev-server")
const merge = require("webpack-merge")
const inquirer = require("inquirer")
const fs = require("fs-extra")

const path = require("path")
const frame = source => path.resolve(__dirname, "../", source)
const cwd = process.cwd()
const proj = source => path.resolve(cwd, source)

const buildEntry = require("./build-entry")

module.exports = async () => {
  let themeName = "theme-default"

  const themeList = fs.readdirSync(proj("src/themes"), { withFileTypes: true }).filter(o => o.isDirectory).map(o => o.name)

  const answers = await inquirer.prompt([{
    type: "list",
    name: "name",
    message: "请选择使用的主题",
    choices: themeList,
    default: "theme-default"
  }])

  themeName = answers.name

  const config = require(frame("build/webpack.demo"))

  const newConfig = merge.smart(config, {
    resolve: {
      alias: {
        "@theme": proj(`src/themes/${themeName}`)
      }
    }
  })

  buildEntry()

  const compiler = webpack(newConfig)

  new Server(compiler, {
    open: true
  }).listen(8080, (err) => {
    if (err) {
      console.log(err)
    } else {
      console.log("server start at 8080")
    }
  })
}
