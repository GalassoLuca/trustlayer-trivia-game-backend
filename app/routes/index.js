import getQuizzes from './quizzes.get'
import getQuiz from './quiz.get'
import putQuiz from './quiz.put'
import deleteQuiz from './quiz.delete'

export async function routes (fastify, options) {
  fastify.route(getQuizzes)

  fastify.route(getQuiz)
  fastify.route(putQuiz)
  fastify.route(deleteQuiz)
}
