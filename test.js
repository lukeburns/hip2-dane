const { test } = require('brittle')
const { fetchAddress, setServers } = require('./hip2-dane.js')

setServers([
  '127.0.0.1:5350'
])

test('fetch address', async assert => {
  const expected = `hs1qshuyulxra3pqpwr40303t8pn79232zztuk4qgz`
  const actual = await fetchAddress('iamfernando', 'hns')
  assert.is(expected, actual)
})

// todo: failure test
