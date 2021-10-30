export default {
  description: 'A quiz',
  type: 'object',
  required: ['name', 'questions'],
  properties: {
    name: { type: 'string' },
    questions: {
      type: 'array',
      items: { $ref: '#/$defs/question' }
    }
  },
  $defs: {
    question: {
      description: 'A question of the quiz',
      type: 'object',
      required: ['question', 'answers'],
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
      }
    }
  }
}
