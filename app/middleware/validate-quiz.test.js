import test from 'ava'
import validateQuiz from './validate-quiz'
import quiz from '../../test/resource/quiz.json'

test('not throw for a valid quiz', t => {
  const result = validateQuiz({ body: quiz }, {}, Function)

  t.is(result, undefined)
})

test('throw if the quiz name is missing', t => {
  const error = t.throws(() => validateQuiz({ body: {} }, {}, Function))

  t.is(error.name, 'IncorrectBody')
  t.is(error.message, 'quiz name is required')
})

test('throw if the question is missing', t => {
  const quiz = { name: 'Trivia', questions: [{}] }

  const error = t.throws(() => validateQuiz({ body: quiz }, {}, Function))

  t.is(error.name, 'IncorrectBody')
  t.is(error.message, 'question is required')
})

test('throw if the answers are missing', t => {
  const quiz = { name: 'Trivia', questions: [{ question: '?' }] }

  const error = t.throws(() => validateQuiz({ body: quiz }, {}, Function))

  t.is(error.name, 'IncorrectBody')
  t.is(error.message, 'answer must be four')
})

test('throw if some answer are missing', t => {
  const answers = [{ answer: 'first' }, { answer: null }]
  const quiz = { name: 'Trivia', questions: [{ question: '?', answers }] }

  const error = t.throws(() => validateQuiz({ body: quiz }, {}, Function))

  t.is(error.name, 'IncorrectBody')
  t.is(error.message, 'answer must be four')
})

test('throw if the correct answer is not specified', t => {
  const answers = [
    { answer: 'first' },
    { answer: 'second' },
    { answer: 'third' },
    { answer: 'fourth' }
  ]
  const quiz = { name: 'Trivia', questions: [{ question: '?', answers }] }

  const error = t.throws(() => validateQuiz({ body: quiz }, {}, Function))

  t.is(error.name, 'IncorrectBody')
  t.is(error.message, 'the correct answer is missing')
})

test('throw if there are multiple answer corrects', t => {
  const answers = [
    { answer: 'first', correct: true },
    { answer: 'second', correct: true },
    { answer: 'third' },
    { answer: 'fourth' }
  ]
  const quiz = { name: 'Trivia', questions: [{ question: '?', answers }] }

  const error = t.throws(() => validateQuiz({ body: quiz }, {}, Function))

  t.is(error.name, 'IncorrectBody')
  t.is(error.message, 'only one answer must be correct')
})
