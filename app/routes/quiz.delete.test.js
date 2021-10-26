import test from 'ava'
import app from '..'
import quiz from '../../test/resource/quiz.json'

test('DELETE /api/quiz/:id - return 404 when deleting unexisting quiz', async t => {
  const res = await app.inject({
    method: 'DELETE',
    url: '/api/quiz/0'
  })

  t.is(res.statusCode, 404)
  t.deepEqual(res.json(), {
    statusCode: 404,
    error: 'Not Found',
    message: 'Quiz not found'
  })
})

test('DELETE /api/quiz/:id - return 200 and delete the selected quiz', async t => {
  const createQuizRes = await app.inject({
    method: 'POST',
    url: '/api/quiz',
    payload: quiz
  })

  t.is(createQuizRes.statusCode, 200)

  const quizFromTheSystemRes = await app.inject({
    method: 'DELETE',
    url: '/api/quiz/0'
  })

  t.is(quizFromTheSystemRes.statusCode, 200)
  t.deepEqual(quizFromTheSystemRes.json(), quiz)

  const quizAfterRes = await app.inject({
    method: 'GET',
    url: '/api/quiz/0'
  })

  t.is(quizAfterRes.statusCode, 404)
})
