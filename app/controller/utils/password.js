import bcrypt from 'bcryptjs'

export function generateHash(password) {
  return bcrypt.hashSync(password, 8)
}

export function compareHash(password, hash) {
  return bcrypt.compareSync(password, hash)
}
