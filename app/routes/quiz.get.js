import { getQuiz } from '../../db'
import { createLog } from '../../log'

const log = createLog('GET /quiz/:id')

export default {
  method: 'GET',
  url: '/quiz/:id',
  handler
}

function handler(request, reply) {
  const { params } = request
  log.debug('Processing %o', { params })

  return getQuiz(params.id)
}
