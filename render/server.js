const http = require('http')
const config = require('./config')

// /api/getWeight

function setHeader(res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  res.setHeader('content-type', 'application/json')
}

const server = http.createServer((req, res) => {
  setHeader(res)

  console.log('req.url', req.url)

  if (req.url === '/api/getWeight') {
    res.end(JSON.stringify({ weight: window.__electron_weight }))
  } else {
    res.end('hello')
  }
})

// TODO 成功失败
server.listen(config.serverPort)

console.log(`server listen ${config.serverPort}`)
