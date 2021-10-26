import { createLog } from '../../log'
import { deleteQuiz } from '../../db'

const log = createLog('quiz:delete')

export default {
  method: 'DELETE',
  url: '/quiz/:id',
  handler
}

function handler(request, reply) {
  const { params } = request
  log.debug('Processing %o', { params })

  return deleteQuiz(params.id)
}
