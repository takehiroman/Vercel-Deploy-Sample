const protect = require('static-auth')
const safeCompare = require('safe-compare')

const USER_NAME = process.env.USER_NAME || 'user'
const PASSWORD = process.env.PASSWORD || 'password'

const app = protect('/', (username, password) => safeCompare(username, USER_NAME) && safeCompare(password, PASSWORD), {
  directory: `${__dirname}/public`,
  realm: 'now-basic-auth.node-static-auth',
  onAuthFailed: res => {
    res.end('Authentication failed')
  }
})

module.exports = app
