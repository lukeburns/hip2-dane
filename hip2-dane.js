const https = require('https')
const { DANEAgent, setServers, lookup, dns } = require('https-dane')

const agent = new DANEAgent()

const defaultOpts = {
  token: 'HNS',
  maxLength: 43,
  validate: key => !!key && key.slice(0,3) === 'hs1' && key.length === 42
}

function fetchAddress (name, opts=defaultOpts) {
  const { token, maxLength, validate } = opts || {}
  return new Promise((resolve, reject) => {
    const url = `https://${name}/.well-known/wallets/${token.toUpperCase()}`
    const req = https.get(url, { agent, lookup }, res => {
      let data = ''
      res.setEncoding('utf8')
      res.on('data', chunk => {
        if (data.length + chunk.length > maxLength) {
          req.destroy()
          return reject('response too large')
        }
        data += chunk
      })
      res.on('end', () => {
        if (res.statusCode >= 400) {
          const error = new Error(res.statusMessage)
          error.code = res.statusCode

          return reject(error)
        }
        data = data.trim()
        if (validate && validate(data)) {
          resolve(data)
        } else {
          reject('invalid address')
        }
      })
    })
    req.on('error', error => reject(error))
    req.end()
  })
}

module.exports = { fetchAddress, setServers, agent, lookup, DANEAgent, dns }
