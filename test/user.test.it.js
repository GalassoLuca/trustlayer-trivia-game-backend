import test from 'ava'
import app from '../app'
import * as db from '../app/controller/db'

import userTest1 from './resource/user-test-1.json'
import userTest2 from './resource/user-test-2.json'

import { signupUser, signinUser } from './utils/user.utils'

test.beforeEach(async () => {
  await db.Users.deleteMany({})
})

test('DELETE /api/user - return 200 when deleting the user', async t => {
  await signupUser(app, userTest1)
  const userTest1SigninRes = await signinUser(app, userTest1)

  const userNotFoundRes = await app.inject({
    method: 'DELETE',
    url: '/api/user',
    payload: userTest1,
    headers: {
      'x-access-token': userTest1SigninRes.accessToken
    }
  })

  t.is(userNotFoundRes.statusCode, 200)
  t.deepEqual(userNotFoundRes.json(), {
    message: 'User deleted'
  })
})

test('DELETE /api/user - return 401 if deleting another user', async t => {
  await signupUser(app, userTest1)
  await signupUser(app, userTest2)

  const userTest1SigninRes = await signinUser(app, userTest1)

  const unauthorizedRes = await app.inject({
    method: 'DELETE',
    url: '/api/user',
    payload: userTest2,
    headers: {
      'x-access-token': userTest1SigninRes.accessToken
    }
  })

  t.is(unauthorizedRes.statusCode, 401)
  t.deepEqual(unauthorizedRes.json(), {
    error: 'Unauthorized',
    message: 'Unauthorized',
    statusCode: 401
  })
})

test('PUT /api/user - return 401 if updating another user', async t => {
  await signupUser(app, userTest1)
  await signupUser(app, userTest2)

  const userTest1SigninRes = await signinUser(app, userTest1)

  const unauthorizedRes = await app.inject({
    method: 'PUT',
    url: '/api/user',
    payload: userTest2,
    headers: {
      'x-access-token': userTest1SigninRes.accessToken
    }
  })

  t.is(unauthorizedRes.statusCode, 401)
  t.deepEqual(unauthorizedRes.json(), {
    error: 'Unauthorized',
    message: 'Unauthorized',
    statusCode: 401
  })
})

test('PUT /api/user - return 200 and modify the user with the new password', async t => {
  await signupUser(app, userTest1)
  let userTest1SigninRes = await signinUser(app, userTest1)

  const userTest1NewPwd = {
    ...userTest1,
    password: 'new password'
  }

  const updateUserTest1Res = await app.inject({
    method: 'PUT',
    url: '/api/user',
    payload: userTest1NewPwd,
    headers: {
      'x-access-token': userTest1SigninRes.accessToken
    }
  })

  t.is(updateUserTest1Res.statusCode, 200)
  t.deepEqual(updateUserTest1Res.json(), {
    message: 'User updated'
  })

  await signinUser(app, userTest1NewPwd)
})
