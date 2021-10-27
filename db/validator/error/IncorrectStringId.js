export default class IncorrectStringId extends Error {
  constructor(message = 'id must be a string of 24 hex characters') {
    super(message)

    this.name = 'IncorrectStringId'
    this.statusCode = 400
  }
}
