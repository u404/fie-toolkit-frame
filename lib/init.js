"use strict"

const path = require("path")
const chalk = require("chalk")
const inquirer = require("inquirer")
const spawn = require("cross-spawn")

const utils = require("./utils")
const init = require("../build/init")

const cwd = utils.getCwd()

module.exports = function * (fie) {
  const projectName = cwd.split(path.sep).pop()

  const config = fie.getModuleConfig()

  const answers = yield inquirer.prompt([{
    type: "input",
    name: "prefix",
    default: "v"
  }])

  fie.dirCopy({
    src: utils.getTemplateDir("root"),
    dist: cwd,
    data: config,
    ignore: [
      "node_modules", "build", ".DS_Store", ".idea"
    ],
    sstrRpelace: [
      {
        str: "DEF_PROJECT_NAME",
        replacer: projectName
      },
      {
        str: "DEF_GIT_USER_NAME",
        replacer: config.name
      },
      {
        str: "DEF_GIT_USER_EMAIL",
        replacer: config.email
      }
    ],
    filenameTransformer (name) {
      if (name === "_gitignore") {
        name = ".gitignore"
      }
      return name
    }
  })

  init(answers.prefix)

  fie.logInfo("开始安装 dependencies 依赖包 ... ")
  yield fie.cnpmInstall()

  const answer = yield inquirer.prompt([
    {
      type: "confirm",
      name: "git",
      message: chalk.green("是否创建远程仓库？"),
      default: true
    }
  ])

  if (answer.git) {
    spawn.sync("fie", ["git", "create", "-m"], {
      cwd,
      env: process.env,
      stdio: "inherit"
    })
  }

  console.log(chalk.yellow("\n--------------------初始化成功,请按下面提示进行操作--------------------\n"))
  console.log(chalk.green(`${chalk.yellow("$ fie help")}                # 可查看当前套件的详细帮助`))
}
