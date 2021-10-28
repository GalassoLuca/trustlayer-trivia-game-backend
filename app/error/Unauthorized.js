export default class Unauthorized extends Error {
  constructor(message = 'Unauthorized') {
    super(message)

    this.name = 'Unauthorized'
    this.statusCode = 401
  }
}
