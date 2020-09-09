const readAuth = require('basic-auth')
const safeCompare = require('safe-compare')
const serveStatic = require('serve-static')

/*
 *
 */

const auth = req =>
  new Promise(resolve => {
    const credentials = readAuth(req)
    const authorized = credentials && safeCompare(credentials.name, 'admin') && safeCompare(credentials.pass, 'admin')
    resolve(authorized)
  })

const serveHandler = serveStatic(__dirname + '/dist')
const serve = (req, res, handle404) => new Promise(() => serveHandler(req, res, handle404))

/*
 *
 */

const app = async (req, res) => {
  // If requests admin area, auth user before serving files
  if (req.url.startsWith('/')) {
    const authorized = await auth(req, res)
    if (!authorized) {
      res.writeHead(401, { 'WWW-Authenticate': 'Basic realm="now-basic-auth.node"' })
      return res.end('Restricted area, please login (admin:admin).')
    }
  }

  // Serve files
  return serve(req, res, () => {
    res.statusCode = 404
    res.end('404 Not Found')
  })
}

module.exports = app
