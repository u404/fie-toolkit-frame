const webpack = require("webpack")

const path = require("path")

module.exports = () => {
  const config = require(path.resolve(__dirname, "webpack.common"))

  return new Promise((resolve, reject) => {
    const compiler = webpack(config)
    compiler.run((e, status) => {
      if (status.compilation.errors.length) {
        console.log("编译common失败：", status.compilation.errors)
        reject()
      } else {
        console.log("编译common成功")
        resolve()
      }
    })
  })
}
