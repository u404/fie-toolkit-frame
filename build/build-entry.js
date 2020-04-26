const path = require("path")
const fs = require("fs-extra")
const camelcase = require("camelcase")
const _ = require("underscore")
const endOfLine = require("os").EOL

const cwd = process.cwd()

const src = source => path.resolve(cwd, "src", source)

const buildEntry = function () {
  const tpl = fs.readFileSync(src("index.js.tpl"), "utf-8")
  const components = require(src("components.json"))
  const directives = fs.readdirSync(src("directives"), { withFileTypes: true }).map(d => path.basename(d.name, ".js"))
  const filters = fs.readdirSync(src("filters"), { withFileTypes: true }).map(d => path.basename(d.name, ".js"))

  const importTpls = []
  const listTpls = []
  const importDirts = []
  const listDirts = []
  const importFlts = []
  const listFlts = []

  Object.keys(components).forEach(name => {
    importTpls.push(`import ${name} from '@src/components/${name}/index.js'`)
    listTpls.push(`  ${name}`)
  })

  directives.forEach(name => {
    const camelCaseName = camelcase(name)
    importDirts.push(`import ${camelCaseName} from '@src/directives/${name}.js'`)
    listDirts.push(`  ${camelCaseName}`)
  })

  filters.forEach(name => {
    const camelCaseName = camelcase(name)
    importFlts.push(`import ${camelCaseName}Filter from '@src/filters/${name}.js'`)
    listFlts.push(`  ${camelCaseName}: ${camelCaseName}Filter`)
  })

  const content = _.template(tpl)({
    importTpl: importTpls.join(endOfLine),
    listTpl: listTpls.join(`,${endOfLine}`),
    importDirectives: importDirts.join(endOfLine),
    listDirectives: listDirts.join(`,${endOfLine}`),
    importFilters: importFlts.join(endOfLine),
    listFilters: listFlts.join(endOfLine),
    version: process.env.VERSION || require(src("../package.json")).version
  })

  fs.outputFileSync(src("index.js"), content)

  console.log("[build entry] DONE")
}

module.exports = buildEntry
