import test from 'ava'
import validateQuiz from './quiz'

test('throw if the question is missing', t => {
  const error = t.throws(() => validateQuiz())

  t.is(error.name, 'TypeError')
  t.is(error.message, 'question is required')
})

test('throw if the answers are missing', t => {
  const error = t.throws(() => validateQuiz('question?'))

  t.is(error.name, 'TypeError')
  t.is(error.message, 'answer must be four')
})
