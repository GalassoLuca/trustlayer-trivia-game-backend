import ErrorTest from './ErrorTest'

export async function signupUser(app, user) {
  const userSignupRes = await app.inject({
    method: 'POST',
    url: '/api/auth/signup',
    payload: user
  })

  const { statusCode } = userSignupRes
  if (!/^2\d\d$/.test(statusCode)) {
    throw new ErrorTest(userSignupRes.json())
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
  if (!/^2\d\d$/.test(statusCode)) {
    throw new ErrorTest(userSigninRes.json())
  }

  return userSigninRes.json()
}
