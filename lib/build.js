"use strict"

const fs = require("fs")
const path = require("path")

const chalk = require("chalk")
const build = require("../build/build")

const cwd = process.cwd()

module.exports = function * (fie) {
  if (!fs.existsSync(path.resolve(cwd, "node_modules"))) {
    fie.logInfo("检测到当前项目中没有 node_modules 目录，开始自动安装相关依赖...")
    yield fie.cnpmInstall()
  }

  yield build()
  console.log(chalk.green(`构建成功`))
}
