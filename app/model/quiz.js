import * as db from './db'
import QuizNotFound from '../error/QuizNotFound'

export async function getQuizzes() {
  return db.Quizzes.find().toArray()
}

export async function getQuiz(id) {
  const quiz = await db.Quizzes.findOne({ _id: db.ObjectId(id) })

  if (!quiz) {
    throw new QuizNotFound()
  }

  return quiz
}

export async function addQuiz(quiz) {
  await db.Quizzes.insertOne(quiz)

  return quiz
}

export async function replaceQuiz(id, quiz) {
  const oldQuiz = await db.Quizzes.findOne({ _id: db.ObjectId(id) })

  if (!oldQuiz) {
    throw new QuizNotFound()
  }

  await db.Quizzes.replaceOne({ _id: db.ObjectId(id) }, quiz)

  return quiz
}

export async function deleteQuiz(id) {
  const quiz = await db.Quizzes.findOne({ _id: db.ObjectId(id) })

  if (!quiz) {
    throw new QuizNotFound()
  }

  await db.Quizzes.deleteOne({ _id: db.ObjectId(id) })

  return quiz
}
