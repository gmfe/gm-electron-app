const { app, BrowserWindow, ipcMain } = require('electron')
const config = require('./config')

let printWindow = null

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

function createPrintWindow () {
  if(!printWindow) {
    printWindow = new BrowserWindow({
      width: 300,
      height: 300,
      webPreferences: {
        nodeIntegration: true,
        enableRemoteModule: true
      }
    })

    printWindow.loadFile('label.html')
    printWindow.webContents.openDevTools()

  }
}

// 接受渲染进程对 print 事件
ipcMain.handle('print', (event, payload) => {
  // 像打印窗口发送 print 事件
  printWindow.webContents.send('print', payload)
  // return payload
})

app.whenReady().then(() => {
  createWindow()
  createPrintWindow()
})

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
    createPrintWindow()
  }
})

console.log(1)
