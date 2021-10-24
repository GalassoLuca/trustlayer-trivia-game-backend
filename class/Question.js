export default class Question {
  constructor (question, answers) {
    if (!question) {
      throw new TypeError ('question is required')
    }

    if (!answers || answers.length !== 4) {
      throw new TypeError ('answer must be four')
    }
  }
}
