import validateQuestion from './question'
import validateAnswers from './answers'

export default function validate({ name, questions = [] } = {}) {
  if (!name) {
    throw new TypeError('quiz name is required')
  }

  questions.forEach(q => {
    validateQuestion(q.question)
    validateAnswers(q.answers)
  })
}
