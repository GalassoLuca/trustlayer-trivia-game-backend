import test from 'ava'
import Question from './Question.js'
import Quiz from './Quiz.js'

test('should throw if name is missing', t => {
  const error = t.throws(() => new Quiz())

  t.is(error.name, 'TypeError')
  t.is(error.message, 'name is required')
})

test('should return the quiz', t => {
  const question = new Question('What is the company name?', ['TrustLayer', 'TruzzLayer', 'TrumfLayer', 'TrustLawyer'], 0)
  const quiz = new Quiz('Trivia Game', [question])

  t.is(quiz.name, 'Trivia Game')
  t.deepEqual(quiz.questions, [question])
})
