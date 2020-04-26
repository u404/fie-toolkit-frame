const path = require("path")
const fs = require("fs-extra")

const addTheme = require("./add-theme")

const cwd = process.cwd()
const proj = source => path.resolve(cwd, source)

module.exports = async (prefix) => {
  const settings = {
    prefix: prefix || "v"
  }
  const settingsPath = proj("src/settings.json")

  fs.writeJSONSync(settingsPath, settings, { spaces: 2 })

  console.log("设置UI前缀：", prefix)

  await addTheme("theme-default")
}
