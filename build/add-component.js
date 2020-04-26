// 读取输入的组件名
// 检查components.json中是否已存在
// 将组件添加到components.json，并写入文件
// 创建src/components/xxx/main.vue
// 创建src/components/xxx/index.js
// 遍历src/themes/找出全部theme-xxx目录
// 在每个theme目录中，创建/components/xxx.scss
// 在每个theme目录中index.scss 中插入 `@import "./components/xxx.scss";\n`

const path = require("path")
const fs = require("fs-extra")
const _ = require("underscore")
const camelcase = require("camelcase")
const nocase = require("no-case")
const inquirer = require("inquirer")

const cwd = process.cwd()
const src = source => path.resolve(cwd, "src", source)
const template = source => path.resolve(__dirname, "template", source)
const demo = source => path.resolve(cwd, "demo", source)

const getPrefix = () => {
  const settings = require(src("settings.json"))
  return settings.prefix
}

const appendComponentsJSON = (CompName) => {
  const filePath = src("components.json")
  const componentsJson = require(filePath)
  if (componentsJson[CompName]) {
    console.error(`${CompName} 组件已存在`)
    return false
  }
  componentsJson[CompName] = `@src/components/${CompName}/index.js`
  fs.writeJSONSync(filePath, componentsJson, { spaces: 2 })
  console.log(`${CompName} 组件已写入components.json`)
  return true
}

const createComponent = (CompName, compname, prefix) => {
  const vueTpl = fs.readFileSync(template("component.vue.tpl"), "utf-8")
  const jsTpl = fs.readFileSync(template("index.js.tpl"), "utf-8")

  const savePath = saveName => src(`components/${CompName}/${saveName}`)

  const vueContent = _.template(vueTpl)({ CompName, compname, prefix })

  const jsContent = _.template(jsTpl)({ CompName, compname, prefix })

  fs.outputFileSync(savePath("main.vue"), vueContent)
  fs.outputFileSync(savePath("index.js"), jsContent)
  console.log(`已创建 src/ components / ${CompName} / main.vue 和 index.js`)
}

const createSCSS = (CompName, compname, prefix) => {
  const themes = fs.readdirSync(src("themes"), { withFileTypes: true }).filter(d => d.isDirectory()).map(d => d.name)

  const scssTpl = fs.readFileSync(template("component.scss.tpl"), "utf-8")
  const scssContent = _.template(scssTpl)({ CompName, compname, prefix })

  themes.forEach(themeName => {
    fs.outputFileSync(src(`themes/${themeName}/components/${CompName}.scss`), scssContent)
    const indexPath = src(`themes/${themeName}/index.scss`)
    fs.outputFileSync(indexPath, `${fs.readFileSync(indexPath, "utf-8").replace(/\n*$/, "\n")}@import "./components/${CompName}.scss";`)
    console.log(`已创建 ${themeName} 主题下样式文件 ${CompName}.scss`)
  })
}

const createExample = (CompName, compname, prefix) => {
  const jsonPath = demo(`route.config.json`)
  const json = require(jsonPath)
  json[CompName] = `/${compname}`

  fs.writeJSONSync(jsonPath, json, { spaces: 2 })

  const exampleTpl = fs.readFileSync(template("example.vue.tpl"), "utf-8")
  const exampleContent = _.template(exampleTpl)({ CompName, compname, prefix })
  fs.outputFileSync(demo(`components/${CompName}.vue`), exampleContent)

  console.log(`创建Example 文件成功`)
}

const addComp = async () => {
  const answers = await inquirer.prompt([{
    type: "input",
    name: "name",
    message: "请输入组件名（建议以UpperCamelCase的形式，如：Input）"
  }])

  let name = answers.name

  if (!name) {
    console.error("组件名必填")
    return
  }
  const CompName = camelcase(name, { pascalCase: true })
  const compname = nocase(name, null, "-")
  const prefix = getPrefix()
  if (!appendComponentsJSON(CompName)) {
    return
  }

  createComponent(CompName, compname, prefix)

  createSCSS(CompName, compname, prefix)

  createExample(CompName, compname, prefix)

  console.log(`组件 ${CompName} 创建成功`)
}
module.exports = addComp
