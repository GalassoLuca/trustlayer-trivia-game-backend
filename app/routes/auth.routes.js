import * as authController from '../controller/auth.controller'
import userSchema from '../schema/user'

export default function (fastify, opts) {
  fastify.route({
    method: 'POST',
    url: '/auth/signup',
    schema: { body: userSchema },
    handler: authController.signup
  })

  fastify.route({
    method: 'POST',
    url: '/auth/signin',
    schema: { body: userSchema },
    handler: authController.signin
  })
}
