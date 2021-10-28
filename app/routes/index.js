import authRoutes from './auth.routes'
import quizRoutes from './quiz.routes'

export async function routes(fastify, options) {
  authRoutes(fastify, options)
  quizRoutes(fastify, options)
}
