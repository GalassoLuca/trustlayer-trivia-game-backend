import * as db from './db'
import Unauthorized from '../error/Unauthorized'
import { generateHash } from './util/password'

export async function deleteUser(request, reply) {
  const { username } = request.body

  if (username !== request.user.username) {
    throw new Unauthorized()
  }

  await db.Users.deleteOne({ _id: request.user._id })

  return { message: 'User deleted' }
}

export async function updateUser(request, reply) {
  const { username, password } = request.body

  if (username !== request.user.username) {
    throw new Unauthorized()
  }

  await db.Users.updateOne(
    { _id: request.user._id },
    {
      $set: {
        username,
        password: generateHash(password)
      }
    }
  )

  return { message: 'User updated' }
}
