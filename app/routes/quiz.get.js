import { getQuiz } from '../../db'
import { createLog } from '../../log'

const log = createLog('quiz:get')

export default {
  method: 'GET',
  url: '/quiz/:id',
  handler
}

function handler(request, reply) {
  const { params } = request
  log.debug('Processing %o', { params })

  const quiz = getQuiz(params.id)

  if (!quiz) {
    return reply.code(404).send({ error: 'Quiz not found' })
  }

  return quiz
}
