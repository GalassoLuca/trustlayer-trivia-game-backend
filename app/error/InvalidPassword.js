export default class InvalidPassword extends Error {
  constructor(message = 'Invalid password') {
    super(message)

    this.name = 'InvalidPassword'
    this.statusCode = 401
  }
}
