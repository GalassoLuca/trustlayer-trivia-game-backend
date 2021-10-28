import jwt from 'jsonwebtoken'
import * as db from '../controller/db'
import authSettings from '../config/auth.config'
import MissingToken from '../error/MissingToken'
import Unauthorized from '../error/Unauthorized'
import UserNotFound from '../error/UserNotFound'

export default async function verifyToken(request, reply, next) {
  const token = request.headers['x-access-token']

  if (!token) {
    throw new MissingToken()
  }

  let decoded
  try {
    decoded = jwt.verify(token, authSettings.secret)
  } catch (err) {
    throw new Unauthorized()
  }

  const user = await db.Users.findOne({ _id: db.ObjectId(decoded.id) })

  if (!user) {
    throw new UserNotFound()
  }

  request.user = user

  next()
}
