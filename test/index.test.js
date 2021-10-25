import test from 'ava'
import app from '../app/index.js'

test('GET / - return a 200 OK', async t => {
  const res = await app.inject({
    method: 'GET',
    url: '/api'
  })

  t.is(res.statusCode, 200)
  t.deepEqual(res.json(), { status: 'OK' })
})
