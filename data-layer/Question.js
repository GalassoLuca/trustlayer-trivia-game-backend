export default class Question {
  constructor (question, answers) {
    if (!question) {
      throw new TypeError ('question is required')
    }
  }
}
