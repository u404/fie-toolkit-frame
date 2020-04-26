const webpack = require("webpack")

const path = require("path")

module.exports = () => {
  const config = require(path.resolve(__dirname, "webpack.component"))

  return new Promise((resolve, reject) => {
    const compiler = webpack(config)
    compiler.run((err, status) => {
      console.log(err, status.compilation.errors)
      if (status.compilation.errors.length) {
        console.log("编译component失败：", status.compilation.errors)
        reject()
      } else {
        console.log("编译component成功")
        resolve()
      }
    })
  })
}
