const catchAsync = require('../util/catchAsync')
const jwt = require('jsonwebtoken')

module.exports = catchAsync(async (req, res, next) => {
  const cookies = req.cookies
  console.log(cookies)
  if (!jwt) {
    return next(new ApiError('User is not logged in', 403))
  }
  const payload = await jwt.verify(cookies.jwt, process.env.JWT_SECRET)
  req.payload = payload
  console.log(payload)
  next()
})
