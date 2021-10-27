import { validateQuiz } from './validator'
import QuizNotFound from './validator/error/QuizNotFound'
import * as db from './db'
import { validateId } from './validator'

function toId(id) {
  validateId(id)

  return db.ObjectId(id)
}

export async function getQuizzes() {
  return db.Quizzes.find().toArray()
}

export async function getQuiz(id) {
  const quiz = await db.Quizzes.findOne({ _id: toId(id) })

  if (!quiz) {
    throw new QuizNotFound()
  }

  return quiz
}

export async function addQuiz(quiz) {
  validateQuiz(quiz)

  await db.Quizzes.insertOne(quiz)

  return quiz
}

export async function replaceQuiz(id, quiz) {
  validateQuiz(quiz)

  const oldQuiz = await db.Quizzes.findOne({ _id: toId(id) })

  if (!oldQuiz) {
    throw new QuizNotFound()
  }

  await db.Quizzes.replaceOne({ _id: toId(id) }, quiz)

  return quiz
}

export async function deleteQuiz(id) {
  const quiz = await db.Quizzes.findOne({ _id: toId(id) })

  if (!quiz) {
    throw new QuizNotFound()
  }

  await db.Quizzes.deleteOne({ _id: toId(id) })

  return quiz
}
