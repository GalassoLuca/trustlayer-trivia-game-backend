import validateQuestion from './question'
import validateAnswers from './answers'

export default function validate(question, answers) {
  validateQuestion(question)
  validateAnswers(answers)
}
