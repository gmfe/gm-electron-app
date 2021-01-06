const { app, BrowserWindow, ipcMain, Menu } = require('electron')
const config = require('./config')
const path = require('path')
const handleUpdate = require('./updata')

let printWindow = null
let mainWindow = null

function createWindow() {
  // 隐藏菜单
  Menu.setApplicationMenu(null)

  mainWindow = new BrowserWindow({
    width: 1200,
    height: 1000,
    center: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      enableRemoteModule: true,
    },
  })

  mainWindow.loadURL(config.mainLoadURL)

  // 根据配置打开开发工具
  if (config.isOpenDevTools) {
    mainWindow.webContents.openDevTools({
      mode: 'detach',
    })
  }

  // 主窗口关闭就退出程序
  mainWindow.on('closed', function () {
    mainWindow = null
    app.quit()
  })
}

function createPrintWindow() {
  if (!printWindow) {
    printWindow = new BrowserWindow({
      width: 300,
      height: 300,
      webPreferences: {
        nodeIntegration: true,
        enableRemoteModule: true,
      },
      // 默认不显示，在后台
      show: config.showPrint,
    })

    printWindow.loadURL(config.printLoadURL)

    // 根据配置打开开发工具
    if (config.isOpenPrintDevTools) {
      printWindow.webContents.openDevTools({
        mode: 'detach',
      })
    }
  }
}

function sendMessage(msgObj) {
  mainWindow.webContents.send('message', msgObj)
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
  handleUpdate(sendMessage)
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
