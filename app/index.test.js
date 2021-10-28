import test from 'ava'
import app from '.'

test('GET /api - return a 200 OK', async t => {
  const res = await app.inject({
    method: 'GET',
    url: '/api'
  })

  t.is(res.statusCode, 200)
  t.deepEqual(res.json(), { status: 'OK' })
})
