import test from 'ava'
import app from '..'
import quiz from '../../test/resource/quiz.json'

test('PUT /api/quiz/:id - return 200 and the updated quiz', async t => {
  const createQuizRes = await app.inject({
    method: 'POST',
    url: '/api/quiz',
    payload: quiz
  })

  t.is(createQuizRes.statusCode, 200)
  const { _id } = createQuizRes.json()

  const updateQuizRes = await app.inject({
    method: 'PUT',
    url: `/api/quiz/${_id}`,
    payload: {
      ...quiz,
      name: 'new name'
    }
  })

  t.is(updateQuizRes.statusCode, 200)
  t.deepEqual(updateQuizRes.json().name, 'new name')
})
