const { test } = require('brittle')
const { fetchAddress, setServers } = require('.')

setServers([
  '127.0.0.1'
])

test('fetch address', async assert => {
  const expected = `hs1qshuyulxra3pqpwr40303t8pn79232zztuk4qgz`
  const actual = await fetchAddress('iamfernando')
  assert.is(expected, actual)
})

test('alias-address collision', async assert => {
  try {
    await fetchAddress('hs1qshuyulxra3pqpwr40303t8pn79232zztuk4qgz')
  } catch (e) {
    assert.pass(e.toString())
  }
})

test('invalid address', async assert => {
  try {
    await fetchAddress('invalid-addr.bb-8')
  } catch (e) {
    assert.pass(e.toString())
  }
})

test('invalid type', async assert => {
  try {
    await fetchAddress('invalid-type.bb-8')
  } catch (e) {
    assert.pass(e.toString())
  }
})

test('response too large', async assert => {
  try {
    await fetchAddress('large-size.bb-8')
  } catch (e) {
    assert.pass(e.toString())
  }
})
