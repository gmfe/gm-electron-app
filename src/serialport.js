const SerialPort = require('serialport')

SerialPort.list().then(list => {
  console.log(list)
})
