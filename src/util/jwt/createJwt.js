const jwt = require('jsonwebtoken')

module.exports = (data, tokenNames) => {
  const token = tokenNames.includes('token')
    ? jwt.sign(data, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_SECRET_EXPIRATION,
      })
    : undefined

  const refresh = tokenNames.includes('refresh')
    ? jwt.sign(data, process.env.REFRESH_SECRET, {
        expiresIn: process.env.REFRESH_SECRET_EXPIRATION,
      })
    : undefined

  return { token, refresh }
}
