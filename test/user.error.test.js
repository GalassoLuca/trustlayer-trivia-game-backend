import test from 'ava'
import app from '../app'
import userTest1 from './resource/user-test-1.json'
import * as db from '../app/controller/db'

test.beforeEach(async () => {
  await db.Users.deleteMany({})
})

test('DELETE /api/user return 403 Forbidden if token is missing', async t => {
  const forbiddenRes = await app.inject({
    method: 'DELETE',
    url: '/api/user',
    payload: userTest1
  })

  t.is(forbiddenRes.statusCode, 403)
  t.deepEqual(forbiddenRes.json(), {
    error: 'Forbidden',
    message: 'Missing token',
    statusCode: 403
  })
})

test('DELETE /api/user return 401 Unauthorized if is invalid', async t => {
  const unauthorizedRes = await app.inject({
    method: 'DELETE',
    url: '/api/user',
    payload: userTest1,
    headers: {
      'x-access-token': 'invalid'
    }
  })

  t.is(unauthorizedRes.statusCode, 401)
  t.deepEqual(unauthorizedRes.json(), {
    error: 'Unauthorized',
    message: 'Unauthorized',
    statusCode: 401
  })
})
