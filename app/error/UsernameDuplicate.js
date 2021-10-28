export default class UsernameDuplicate extends Error {
  constructor(message = 'Username is already in use') {
    super(message)

    this.name = 'UsernameDuplicate'
    this.statusCode = 400
  }
}
