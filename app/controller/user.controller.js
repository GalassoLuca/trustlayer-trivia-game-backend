import * as db from './db'
import UserNotFound from '../error/UserNotFound'

export async function deleteUser(request, reply) {
  const username = request.body

  const user = await db.Users.findOne({ username })

  if (!user) {
    throw new UserNotFound()
  }

  await db.Users.deleteOne({ _id: user._id })

  return { message: 'User deleted' }
}
