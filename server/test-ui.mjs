import fs from 'fs'
import { promisify } from 'util'
import { join, dirname } from 'path'

const { url } = import.meta

const readFile = promisify(fs.readFile)

export default async function initServeTestUi () {
  const dir = dirname(new URL(url).pathname)

  const testUi = await readFile(join(dir, './test.html'), 'utf8')
  console.log('read test.html:\n', testUi)

  return function serveTestUi (_, res) {
    res.set('Content-Type', 'text/html')
    res.set('X-Content-Type-Options', 'nosniff')
    return res.send(testUi)
  }
}
