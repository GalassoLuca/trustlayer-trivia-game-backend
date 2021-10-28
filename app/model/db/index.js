import { MongoClient } from 'mongodb'
import setting from '../../settings/db.config'

const client = new MongoClient(`mongodb://${setting.HOST}:${setting.PORT}`)
await client.connect()
const db = client.db(setting.DB)

export { ObjectId } from 'mongodb'
export const Quizzes = db.collection('quizzes')
