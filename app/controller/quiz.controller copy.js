import * as db from './db'
import QuizNotFound from '../error/QuizNotFound'

export async function getQuizzes(request, reply) {
  return db.Quizzes.find().toArray()
}

export async function addQuiz({ user, body: quiz }, reply) {
  const res = await db.Quizzes.insertOne({ ...quiz, userId: user._id })

  reply.status(201).send({
    ...quiz,
    _id: res.insertedId
  })
}

export async function getQuiz({ user, params: { id } }) {
  const docQuiz = await db.Quizzes.findOne({
    _id: db.ObjectId(id),
    userId: user._id
  })

  if (!docQuiz) {
    throw new QuizNotFound()
  }

  const { userId, ...quiz } = docQuiz

  return quiz
}

export async function replaceQuiz({ user, params: { id }, body: quiz }) {
  const oldQuiz = await db.Quizzes.findOne({
    _id: db.ObjectId(id),
    userId: user._id
  })

  if (!oldQuiz) {
    throw new QuizNotFound()
  }

  await db.Quizzes.replaceOne({ _id: db.ObjectId(id) }, quiz)

  return quiz
}

export async function deleteQuiz({ user, params: { id } }) {
  const docQuiz = await db.Quizzes.findOne({
    _id: db.ObjectId(id),
    userId: user._id
  })

  if (!docQuiz) {
    throw new QuizNotFound()
  }

  await db.Quizzes.deleteOne({ _id: db.ObjectId(id) })

  const { userId, ...quiz } = docQuiz

  return quiz
}
