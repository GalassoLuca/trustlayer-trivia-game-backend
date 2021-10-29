import * as db from './db'
import QuizNotFound from '../error/QuizNotFound'

export async function getQuizzes(request, reply) {
  return db.Quizzes.find().toArray()
}

export async function addQuiz({ body: quiz, user }, reply) {
  await db.Quizzes.insertOne(quiz)

  reply.status(201).send(quiz)
}

export async function getQuiz({ params: { id } }) {
  const quiz = await db.Quizzes.findOne({ _id: db.ObjectId(id) })

  if (!quiz) {
    throw new QuizNotFound()
  }

  return quiz
}

export async function replaceQuiz({ params: { id }, body: quiz }) {
  const oldQuiz = await db.Quizzes.findOne({ _id: db.ObjectId(id) })

  if (!oldQuiz) {
    throw new QuizNotFound()
  }

  await db.Quizzes.replaceOne({ _id: db.ObjectId(id) }, quiz)

  return quiz
}

export async function deleteQuiz({ params: { id } }) {
  const quiz = await db.Quizzes.findOne({ _id: db.ObjectId(id) })

  if (!quiz) {
    throw new QuizNotFound()
  }

  await db.Quizzes.deleteOne({ _id: db.ObjectId(id) })

  return quiz
}
