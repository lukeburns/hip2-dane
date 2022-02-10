const { test } = require('brittle')
const { fetchAddress, setServers } = require('./well-known-wallets-dane.js')

setServers([
  '103.196.38.38',
  '103.196.38.39',
  '103.196.38.40'
])

test('fetch address', async assert => {
  const expected = `hs1qshuyulxra3pqpwr40303t8pn79232zztuk4qgz`
  const actual = await fetchAddress('iamfernando', 'hns')
  assert.is(expected, actual)
})

// todo: failure test
