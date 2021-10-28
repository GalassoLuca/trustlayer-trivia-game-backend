import * as db from '../model'
import userSchema from '../schema/user'

export default function (fastify, opts) {
  fastify.route({
    method: 'POST',
    url: '/auth/signup',
    schema: { body: userSchema },
    handler: async ({ body }, reply) => db.signup(body)
  })

  fastify.route({
    method: 'POST',
    url: '/auth/signin',
    schema: { body: userSchema },
    handler: async ({ body }, reply) => db.signin(body)
  })
}
