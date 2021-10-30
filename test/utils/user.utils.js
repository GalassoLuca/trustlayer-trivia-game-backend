export async function signupUser(app, user) {
  const userSignupRes = await app.inject({
    method: 'POST',
    url: '/api/auth/signup',
    payload: user
  })

  const { statusCode } = userSignupRes
  if (statusCode !== 200) {
    throw new Error(`Unexpected statusCode (${statusCode} found)`)
  }

  return userSignupRes.json()
}

export async function signinUser(app, user) {
  const userSigninRes = await app.inject({
    method: 'POST',
    url: '/api/auth/signin',
    payload: user
  })

  const { statusCode } = userSigninRes
  if (statusCode !== 200) {
    throw new Error(`Unexpected statusCode (${statusCode} found)`)
  }

  return userSigninRes.json()
}
