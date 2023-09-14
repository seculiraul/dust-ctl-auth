const jwt = require('jsonwebtoken')
module.exports = (id, email) => {
  return {
    token: jwt.sign({ id, email }, process.env.JWT_SECRET, {
      expiresIn: '10h',
    }),
    refresh: jwt.sign({ id, email }, process.env.REFRESH_SECRET, {
      expiresIn: '10d',
    }),
  }
}
