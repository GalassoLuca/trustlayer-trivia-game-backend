import test from 'ava'
import validateQuiz from './quiz'

test('throw if the quiz name is missing', t => {
  const error = t.throws(() => validateQuiz())

  t.is(error.name, 'TypeError')
  t.is(error.message, 'quiz name is required')
})

test('throw if the question is missing', t => {
  const error = t.throws(() =>
    validateQuiz({ name: 'Trivia', questions: [{}] })
  )

  t.is(error.name, 'TypeError')
  t.is(error.message, 'question is required')
})
