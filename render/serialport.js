const SerialPort = require('serialport')

SerialPort.list().then((list) => {
  console.log(list)

  const port = new SerialPort(
    list[1].path,
    {
      baudRate: 9600,
    },
    (err) => {
      if (err) {
        console.warn(err)
      } else {
        console.log('success')
      }
    }
  )
  console.log(port)

  port.on('data', (d) => {
    console.log(d)
  })
})
