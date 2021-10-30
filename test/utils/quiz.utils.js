export async function createQuiz(app, user, quiz) {
  const quizCreationRes = await app.inject({
    method: 'POST',
    url: '/api/quiz',
    payload: quiz,
    headers: {
      'x-access-token': user.accessToken
    }
  })

  const { statusCode } = quizCreationRes
  if (statusCode !== 201) {
    throw new Error(`Unexpected statusCode (${statusCode} found)`)
  }

  return quizCreationRes.json()
}
