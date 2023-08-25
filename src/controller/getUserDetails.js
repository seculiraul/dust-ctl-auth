const ApiError = require('../util/ApiError')
const catchAsync = require('../util/catchAsync')
const jwt = require('jsonwebtoken')
const User = require('../medels/User')

module.exports = catchAsync(async (req, res, next) => {
  const cookies = req.cookies
  console.log(req.cookies)

  if (!jwt) {
    return next(new ApiError('User is not logged in', 403))
  }
  const payload = await jwt.verify(cookies.jwt, process.env.JWT_SECRET)

  const { firstName, lastName, address, city, region, email, phone } =
    await User.findOne({ email: payload?.email })

  res.status(200).json({
    message: 'success',
    data: { firstName, lastName, address, city, region, email, phone },
  })
})
