const { app, BrowserWindow } = require('electron')
const config = require('./config')

function createWindow() {
  const win = new BrowserWindow({
    width: 1500,
    height: 1000,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
    },
  })

  win.loadURL(config.mainLoadURL)

  // 根据配置打开开发工具
  // if (config.isOpenDevTools) {
  win.webContents.openDevTools()
  // }

  // win.on('closed', function () {
  //   mainWindow = null
  //   app.quit()
  // })
}

app.whenReady().then(createWindow)

// https://github.com/electron/electron/issues/18397
app.allowRendererProcessReuse = false

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

console.log(1)
