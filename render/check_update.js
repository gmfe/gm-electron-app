// preload 中已经把 ipcRenderer 挂载到 window
window.ipcRenderer.invoke('checkForUpdate')

window.ipcRenderer.on('message', (event, payload) => {
  console.log('event', event)
  console.log('payload', payload)
})
