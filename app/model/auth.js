import * as db from './db'
import UserNotFound from '../error/UserNotFound'
import UsernameDuplicate from '../error/UsernameDuplicate'
import InvalidPassword from '../error/InvalidPassword'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import config from '../settings/auth.config'

export async function signup({ username, password }) {
  if (await db.Users.findOne({ username })) {
    throw new UsernameDuplicate()
  }

  await db.Users.insertOne({
    username,
    password: bcrypt.hashSync(password, 8)
  })

  return { message: 'User registered successfully!' }
}

export async function signin({ username, password }) {
  const user = await db.Users.findOne({ username })

  if (!user) {
    throw new UserNotFound()
  }

  const pwdIsValid = bcrypt.compareSync(password, user.password)

  if (!pwdIsValid) {
    throw new InvalidPassword()
  }

  const token = jwt.sign({ id: user._id }, config.secret, {
    expiresIn: config.expiresIn
  })

  return {
    username: user.username,
    accessToken: token
  }
}
