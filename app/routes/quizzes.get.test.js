import test from 'ava'
import app from '..'
import quiz from '../../test/resource/quiz.json'

test('GET /api/quiz - return 200 and empty array if there are no quizzes', async t => {
  const allQuizzesRes = await app.inject({
    method: 'GET',
    url: '/api/quiz'
  })

  t.is(allQuizzesRes.statusCode, 200)
  t.deepEqual(allQuizzesRes.json(), [])
})

test('GET /api/quiz - return 200 and all the quizzes', async t => {
  const createQuizRes = await app.inject({
    method: 'POST',
    url: '/api/quiz',
    payload: quiz
  })

  t.is(createQuizRes.statusCode, 200)

  const allQuizzesRes = await app.inject({
    method: 'GET',
    url: '/api/quiz'
  })

  t.is(allQuizzesRes.statusCode, 200)
  t.deepEqual(allQuizzesRes.json(), [quiz])
})
