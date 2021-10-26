import { createLog } from '../../log'
import { quiz } from '../schema'

const log = createLog('quiz:put')

export default {
  method: 'PUT',
  url: '/quiz',
  schema: {
    body: quiz
  },
  handler
}

function handler(request, reply) {
  const { body } = request
  log.debug('Processing %o', body)

  return 'TBD, replaces all current representations of the target resource with the request payload'
}
