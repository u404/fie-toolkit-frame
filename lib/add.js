"use strict"

const inquirer = require("inquirer")

const addComp = require("../build/add-component")
const addTheme = require("../build/add-theme")

module.exports = function * (fie) {
  let addType = process.argv[3]

  if (!addType) {
    const answers = yield inquirer.prompt([{
      type: "list",
      name: "type",
      message: "请选择新增的内容",
      choices: [
        {
          key: "Component - 组件",
          value: "component"
        },
        {
          key: "Theme - 主题样式",
          value: "theme"
        }
      ],
      default: "component"
    }])

    addType = answers.type
  }

  if (/^comp\w*/.test(addType)) {
    yield addComp()
  } else if (/^theme/.test(addType)) {
    yield addTheme()
  } else {
    console.log("输入参数有误")
  }
}
