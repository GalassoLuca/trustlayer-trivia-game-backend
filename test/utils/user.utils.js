export async function signupUser(app, user) {
  const userSignupRes = await app.inject({
    method: 'POST',
    url: '/api/auth/signup',
    payload: user
  })

  if (userSignupRes.statusCode !== 200) {
    throw new Error('Unexpected statusCode')
  }

  return userSignupRes
}

export async function signinUser(app, user) {
  const userSigninRes = await app.inject({
    method: 'POST',
    url: '/api/auth/signin',
    payload: user
  })

  if (userSigninRes.statusCode !== 200) {
    throw new Error('Unexpected statusCode')
  }

  return userSigninRes
}
