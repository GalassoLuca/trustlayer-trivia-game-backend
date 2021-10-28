import test from 'ava'
import app from '../app'
import user from './resource/user.json'
import * as db from '../app/controller/db'

test.beforeEach(async () => {
  await db.Users.deleteMany({})
})

test('/api/user db data maniputation', async t => {
  const userCreationRes = await app.inject({
    method: 'POST',
    url: '/api/auth/signup',
    payload: user
  })

  t.is(userCreationRes.statusCode, 200)

  const userSigninRes = await app.inject({
    method: 'POST',
    url: '/api/auth/signin',
    payload: user
  })

  t.is(userSigninRes.statusCode, 200)

  const userNotFoundRes = await app.inject({
    method: 'DELETE',
    url: '/api/user',
    payload: user,
    headers: {
      'x-access-token': userSigninRes.json().accessToken
    }
  })

  // t.is(userNotFoundRes.statusCode, 404)
  t.deepEqual(userNotFoundRes.json(), {
    error: 'Not Found',
    message: 'User not found',
    statusCode: 404
  })
})
