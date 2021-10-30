import test from 'ava'
import app from '../app'
import * as db from '../app/controller/db'

import userTest1 from './resource/user-test-1.json'

test.beforeEach(async () => {
  await db.Users.deleteMany({})
})

test('POST /api/auth/signin return 404 user not found when user is missing', async t => {
  const userNotFoundRes = await app.inject({
    method: 'POST',
    url: '/api/auth/signin',
    payload: userTest1
  })

  t.is(userNotFoundRes.statusCode, 404)
  t.deepEqual(userNotFoundRes.json(), {
    error: 'Not Found',
    message: 'User not found',
    statusCode: 404
  })
})
