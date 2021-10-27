import test from 'ava'
import { createLog } from './index'

test('throw if name is missing', t => {
  const error = t.throws(() => createLog())

  t.is(error.name, 'TypeError')
  t.is(error.message, 'name is required')
})
