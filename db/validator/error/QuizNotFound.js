export default class QuizNotFound extends Error {
  constructor(message = 'Quiz not found') {
    super(message)

    this.name = 'QuizNotFound'
    this.statusCode = 404
  }
}
