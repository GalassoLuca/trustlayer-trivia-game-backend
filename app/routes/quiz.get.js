import { createLog } from '../../log'

const log = createLog('app:question')

export default {
  method: 'GET',
  url: '/quiz/:id',
  handler
}

function handler (request, reply) {
  const { body } = request
  log.debug('Processing', { body })

  return 'TBD, return the selected quiz'
}
