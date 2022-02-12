const https = require('https')
const { DANEAgent, setServers, lookup, dns } = require('https-dane')

const agent = new DANEAgent()

function fetchAddress (name, token = 'HNS') {
  return new Promise((resolve, reject) => {
    const url = `https://${name}/.well-known/wallets/${token.toUpperCase()}`
    const req = https.get(url, { agent, lookup }, res => {
      let data = ''
      res.setEncoding('utf8')
      res.on('data', chunk => data += chunk)
      res.on('end', () => {
        if (res.statusCode >= 400) {
          const error = new Error(res.statusMessage)
          error.code = res.statusCode

          return reject(error)
        }
        resolve(data.trim())
      })
    })
    req.on('error', error => reject(error))
    req.end()
  })
}

module.exports = { fetchAddress, setServers, agent, lookup, DANEAgent, dns }
