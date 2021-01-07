const { autoUpdater } = require('electron-updater')
const { ipcMain } = require('electron')

function handleUpdate(dispatchMsg) {
  const msg = {
    error: { status: -1, msg: '检测更新异常' },
    checking: { status: 0, msg: '正在检查更新' },
    updateAvailable: { status: 1, msg: '检测到新版本可用' },
    updateNotAvailable: { status: 2, msg: '当前使用的是最新版本' },
    canUpdateNow: { status: 3, msg: '新版本已下载完毕，是否现在安装' },
  }

  // 部署了安装文件和 latest.yml 的地址
  autoUpdater.setFeedURL('http://localhost:2333/Desktop')

  autoUpdater.on('error', () => {
    dispatchMsg(msg.error)
  })

  autoUpdater.on('checking-for-update', () => {
    dispatchMsg(msg.checking)
  })

  autoUpdater.on('update-available', () => {
    dispatchMsg(msg.updateAvailable)
  })

  autoUpdater.on('update-not-available', () => {
    dispatchMsg(msg.updateNotAvailable)
  })

  autoUpdater.on('download-progress', (progressObj) => {
    dispatchMsg(progressObj)
  })

  autoUpdater.on('update-downloaded', (progressObj) => {
    dispatchMsg(msg.canUpdateNow)
    ipcMain.handle('updateNow', (event, payload) => {
      autoUpdater.quitAndInstall()
    })
  })

  ipcMain.handle('checkForUpdate', (event, payload) => {
      autoUpdater.checkForUpdates().then((data) => {
        dispatchMsg(data)
      })
  })
}

module.exports = handleUpdate
