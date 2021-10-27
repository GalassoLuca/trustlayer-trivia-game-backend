import test from 'ava'
import app from '../../app'

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
