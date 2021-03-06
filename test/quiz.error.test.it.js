import test from 'ava'
import app from '../app'
import * as db from '../app/controller/db'

import userTest1 from './resource/user-test-1.json'
import userTest2 from './resource/user-test-2.json'
import quiz from './resource/quiz.json'

import { signupUser, signinUser } from './utils/user.utils'
import { createQuiz } from './utils/quiz.utils'

test.before(async t => {
  await db.Users.deleteMany({})
  await signupUser(app, userTest1)
  await signupUser(app, userTest2)

  t.context.userTest1 = await signinUser(app, userTest1)
  t.context.userTest2 = await signinUser(app, userTest2)
})

test('GET /api/quiz/:id - return 400 when the given id is incorrect', async t => {
  const res = await app.inject({
    method: 'GET',
    url: '/api/quiz/0',
    headers: {
      'x-access-token': t.context.userTest1.accessToken
    }
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
    url: '/api/quiz/123456789012345678901234',
    headers: {
      'x-access-token': t.context.userTest1.accessToken
    }
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
    url: '/api/quiz/0',
    headers: {
      'x-access-token': t.context.userTest1.accessToken
    }
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
    url: '/api/quiz/123456789012345678901234',
    headers: {
      'x-access-token': t.context.userTest1.accessToken
    }
  })

  t.is(res.statusCode, 404)
  t.deepEqual(res.json(), {
    statusCode: 404,
    error: 'Not Found',
    message: 'Quiz not found'
  })
})

test('GET /api/quiz/:id - return 404 when the quiz is not linked to the logged user', async t => {
  const quizRes = await createQuiz(app, t.context.userTest1, quiz)

  const quizNotFoundRes = await app.inject({
    method: 'GET',
    url: `/api/quiz/${quizRes._id}`,
    headers: {
      'x-access-token': t.context.userTest2.accessToken
    }
  })

  t.is(quizNotFoundRes.statusCode, 404)
  t.deepEqual(quizNotFoundRes.json(), {
    error: 'Not Found',
    message: 'Quiz not found',
    statusCode: 404
  })
})

test('PUT /api/quiz/:id - return 404 when the quiz is not linked to the logged user', async t => {
  const quizRes = await createQuiz(app, t.context.userTest1, quiz)

  const quizNotFoundRes = await app.inject({
    method: 'PUT',
    url: `/api/quiz/${quizRes._id}`,
    headers: {
      'x-access-token': t.context.userTest2.accessToken
    },
    payload: quiz
  })

  t.is(quizNotFoundRes.statusCode, 404)
  t.deepEqual(quizNotFoundRes.json(), {
    error: 'Not Found',
    message: 'Quiz not found',
    statusCode: 404
  })
})

test('DELETE /api/quiz/:id - return 404 when the quiz is not linked to the logged user', async t => {
  const quizRes = await createQuiz(app, t.context.userTest1, quiz)

  const quizNotFoundRes = await app.inject({
    method: 'DELETE',
    url: `/api/quiz/${quizRes._id}`,
    headers: {
      'x-access-token': t.context.userTest2.accessToken
    }
  })

  t.is(quizNotFoundRes.statusCode, 404)
  t.deepEqual(quizNotFoundRes.json(), {
    error: 'Not Found',
    message: 'Quiz not found',
    statusCode: 404
  })
})
