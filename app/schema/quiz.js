export default {
  description: 'A quiz',
  type: 'object',
  properties: {
    name: { type: 'string' },
    questions: {
      type: 'array',
      items: { $ref: '#/$defs/question' }
    }
  },
  required: ['name', 'questions'],
  $defs: {
    question: {
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
  }
}
