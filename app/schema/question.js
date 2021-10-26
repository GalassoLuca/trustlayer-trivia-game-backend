export default {
  description: 'A question of the quiz',
  type: 'object',
  properties: {
    question: { type: 'string' },
    answers: {
      type: 'array',
      items: {
        type: 'object',
        required: ['answer'],
        properties: {
          answer: { type: 'string' },
          correct: { type: 'boolean' }
        }
      }
    }
  },
  required: ['question', 'answers']
}
