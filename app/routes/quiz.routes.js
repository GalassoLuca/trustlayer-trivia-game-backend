import * as quizController from '../controller/quiz'
import quizSchema from '../schema/quiz'
import validateQuiz from '../middleware/validate-quiz'
import validateId from '../middleware/validate-id'

export default function (fastify, opts) {
  fastify.route({
    method: 'GET',
    url: '/quiz',
    handler: quizController.getQuizzes
  })

  fastify.route({
    method: 'POST',
    url: '/quiz',
    schema: {
      body: quizSchema
    },
    preHandler: validateQuiz,
    handler: quizController.addQuiz
  })

  fastify.route({
    method: 'GET',
    url: '/quiz/:id',
    preHandler: validateId,
    handler: quizController.getQuiz
  })

  fastify.route({
    method: 'PUT',
    url: '/quiz/:id',
    schema: {
      body: quizSchema
    },
    preHandler: [validateId, validateQuiz],
    handler: quizController.replaceQuiz
  })

  fastify.route({
    method: 'DELETE',
    url: '/quiz/:id',
    preHandler: validateId,
    handler: quizController.deleteQuiz
  })
}
