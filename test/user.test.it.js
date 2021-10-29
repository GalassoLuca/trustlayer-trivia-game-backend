import test from 'ava'
import app from '../app'
import user from './resource/user.json'
import * as db from '../app/controller/db'

test.beforeEach(async () => {
  await db.Users.deleteMany({})
})

test('DELETE /api/user - return 200 when deleting the user', async t => {
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

  t.is(userNotFoundRes.statusCode, 200)
  t.deepEqual(userNotFoundRes.json(), {
    message: 'User deleted'
  })
})

test('DELETE /api/user - return 401 if deleting another user', async t => {
  let userCreationRes = await app.inject({
    method: 'POST',
    url: '/api/auth/signup',
    payload: user
  })

  t.is(userCreationRes.statusCode, 200)

  const user2 = { ...user, username: user.username + '2' }

  userCreationRes = await app.inject({
    method: 'POST',
    url: '/api/auth/signup',
    payload: user2
  })

  t.is(userCreationRes.statusCode, 200)

  const userSigninRes = await app.inject({
    method: 'POST',
    url: '/api/auth/signin',
    payload: user
  })

  t.is(userSigninRes.statusCode, 200)

  const unauthorizedRes = await app.inject({
    method: 'DELETE',
    url: '/api/user',
    payload: user2,
    headers: {
      'x-access-token': userSigninRes.json().accessToken
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
  let userCreationRes = await app.inject({
    method: 'POST',
    url: '/api/auth/signup',
    payload: user
  })

  t.is(userCreationRes.statusCode, 200)

  const user2 = { ...user, username: user.username + '2' }

  userCreationRes = await app.inject({
    method: 'POST',
    url: '/api/auth/signup',
    payload: user2
  })

  t.is(userCreationRes.statusCode, 200)

  const userSigninRes = await app.inject({
    method: 'POST',
    url: '/api/auth/signin',
    payload: user
  })

  t.is(userSigninRes.statusCode, 200)

  const unauthorizedRes = await app.inject({
    method: 'PUT',
    url: '/api/user',
    payload: user2,
    headers: {
      'x-access-token': userSigninRes.json().accessToken
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
  let userCreationRes = await app.inject({
    method: 'POST',
    url: '/api/auth/signup',
    payload: user
  })

  t.is(userCreationRes.statusCode, 200)

  const user2 = { ...user, username: user.username + '2' }

  userCreationRes = await app.inject({
    method: 'POST',
    url: '/api/auth/signup',
    payload: user2
  })

  t.is(userCreationRes.statusCode, 200)

  let userSigninRes = await app.inject({
    method: 'POST',
    url: '/api/auth/signin',
    payload: user
  })

  t.is(userSigninRes.statusCode, 200)

  const updateUserRes = await app.inject({
    method: 'PUT',
    url: '/api/user',
    payload: { ...user, password: 'newPassword' },
    headers: {
      'x-access-token': userSigninRes.json().accessToken
    }
  })

  t.is(updateUserRes.statusCode, 200)
  t.deepEqual(updateUserRes.json(), {
    message: 'User updated'
  })

  userSigninRes = await app.inject({
    method: 'POST',
    url: '/api/auth/signin',
    payload: { ...user, password: 'newPassword' }
  })

  t.is(userSigninRes.statusCode, 200)
})
