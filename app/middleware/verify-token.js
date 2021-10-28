import jwt from 'jsonwebtoken'
import authSettings from '../config/auth.config'
import MissingToken from '../error/MissingToken'
import Unauthorized from '../error/Unauthorized'

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

  request.userId = decoded.id
  next()
}
