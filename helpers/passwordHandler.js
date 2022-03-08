const bcrypt = require('bcrypt')
const salt = process.env.SALT || 10

//Hashing Password
const hashPassword = (password) => {
  return bcrypt.hashSync(password, parseInt(salt))
}

//Verifying Hash Password
const verifyPassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword)
}

module.exports = {
  hashPassword,
  verifyPassword
}