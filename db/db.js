import { MongoClient } from 'mongodb'
import { createLog } from '../log'

const log = createLog('db')

const url = 'mongodb://localhost:27017'
const client = new MongoClient(url)

await client.connect()

const selectedDB = `trivia-game-${process.env.NODE_ENV || 'development'}`
log.info('Selected db: %s', selectedDB)
const db = client.db(selectedDB)

export { ObjectId } from 'mongodb'
export const Quizzes = db.collection('quizzes')
