import { MongoClient } from 'mongodb'
import { createLog } from '../log'

const log = createLog('db')

const setting = {
  HOST: 'localhost',
  PORT: 27017,
  DB: `trivia-game-${process.env.NODE_ENV || 'development'}`
}

log.info('Selected db: %s', setting.DB)

const client = new MongoClient(`mongodb://${setting.HOST}:${setting.PORT}`)
await client.connect()
const db = client.db(setting.DB)

export { ObjectId } from 'mongodb'
export const Quizzes = db.collection('quizzes')
