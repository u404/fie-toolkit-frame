// 检查新标题名称是否存在
// 拷贝 theme-template 到 项目 themes 目录中
// 遍历当前所有组件，为其增加scss文件，并添加到index.scss 中
const path = require("path")
const fs = require("fs-extra")
const inquirer = require("inquirer")
const nocase = require("no-case")
const _ = require("underscore")

const cwd = process.cwd()
const src = source => path.resolve(cwd, "src", source)
const template = source => path.resolve(__dirname, "template", source)

const getPrefix = () => {
  const settings = require(src("settings.json"))
  return settings.prefix
}

const createSCSS = (themeName) => {
  const componentsJSON = require(src("components.json"))
  const scssTpl = fs.readFileSync(template("component.scss.tpl"), "utf-8")
  const prefix = getPrefix()
  Object.keys(componentsJSON).forEach(Name => {
    const name = nocase(Name, null, "-")
    const scssContent = _.template(scssTpl)({ CompName: Name, compname: name, prefix })
    fs.outputFileSync(src(`themes/${themeName}/components/${Name}.scss`), scssContent)
    const indexPath = src(`themes/${themeName}/index.scss`)
    fs.outputFileSync(indexPath, `${fs.readFileSync(indexPath, "utf-8")}@import "./components/${Name}.scss";\n`)
    console.log(`已创建 ${themeName} 主题下样式文件 ${Name}.scss`)
  })
}

module.exports = async (themeName) => {
  const existsThemeList = fs.readdirSync(src(`themes`), { withFileTypes: true }).filter(o => o.isDirectory).map(o => o.name)

  if (!themeName) {
    const answers = await inquirer.prompt([{
      type: "input",
      name: "name",
      message: "请输入主题目录名（建议以theme-xxx的形式，如：theme-chalk）",
      validate: input => {
        if (existsThemeList.indexOf(input) < 0) {
          return true
        }
        return "该主题目录已存在，请重新输入"
      }
    }])
    themeName = answers.name
  }

  const themePath = src(`themes/${themeName}`)

  fs.copySync(template("theme-template"), themePath, { overwrite: false, errorOnExist: true })

  createSCSS(themeName)

  console.log("已添加主题目录：", themeName)
}
