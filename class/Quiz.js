export default class Quiz {
  constructor (name, questions = []) {
    if (!name) {
      throw new TypeError('name is required')
    }

    this.name = name
    this.questions = questions
  }
}
