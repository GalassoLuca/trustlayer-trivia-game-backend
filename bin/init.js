import { createLog } from '../log'
import { signup } from '../app/controller/auth.controller'
import * as db from '../app/controller/db'

const log = createLog('db')

const user = {
  username: 'user',
  password: 'pwd'
}

log.info('creating user %o', user)

try {
  await signup({ body: user })
  log.info('user created')
} catch (error) {
  if (error.name !== 'UsernameDuplicate') {
    log.error('error %o creating user %o', error, user)
  }

  log.warn('User already exists')
}

db.closeConnection()
