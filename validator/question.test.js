import test from 'ava'
import validateQuestion from './question.js'

test('throw if the question is missing', t => {
  const error = t.throws(() => validateQuestion())

  t.is(error.name, 'TypeError')
  t.is(error.message, 'question is required')
})

