import test from 'ava'
import Question from './Question.js'

test('should throw if question is missing', t => {
  const error = t.throws(() => new Question())

  t.is(error.name, 'TypeError')
  t.is(error.message, 'question is required')
})
