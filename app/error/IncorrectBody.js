export default class IncorrectBody extends Error {
  constructor(message) {
    super(message)

    this.name = 'IncorrectBody'
    this.statusCode = 400
  }
}
