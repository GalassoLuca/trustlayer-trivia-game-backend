import { validateQuiz } from './validator'

const quizzes = []

export function getQuizzes() {
  return quizzes
}

export function getQuiz(id) {
  return quizzes[id]
}

export function addQuiz(quiz) {
  validateQuiz(quiz)

  quizzes.push(quiz)

  return quizzes.length - 1
}

export function replaceQuiz(id, quiz) {
  validateQuiz(quiz)

  quiz[id] = quiz

  return id
}

export function deleteQuiz(id) {
  return quizzes.splice(id, 1)
}
