import test from 'ava'
import app from '../app'
import quiz from './resource/quiz.json'
import * as db from '../app/controller/db'

test.beforeEach(async () => {
  await db.Quizzes.deleteMany({})
})

test('/api/quiz db data maniputation', async t => {
  const T1 = 'GET /api/quiz - return 200 and no quizzes (starting point)'

  let allQuizzesRes = await app.inject({
    method: 'GET',
    url: '/api/quiz'
  })

  t.is(allQuizzesRes.statusCode, 200, T1)
  t.deepEqual(allQuizzesRes.json(), [], T1)

  const T2 = 'POST /api/quiz - return 201 and create the first quiz'

  const firstQuizRes = await app.inject({
    method: 'POST',
    url: '/api/quiz',
    payload: quiz
  })

  t.is(firstQuizRes.statusCode, 201, T2)

  const { _id, ...firstQuiz } = firstQuizRes.json()
  t.is(_id.length, 24, T2)
  t.deepEqual(firstQuiz, quiz, T2)

  const T3 = 'PUT /api/quiz/:id - return 200 and update the quiz'

  const updateQuizRes = await app.inject({
    method: 'PUT',
    url: `/api/quiz/${_id}`,
    payload: {
      ...quiz,
      name: 'new name'
    }
  })

  t.is(updateQuizRes.statusCode, 200, T3)
  t.deepEqual(updateQuizRes.json().name, 'new name', T3)

  const T4 = 'GET /api/quiz - return 200 and the only quiz'

  allQuizzesRes = await app.inject({
    method: 'GET',
    url: '/api/quiz'
  })

  t.is(allQuizzesRes.statusCode, 200, T4)
  t.deepEqual(allQuizzesRes.json(), [{ ...quiz, _id, name: 'new name' }], T4)

  const T5 = 'DELETE /api/quiz/:id - return 200 and delete the selected quiz'

  const quizFromTheSystemRes = await app.inject({
    method: 'DELETE',
    url: `/api/quiz/${_id}`
  })

  t.is(quizFromTheSystemRes.statusCode, 200, T5)

  const { _id: _id2, ...firstQuizEdited } = quizFromTheSystemRes.json()
  t.deepEqual(firstQuizEdited, { ...quiz, name: 'new name' }, T5)
  t.is(_id, _id2, T5)

  const T6 = 'GET /api/quiz - return 200 and no quizzes since (all deleted)'

  allQuizzesRes = await app.inject({
    method: 'GET',
    url: '/api/quiz'
  })

  t.is(allQuizzesRes.statusCode, 200, T6)
  t.deepEqual(allQuizzesRes.json(), [], T6)
})
