import * as db from './db'
import UserNotFound from '../error/UserNotFound'
import UsernameDuplicate from '../error/UsernameDuplicate'
import InvalidPassword from '../error/InvalidPassword'
import jwt from 'jsonwebtoken'
import { generateHash, compareHash } from './util/password'
import config from '../config/auth.config'

export async function signup({ body: { username, password } }, reply) {
  if (await db.Users.findOne({ username })) {
    throw new UsernameDuplicate()
  }

  await db.Users.insertOne({
    username,
    password: generateHash(password)
  })

  return { message: 'User registered successfully!' }
}

export async function signin({ body: { username, password } }, reply) {
  const user = await db.Users.findOne({ username })

  if (!user) {
    throw new UserNotFound()
  }

  if (!compareHash(password, user.password)) {
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
