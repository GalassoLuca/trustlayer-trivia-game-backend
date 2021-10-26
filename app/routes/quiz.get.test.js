import test from 'ava'
import app from '..'
import quiz from '../../test/resource/quiz.json'

test('GET /api/quiz/:id - return 404 when the selected quiz is missing', async t => {
  const res = await app.inject({
    method: 'GET',
    url: '/api/quiz/0'
  })

  t.is(res.statusCode, 404)
  t.deepEqual(res.json(), { error: 'Quiz not found' })
})

test('GET /api/quiz/:id - return 200 and the selected quiz', async t => {
  const quizCreationRes = await app.inject({
    method: 'POST',
    url: '/api/quiz',
    payload: quiz
  })

  t.deepEqual(quizCreationRes.json(), 0, 'error while creating the the quiz')

  const quizFromTheSystemRes = await app.inject({
    method: 'GET',
    url: '/api/quiz/0'
  })

  t.is(quizFromTheSystemRes.statusCode, 200)
  t.deepEqual(quizFromTheSystemRes.json(), quiz)
})
