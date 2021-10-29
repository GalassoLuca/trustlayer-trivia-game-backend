import test from 'ava'
import app from '../app'

test('GET /api/quiz - return 400 when the given id is incorrect', async t => {
  const res = await app.inject({
    method: 'GET',
    url: '/api/quiz'
  })

  t.is(res.statusCode, 403)
  t.deepEqual(res.json(), {
    statusCode: 403,
    error: 'Forbidden',
    message: 'Missing token'
  })
})

test('POST /api/quiz - return 400 when the given id is incorrect', async t => {
  const res = await app.inject({
    method: 'POST',
    url: '/api/quiz'
  })

  t.is(res.statusCode, 403)
  t.deepEqual(res.json(), {
    statusCode: 403,
    error: 'Forbidden',
    message: 'Missing token'
  })
})

test('GET /api/quiz/:id - return 400 when the given id is incorrect', async t => {
  const res = await app.inject({
    method: 'GET',
    url: '/api/quiz/0'
  })

  t.is(res.statusCode, 403)
  t.deepEqual(res.json(), {
    statusCode: 403,
    error: 'Forbidden',
    message: 'Missing token'
  })
})

test('PUT /api/quiz/:id - return 400 when the given id is incorrect', async t => {
  const res = await app.inject({
    method: 'PUT',
    url: '/api/quiz/0'
  })

  t.is(res.statusCode, 403)
  t.deepEqual(res.json(), {
    statusCode: 403,
    error: 'Forbidden',
    message: 'Missing token'
  })
})

test('DELETE /api/quiz/:id - return 400 when the given id is incorrect', async t => {
  const res = await app.inject({
    method: 'DELETE',
    url: '/api/quiz/0'
  })

  t.is(res.statusCode, 403)
  t.deepEqual(res.json(), {
    statusCode: 403,
    error: 'Forbidden',
    message: 'Missing token'
  })
})
