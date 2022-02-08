import https from 'https'
import { DANEAgent, setServers, lookup } from 'https-dane'

const agent = new DANEAgent()

export default function fetchAddress (name, token = 'HNS') {
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

export { fetchAddress, DANEAgent, setServers, lookup, agent }
