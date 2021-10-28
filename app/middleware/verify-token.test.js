import test from 'ava'
import validateToken from './verify-token'

test('throw if the token is missing', async t => {
  const error = await t.throwsAsync(() =>
    validateToken({ headers: {} }, {}, Function)
  )

  t.is(error.name, 'MissingToken')
  t.is(error.message, 'Missing token')
})

test('throw if the token is invalid', async t => {
  const error = await t.throwsAsync(() =>
    validateToken({ headers: { 'x-access-token': 'invalid' } }, {}, Function)
  )

  t.is(error.name, 'Unauthorized')
  t.is(error.message, 'Unauthorized')
})
