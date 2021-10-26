import question from './question'

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
    question
  }
}
