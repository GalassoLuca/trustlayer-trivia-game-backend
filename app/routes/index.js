import quizRoutes from './quiz'

export async function routes(fastify, options) {
  quizRoutes.forEach(route => {
    fastify.route(route)
  })
}
