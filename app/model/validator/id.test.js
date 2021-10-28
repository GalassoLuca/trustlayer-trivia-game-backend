import test from 'ava'
import validateId from './id'

test('throw if the id is missing', t => {
  const error = t.throws(() => validateId())

  t.is(error.name, 'IncorrectStringId')
  t.is(error.message, 'id must be a string of 24 hex characters')
})

test('throw if the id is not a valid string', t => {
  const error = t.throws(() => validateId('0'))

  t.is(error.name, 'IncorrectStringId')
  t.is(error.message, 'id must be a string of 24 hex characters')
})

test('not throw if the id is a valid string', t => {
  t.falsy(validateId('123456789012345678901234'))
})
