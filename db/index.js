import { validateQuiz } from './validator'
import QuizNotFound from './validator/error/QuizNotFound'

const quizzes = []

export function getQuizzes() {
  return quizzes
}

export function getQuiz(id) {
  const quiz = quizzes[id]

  if (!quiz) {
    throw new QuizNotFound()
  }

  return quiz
}

export function addQuiz(quiz) {
  validateQuiz(quiz)

  quizzes.push(quiz)

  return quiz
}

export function replaceQuiz(id, quiz) {
  validateQuiz(quiz)

  quiz[id] = quiz

  return id
}

export function deleteQuiz(id) {
  if (!quizzes[id]) {
    throw new QuizNotFound()
  }

  return quizzes.splice(id, 1)[0]
}
