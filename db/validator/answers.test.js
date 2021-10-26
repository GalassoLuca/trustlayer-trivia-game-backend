import test from 'ava'
import validateAnswers from './answers'

test('throw if answer are not answer', t => {
  const error = t.throws(() => validateAnswers())

  t.is(error.name, 'TypeError')
  t.is(error.message, 'answer must be four')
})

test('throw if some answer are missing', t => {
  const answers = [{ answer: 'first' }, { answer: null }]

  const error = t.throws(() => validateAnswers(answers))

  t.is(error.name, 'TypeError')
  t.is(error.message, 'answer must be four')
})

test('throw if the correct answer is not specified', t => {
  const answers = [
    { answer: 'first' },
    { answer: 'second' },
    { answer: 'third' },
    { answer: 'fourth' }
  ]

  const error = t.throws(() => validateAnswers(answers))

  t.is(error.name, 'TypeError')
  t.is(error.message, 'the correct answer is missing')
})

test('throw if there are multiple answer corrects', t => {
  const answers = [
    { answer: 'first', correct: true },
    { answer: 'second', correct: true },
    { answer: 'third' },
    { answer: 'fourth' }
  ]

  const error = t.throws(() => validateAnswers(answers))

  t.is(error.name, 'TypeError')
  t.is(error.message, 'only one answer must be correct')
})

test('not throw in case there are no error the question', t => {
  const answer = [
    { answer: 'TrustLayer', correct: true },
    { answer: 'TruzzLayer' },
    { answer: 'TrumfLayer' },
    { answer: 'TrustLawyer' }
  ]

  t.falsy(validateAnswers(answer))
})
