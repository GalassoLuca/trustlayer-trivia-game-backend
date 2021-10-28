import { createLog } from '../../log'
const log = createLog('db')

const DB = `trivia-game-${process.env.NODE_ENV || 'development'}`

log.info('Selected db: %s', DB)

export default {
  HOST: 'localhost',
  PORT: 27017,
  DB
}
