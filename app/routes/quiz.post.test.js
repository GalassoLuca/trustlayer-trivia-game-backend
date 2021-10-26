import test from 'ava'
import app from '..'
import quiz from '../../test/resource/quiz.json'

test('GET /api/quiz/:id - return 201 and the created quiz', async t => {
  const quizCreationRes = await app.inject({
    method: 'POST',
    url: '/api/quiz',
    payload: quiz
  })

  t.is(quizCreationRes.statusCode, 200)
  t.deepEqual(quizCreationRes.json(), quiz)
})
