import IncorrectStringId from '../error/IncorrectStringId'

export default function validate({ params }, res, next) {
  if (params.id?.length !== 24) {
    throw new IncorrectStringId()
  }

  next()
}
