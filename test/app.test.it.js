import test from 'ava'
import app from '../app'
import quiz from './resource/quiz.json'
import * as db from '../db/db'

test.beforeEach(async () => {
  await db.Quizzes.deleteMany({})
})

test('API db data maniputation', async t => {
  const M1 = 'GET /api/quiz - return 200 and no quizzes (starting point)'

  let allQuizzesRes = await app.inject({
    method: 'GET',
    url: '/api/quiz'
  })

  t.is(allQuizzesRes.statusCode, 200, M1)
  t.deepEqual(allQuizzesRes.json(), [], M1)

  const M2 = 'POST /api/quiz - return 201 and create the first quiz'

  const firstQuizRes = await app.inject({
    method: 'POST',
    url: '/api/quiz',
    payload: quiz
  })

  // t.is(firstQuizRes.statusCode, 201, M2)

  const { _id, ...firstQuiz } = firstQuizRes.json()
  t.is(_id.length, 24, M2)
  t.deepEqual(firstQuiz, quiz, M2)

  const M3 = 'PUT /api/quiz/:id - return 200 and update the quiz'

  const updateQuizRes = await app.inject({
    method: 'PUT',
    url: `/api/quiz/${_id}`,
    payload: {
      ...quiz,
      name: 'new name'
    }
  })

  t.is(updateQuizRes.statusCode, 200, M3)
  t.deepEqual(updateQuizRes.json().name, 'new name', M3)

  const M4 = 'GET /api/quiz - return 200 and the only quiz'

  allQuizzesRes = await app.inject({
    method: 'GET',
    url: '/api/quiz'
  })

  t.is(allQuizzesRes.statusCode, 200, M4)
  t.deepEqual(allQuizzesRes.json(), [{ ...quiz, _id, name: 'new name' }], M4)

  const M5 = 'DELETE /api/quiz/:id - return 200 and delete the selected quiz'

  const quizFromTheSystemRes = await app.inject({
    method: 'DELETE',
    url: `/api/quiz/${_id}`
  })

  t.is(quizFromTheSystemRes.statusCode, 200, M5)

  const { _id: _id2, ...firstQuizEdited } = quizFromTheSystemRes.json()
  t.deepEqual(firstQuizEdited, { ...quiz, name: 'new name' }, M5)
  t.is(_id, _id2, M5)

  const M6 = 'GET /api/quiz - return 200 and no quizzes since (all deleted)'

  allQuizzesRes = await app.inject({
    method: 'GET',
    url: '/api/quiz'
  })

  t.is(allQuizzesRes.statusCode, 200, M6)
  t.deepEqual(allQuizzesRes.json(), [], M6)
})
