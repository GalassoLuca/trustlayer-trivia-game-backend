import { addQuiz } from '../../db'
import { createLog } from '../../log'
import { quiz } from '../schema'

const log = createLog('quiz:put')

export default {
  method: 'POST',
  url: '/quiz',
  schema: {
    body: quiz
  },
  handler
}

function handler(request, reply) {
  const { body: quiz } = request
  log.debug('Processing %o', quiz)

  return addQuiz(quiz)
}
