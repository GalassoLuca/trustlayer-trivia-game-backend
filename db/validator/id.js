import IncorrectStringId from './error/IncorrectStringId'

export default function validate(id) {
  if (id?.length !== 24) {
    throw new IncorrectStringId()
  }
}
