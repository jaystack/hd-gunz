import startServer from './src/server.mjs'

(async function main () {
  try {
    await startServer()
  } catch (err) {
    console.error('could not start server, exiting')
    console.error(err)
    process.exit(42)
  }
})()
