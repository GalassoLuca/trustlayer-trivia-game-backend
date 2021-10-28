import * as db from '../model'
import { quiz } from '../schema'
import validateQuiz from '../middleware/validate-quiz'
import validateId from '../middleware/validate-id'

export default async function (fastify, opts) {
  fastify.route({
    method: 'GET',
    url: '/quiz',
    handler: (request, reply) => db.getQuizzes()
  })

  fastify.route({
    method: 'POST',
    url: '/quiz',
    schema: {
      body: quiz
    },
    preHandler: validateQuiz,
    handler: async ({ body: quiz }, reply) =>
      reply.status(201).send(await db.addQuiz(quiz))
  })

  fastify.route({
    method: 'GET',
    url: '/quiz/:id',
    preHandler: validateId,
    handler: ({ params }, reply) => db.getQuiz(params.id)
  })

  fastify.route({
    method: 'PUT',
    url: '/quiz/:id',
    schema: {
      body: quiz
    },
    preHandler: [validateId, validateQuiz],
    handler: ({ params, body: quiz }, reply) => db.replaceQuiz(params.id, quiz)
  })

  fastify.route({
    method: 'DELETE',
    url: '/quiz/:id',
    preHandler: validateId,
    handler: ({ params }, reply) => db.deleteQuiz(params.id)
  })
}
