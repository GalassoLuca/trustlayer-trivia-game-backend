export default class Question {
  constructor(question, answers, correctAnswer) {
    if (!question) {
      throw new TypeError('question is required')
    }

    if (!answers || answers.length !== 4) {
      throw new TypeError('answer must be four')
    }

    if (!(correctAnswer >= 0 && correctAnswer < answers.length)) {
      throw new TypeError('invalid correctAnswer')
    }
  }
}
