"use strict"

const path = require("path")
const fs = require("fs")
const spawn = require("cross-spawn")
const utils = require("./utils")

const cwd = utils.getCwd()

module.exports = function * (fie) {
  if (!fs.existsSync(path.resolve(cwd, ".git"))) {
    fie.logError("请检查当前项目是否已初始化 git")
    return
  }

  const spawnOpt = {
    cwd: process.cwd(),
    env: process.env,
    stdio: "inherit"
  }
  spawn.sync("fie", ["build"], spawnOpt)
  spawn.sync("fie", ["git", "push"], spawnOpt)
  spawn.sync("cnpm", ["publish"], spawnOpt)
}
