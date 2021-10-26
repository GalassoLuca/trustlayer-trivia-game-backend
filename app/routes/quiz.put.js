import { replaceQuiz } from '../../db'
import { createLog } from '../../log'
import { quiz } from '../schema'

const log = createLog('quiz:put')

export default {
  method: 'PUT',
  url: '/quiz/:id',
  schema: {
    body: quiz
  },
  handler
}

function handler(request, reply) {
  const { body: quiz, params } = request
  log.debug('Processing %o', quiz)

  return replaceQuiz(+params.id, quiz)
}
