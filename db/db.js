import { MongoClient } from 'mongodb'

const url = 'mongodb://localhost:27017'
const client = new MongoClient(url)

await client.connect()

const db = client.db('trivia-game')

export { ObjectId } from 'mongodb'
export const Quizzes = db.collection('quizzes')
