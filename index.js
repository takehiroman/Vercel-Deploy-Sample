const protect = require('static-auth')
const safeCompare = require('safe-compare')

/*
 *
 */

const app = protect('/', (username, password) => safeCompare(username, 'admin') && safeCompare(password, 'admin'), {
  directory: __dirname + '/dist',
  realm: 'now-basic-auth.node-static-auth',
  onAuthFailed: res => {
    res.end('Restricted area, please login (admin:admin).')
  }
})

module.exports = app
