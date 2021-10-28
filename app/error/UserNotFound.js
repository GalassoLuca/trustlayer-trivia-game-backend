export default class UserNotFound extends Error {
  constructor(message = 'User not found') {
    super(message)

    this.name = 'UserNotFound'
    this.statusCode = 404
  }
}
