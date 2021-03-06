import * as quizController from '../controller/quiz.controller'
import quizSchema from '../schema/quiz'
import validateQuiz from '../middleware/validate-quiz'
import validateId from '../middleware/validate-id'
import verifyToken from '../middleware/verify-token'

export default function (fastify, opts) {
  fastify.route({
    method: 'GET',
    url: '/quiz',
    onRequest: verifyToken,
    handler: quizController.getQuizzes
  })

  fastify.route({
    method: 'POST',
    url: '/quiz',
    schema: {
      body: quizSchema
    },
    onRequest: verifyToken,
    preHandler: validateQuiz,
    handler: quizController.addQuiz
  })

  fastify.route({
    method: 'GET',
    url: '/quiz/:id',
    onRequest: verifyToken,
    preHandler: validateId,
    handler: quizController.getQuiz
  })

  fastify.route({
    method: 'PUT',
    url: '/quiz/:id',
    schema: {
      body: quizSchema
    },
    onRequest: verifyToken,
    preHandler: [validateId, validateQuiz],
    handler: quizController.replaceQuiz
  })

  fastify.route({
    method: 'DELETE',
    url: '/quiz/:id',
    onRequest: verifyToken,
    preHandler: validateId,
    handler: quizController.deleteQuiz
  })
}
