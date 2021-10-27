import test from 'ava'
import validateQuestion from './question'

test('throw if the question is missing', t => {
  const error = t.throws(() => validateQuestion())

  t.is(error.name, 'TypeError')
  t.is(error.message, 'question is required')
})
