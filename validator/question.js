export default function validate (question) {
  if (!question?.length) {
    throw new TypeError('question is required')
  }
}
