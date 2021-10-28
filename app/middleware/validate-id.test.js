import test from 'ava'
import validateId from './validate-id'

test('throw if the id is missing', t => {
  const error = t.throws(() => validateId({ params: {} }, {}, Function))

  t.is(error.name, 'IncorrectStringId')
  t.is(error.message, 'id must be a string of 24 hex characters')
})

test('throw if the id is not a valid string', t => {
  const id = '0'

  const error = t.throws(() => validateId({ params: { id } }, {}, Function))

  t.is(error.name, 'IncorrectStringId')
  t.is(error.message, 'id must be a string of 24 hex characters')
})

test('not throw if the id is a valid string', t => {
  const id = '1'.repeat(24)

  const result = validateId({ params: { id } }, {}, Function)

  t.falsy(result)
})
