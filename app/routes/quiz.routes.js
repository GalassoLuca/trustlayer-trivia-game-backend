import * as db from '../../db'
import { quiz } from '../schema'

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
    handler: ({ body: quiz }, reply) => db.addQuiz(quiz)
  })

  fastify.route({
    method: 'GET',
    url: '/quiz/:id',
    handler: ({ params }, reply) => db.getQuiz(params.id)
  })

  fastify.route({
    method: 'PUT',
    url: '/quiz/:id',
    schema: {
      body: quiz
    },
    handler: ({ params, body: quiz }, reply) => db.replaceQuiz(params.id, quiz)
  })

  fastify.route({
    method: 'DELETE',
    url: '/quiz/:id',
    handler: ({ params }, reply) => db.deleteQuiz(params.id)
  })
}
