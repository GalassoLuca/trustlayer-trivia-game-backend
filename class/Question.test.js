import test from 'ava'
import Question from './Question.js'

test('should throw if question is missing', t => {
  const error = t.throws(() => new Question())

  t.is(error.name, 'TypeError')
  t.is(error.message, 'question is required')
})

test('should throw if answer are not exactly four', t => {
  const error = t.throws(() => new Question('question', ['first', 'second']))

  t.is(error.name, 'TypeError')
  t.is(error.message, 'answer must be four')
})

test('should throw the correct answer is missing', t => {
  const error = t.throws(() => new Question('question', ['first', 'second', 'third', 'fourth']))

  t.is(error.name, 'TypeError')
  t.is(error.message, 'invalid correctAnswer')
})

test('should throw the correct answer is invalid', t => {
  const error = t.throws(() => new Question('question', ['first', 'second', 'third', 'fourth'], 10))

  t.is(error.name, 'TypeError')
  t.is(error.message, 'invalid correctAnswer')
})

test('should return the question', t => {
  const questionQ = 'What is the company name?'
  const questionAnswers = ['TrustLayer', 'TruzzLayer', 'TrumfLayer', 'TrustLawyer']
  const questionCorrectAnswer = 0

  const question = new Question(questionQ, questionAnswers, questionCorrectAnswer)

  t.is(question.question, questionQ)
  t.is(question.answers, questionAnswers)
  t.is(question.correctAnswer, questionCorrectAnswer)
})
