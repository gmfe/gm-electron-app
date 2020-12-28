const { app } = require('electron')
const path = require('path')

const config = {
  mainLoadURL: `file://${__dirname}/index.html`,
  printLoadURL: `file://${__dirname}/print.html`,
  isOpenDevTools: false,
  showPrint: false,
  isOpenPrintDevTools: false,
}

try {
  const mes = require(app.getPath('desktop') + '/electron.json')
  Object.assign(config, mes)
} catch (err) {
  console.log(err)
}

console.log('config', config)

module.exports = config
