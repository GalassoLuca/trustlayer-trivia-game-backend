export default class MissingToken extends Error {
  constructor(message = 'Missing token') {
    super(message)

    this.name = 'MissingToken'
    this.statusCode = 403
  }
}
