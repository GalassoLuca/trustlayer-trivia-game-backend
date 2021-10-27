import test from 'ava'
import app from '..'
import quiz from '../../test/resource/quiz.json'

test.todo('GET /api/quiz/:id - return 400 when the given id is incorrect')

test('GET /api/quiz/:id - return 404 when the selected quiz is missing', async t => {
  const res = await app.inject({
    method: 'GET',
    url: '/api/quiz/123456789012345678901234'
  })

  t.is(res.statusCode, 404)
  t.deepEqual(res.json(), {
    error: 'Not Found',
    message: 'Quiz not found',
    statusCode: 404
  })
})

test('GET /api/quiz/:id - return 200 and the selected quiz', async t => {
  const createQuizRes = await app.inject({
    method: 'POST',
    url: '/api/quiz',
    payload: quiz
  })

  t.is(createQuizRes.statusCode, 200)
  const { _id } = createQuizRes.json()

  const quizFromTheSystemRes = await app.inject({
    method: 'GET',
    url: `/api/quiz/${_id}`
  })

  const { _id: _id2, ...quizWithoutId } = quizFromTheSystemRes.json()

  t.is(_id2.length, 24)
  t.is(_id, _id2, 'The is must not change')
  t.deepEqual(quizWithoutId, quiz)
})
