import { createLog } from '../../log'
import { getQuizzes } from '../../db'

export default {
  method: 'GET',
  url: '/quiz',
  handler
}

function handler(request, reply) {
  return getQuizzes()
}
