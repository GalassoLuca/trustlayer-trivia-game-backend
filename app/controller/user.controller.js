import * as db from './db'
import Unauthorized from '../error/Unauthorized'

export async function deleteUser(request, reply) {
  const { username } = request.body

  if (username !== request.user.username) {
    throw new Unauthorized()
  }

  await db.Users.deleteOne({ _id: request.user._id })

  return { message: 'User deleted' }
}
