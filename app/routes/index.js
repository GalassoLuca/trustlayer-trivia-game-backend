import authRoutes from './auth.routes'
import usersRoutes from './user.routes'
import quizRoutes from './quiz.routes'

export async function routes(fastify, options) {
  authRoutes(fastify, options)
  usersRoutes(fastify, options)
  quizRoutes(fastify, options)
}
