import IncorrectBody from '../error/IncorrectBody'

export default function validate({ body }, res, next) {
  const { name, questions = [] } = body

  if (!name) {
    throw new IncorrectBody('quiz name is required')
  }

  questions.forEach(({ question, answers }) => {
    if (!question?.length) {
      throw new IncorrectBody('question is required')
    }

    if (!answers || answers.length !== 4) {
      throw new IncorrectBody('answer must be four')
    }

    if (answers.some(a => !a.answer)) {
      throw new IncorrectBody('all the answers can not be empty')
    }

    if (answers.every(a => !a.correct)) {
      throw new IncorrectBody('the correct answer is missing')
    }

    if (answers.filter(a => a.correct).length !== 1) {
      throw new IncorrectBody('only one answer must be correct')
    }
  })

  next()
}
