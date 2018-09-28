import express from 'express'
import { createServer } from 'http'
import { initExpressApp } from './app.mjs'
import initSocketIoApp from './socket.io.mjs'

const startServer = (server, port, address) => new Promise((resolve, reject) =>
  server.listen(port, address, err => err ? reject(err) : resolve())
)

export default async function start ({
  port = 5000,
  address = '0.0.0.0'
} = {}) {
  const app = express()
  const server = createServer(app)

  await initExpressApp({ app, server })

  await initSocketIoApp({ server })

  await startServer(server, port, address)
  console.log(`${new Date().toLocaleTimeString()} > listening on: ${address}:${port}`)

  return server
}
