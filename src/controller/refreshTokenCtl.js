const User = require('../medels/User')
const ApiError = require('../util/ApiError')
const catchAsync = require('../util/catchAsync')
const createJwt = require('../util/createJwt')
const wrapFunction = require('../util/wrapFunction')
const jwt = require('jsonwebtoken')

module.exports = catchAsync(async (req, res, next) => {
  const { jwt: refreshToken } = req.cookies

  if (!refreshToken) return res.sendStatus(401)
  console.log(refreshToken)

  const user = await User.findOne({ refreshToken })

  if (!user) return res.sendStatus(403)

  jwt.verify(refreshToken, process.env.REFRESH_SECRET, (err, decoded) => {
    if (err || user.email !== decoded.email) return res.sendStatus(403)
    const accessToken = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '10h' }
    )
    console.log(accessToken)
    res.json({ accessToken })
  })
})
