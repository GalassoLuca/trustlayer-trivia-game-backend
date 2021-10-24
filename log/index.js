import pino from 'pino'

export default function createLog (name, options = {}) {
  if (!name) {
    throw new TypeError('name is required')
  }

  const defaults = {
    base: { pid: process.pid, name },
    level: process.env.LOG || 'info',
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
        translateTime: 'SYS:yyyy-mm-dd HH:MM:ss',
        levelFirst: true
      }
    }
  }

  return pino({ ...defaults, ...options })
}
