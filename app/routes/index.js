import quizRoutes from './quiz.routes'

export async function routes(fastify, options) {
  quizRoutes(fastify, options)
}
