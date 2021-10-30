export default class ErrorTest extends Error {
  constructor({ statusCode, error, message }) {
    super(message)

    this.name = error
    this.statusCode = statusCode
  }
}
