import initServeTestUi from './test-ui.mjs'

export async function initExpressApp ({ server, app }) {
  app.use((_, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    next()
  })

  app.get('/', await initServeTestUi())

  // add endpoints

  app.use((err, _, res, next) => {
    console.error('errorhandler mw caught:\n', err)
    if (res.headersSent) return next(err)
    res.status(500).json({ err })
  })

  console.log('app initialized')
  return app
}
