"use strict"

const chalk = require("chalk")

module.exports = function * () {
  const help = [
    "",
    "fie-toolkit-ui-gen 插件使用帮助:",
    // ' $ fie xxx                 xxx',
    "fie add 新增组件或主题",
    "fie start 运行本地demo",
    "fie build 打包",
    "fie publish 发布到npm仓库和gitlab"
  ].join("\r\n")

  process.stdout.write(chalk.magenta(help))
}
