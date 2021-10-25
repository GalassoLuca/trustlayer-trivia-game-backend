export default function validate (answers) {
  if (!answers || answers.length !== 4) {
    throw new TypeError('answer must be four')
  }

  if (answers.some(a => !a.answer)) {
    throw new TypeError('all the answers can not be empty')
  }

  if (answers.every(a => !a.correct)) {
    throw new TypeError('the correct answer is missing')
  }

  if (answers.filter(a => a.correct).length !== 1) {
    throw new TypeError('only one answer must be correct')
  }
}