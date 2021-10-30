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
  if (!/^2\d\d$/.test(statusCode)) {
    throw new ErrorTest(quizCreationRes.json())
  }

  return quizCreationRes.json()
}
