const test = require('ava')
const log = require('./index')

test('throw if name is missing', t => {
  const error = t.throws(() => log())

  t.is(error.name, 'TypeError')
  t.is(error.message, 'name is required')
})