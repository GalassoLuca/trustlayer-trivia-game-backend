import { MongoClient } from 'mongodb'
import config from '../../config/db.config'

const client = new MongoClient(`mongodb://${config.HOST}:${config.PORT}`)
await client.connect()
const db = client.db(config.DB)

export { ObjectId } from 'mongodb'
export const Quizzes = db.collection('quizzes')
export const Users = db.collection('users')
