import getQuizzes from './quiz.get.all'
import getQuiz from './quiz.get'
import postQuiz from './quiz.post'
import putQuiz from './quiz.put'
import deleteQuiz from './quiz.delete'

export async function routes(fastify, options) {
  fastify.route(getQuizzes)

  fastify.route(getQuiz)
  fastify.route(postQuiz)
  fastify.route(putQuiz)
  fastify.route(deleteQuiz)
}
