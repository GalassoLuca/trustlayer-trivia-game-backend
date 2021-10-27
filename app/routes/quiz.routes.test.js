import test from 'ava'
import app from '..'
import quiz from '../../test/resource/quiz.json'
import * as db from '../../db/db'

test.beforeEach(async () => {
  await db.Quizzes.deleteMany({})
})

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
  t.is(allQuizzesRes.json().length, 1)

  const { _id, ...quizWithoutId } = allQuizzesRes.json()[0]
  t.is(_id.length, 24)
  t.deepEqual(quizWithoutId, quiz)
})

test('POST /api/quiz - return 201 and the created quiz', async t => {
  const createQuizRes = await app.inject({
    method: 'POST',
    url: '/api/quiz',
    payload: quiz
  })

  t.is(createQuizRes.statusCode, 200)

  const { _id, ...quizWithoutId } = createQuizRes.json()
  t.is(_id.length, 24)
  t.deepEqual(quizWithoutId, quiz)
})

test('GET /api/quiz/:id - return 400 when the given id is incorrect', async t => {
  const res = await app.inject({
    method: 'GET',
    url: '/api/quiz/0'
  })

  t.is(res.statusCode, 400)
  t.deepEqual(res.json(), {
    statusCode: 400,
    error: 'Bad Request',
    message: 'id must be a string of 24 hex characters'
  })
})

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

test('PUT /api/quiz/:id - return 200 and the updated quiz', async t => {
  const createQuizRes = await app.inject({
    method: 'POST',
    url: '/api/quiz',
    payload: quiz
  })

  t.is(createQuizRes.statusCode, 200)
  const { _id } = createQuizRes.json()

  const updateQuizRes = await app.inject({
    method: 'PUT',
    url: `/api/quiz/${_id}`,
    payload: {
      ...quiz,
      name: 'new name'
    }
  })

  t.is(updateQuizRes.statusCode, 200)
  t.deepEqual(updateQuizRes.json().name, 'new name')
})

test('DELETE /api/quiz/:id - return 400 when the given id is incorrect', async t => {
  const res = await app.inject({
    method: 'DELETE',
    url: '/api/quiz/0'
  })

  t.is(res.statusCode, 400)
  t.deepEqual(res.json(), {
    statusCode: 400,
    error: 'Bad Request',
    message: 'id must be a string of 24 hex characters'
  })
})

test('DELETE /api/quiz/:id - return 404 when deleting unexisting quiz', async t => {
  const res = await app.inject({
    method: 'DELETE',
    url: '/api/quiz/123456789012345678901234'
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
  const { _id } = createQuizRes.json()

  const quizFromTheSystemRes = await app.inject({
    method: 'DELETE',
    url: `/api/quiz/${_id}`
  })

  t.is(quizFromTheSystemRes.statusCode, 200)

  const { _id: _id2, ...quizWithoutId } = quizFromTheSystemRes.json()
  t.deepEqual(quizWithoutId, quiz)
  t.is(_id, _id2)

  const quizAfterRes = await app.inject({
    method: 'GET',
    url: `/api/quiz/${_id}`
  })

  t.is(quizAfterRes.statusCode, 404)
})
