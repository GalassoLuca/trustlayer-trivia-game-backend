import test from 'ava'
import app from '../app'
import userTest1 from './resource/user-test-1.json'
import * as db from '../app/controller/db'

test.beforeEach(async () => {
  await db.Users.deleteMany({})
})

test('/api/auth db data maniputation', async t => {
  const T1 = 'POST /api/auth/signup - return 200 when creating the user'

  const userCreationRes = await app.inject({
    method: 'POST',
    url: '/api/auth/signup',
    payload: userTest1
  })

  t.is(userCreationRes.statusCode, 200, T1)
  t.deepEqual(
    userCreationRes.json(),
    { message: 'User registered successfully!' },
    T1
  )

  const T2 = 'POST /api/auth/signup - return 400 if the user already exists'

  const userDuplicateRes = await app.inject({
    method: 'POST',
    url: '/api/auth/signup',
    payload: userTest1
  })

  t.is(userDuplicateRes.statusCode, 400, T2)
  t.deepEqual(
    userDuplicateRes.json(),
    {
      error: 'Bad Request',
      message: 'Username is already in use',
      statusCode: 400
    },
    T2
  )

  const T3 = 'POST /api/auth/signin - return 401 if the password is wrong'

  const loginWrongPswRes = await app.inject({
    method: 'POST',
    url: '/api/auth/signin',
    payload: { ...userTest1, password: 'wrong' }
  })

  t.is(loginWrongPswRes.statusCode, 401, T3)
  t.deepEqual(
    loginWrongPswRes.json(),
    {
      error: 'Unauthorized',
      message: 'Invalid password',
      statusCode: 401
    },
    T3
  )

  const T4 = 'POST /api/auth/signin - return 200 and the token'

  const loginRes = await app.inject({
    method: 'POST',
    url: '/api/auth/signin',
    payload: userTest1
  })

  t.is(loginRes.statusCode, 200, T4)
  t.is(typeof loginRes.json().accessToken, 'string')
  t.is(loginRes.json().username, userTest1.username)
})
