const { remote } = require('electron')
const { Menu, MenuItem } = remote

// 测试

let menu = new Menu()

menu.append(
  new MenuItem({
    label: '刷新',
    click: () => {
      window.location.reload()
    },
  })
)

menu.append(
  new MenuItem({
    type: 'separator',
  })
)

menu.append(
  new MenuItem({
    label: '开发',
    click: () => {},
  })
)

window.addEventListener('contextmenu', (e) => {
  e.preventDefault()

  menu.popup({ window: remote.getCurrentWindow() })
})
