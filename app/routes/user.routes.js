import * as userController from '../controller/user.controller'
import userSchema from '../schema/user.username'
import verifyToken from '../middleware/verify-token'

export default function (fastify, opts) {
  fastify.route({
    method: 'DELETE',
    url: '/user',
    schema: { body: userSchema },
    preValidation: verifyToken,
    handler: userController.deleteUser
  })

  fastify.route({
    method: 'PUT',
    url: '/user',
    schema: { body: userSchema },
    preValidation: verifyToken,
    handler: userController.updateUser
  })
}
