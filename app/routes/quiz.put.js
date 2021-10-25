import { createLog } from '../../log'

const log = createLog('app:question')

export default {
  method: 'PUT',
  url: '/quiz/:id',
  handler
}

function handler (request, reply) {
  const { body } = request
  log.debug('Processing', { body })

  return 'TBD, replaces all current representations of the target resource with the request payload'
}
