import validateQuestion from './question'
import validateAnswers from './answers'

export default function validate(quiz) {
  if (!quiz.name) {
    throw new TypeError('quiz name is required')
  }

  quiz.questions.forEach(q => {
    validateQuestion(q.question)
    validateAnswers(q.answers)
  })
}
