import fastify from 'fastify'
const app = fastify()

export default app

app.get('/api', (request, reply) => {
  reply.send({ status: 'OK' })
})

import { routes } from './routes'
app.register(routes, { prefix: '/api' })
