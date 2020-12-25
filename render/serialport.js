const SerialPort = require('serialport')
const Readline = require('@serialport/parser-readline')

SerialPort.list().then((list) => {
  console.log(list)
  connect(list[1].path)
})

window.buffer = []

function connect(path) {
  const port = new SerialPort(
    path,
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

  const parser = new Readline({delimiter: '='})
  port.pipe(parser)
  parser.on('data', (d) => {
    console.log(d)
  })

  port.on('data', (d) => {
    window.buffer.push(d)
  })
}
