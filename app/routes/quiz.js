import * as db from '../../db'
import { quiz } from '../schema'

const quizRoutes = []

quizRoutes.push({
  method: 'GET',
  url: '/quiz',
  handler: (request, reply) => db.getQuizzes()
})

quizRoutes.push({
  method: 'POST',
  url: '/quiz',
  schema: {
    body: quiz
  },
  handler: ({ body: quiz }, reply) => db.addQuiz(quiz)
})

quizRoutes.push({
  method: 'GET',
  url: '/quiz/:id',
  handler: ({ params }, reply) => db.getQuiz(params.id)
})

quizRoutes.push({
  method: 'PUT',
  url: '/quiz/:id',
  schema: {
    body: quiz
  },
  handler: ({ params, body: quiz }, reply) => db.replaceQuiz(params.id, quiz)
})

quizRoutes.push({
  method: 'DELETE',
  url: '/quiz/:id',
  handler: ({ params }, reply) => db.deleteQuiz(params.id)
})

export default quizRoutes
