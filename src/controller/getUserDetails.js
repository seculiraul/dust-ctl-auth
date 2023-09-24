const ApiError = require('../util/ApiError')
const catchAsync = require('../util/catchAsync')
const jwt = require('jsonwebtoken')
const User = require('../medels/User')

module.exports = catchAsync(async (req, res, next) => {
  const { firstName, lastName, address, city, region, email, phone } =
    await User.findOne({ email: req?.user?.email })

  res.status(200).json({
    message: 'success',
    data: { firstName, lastName, address, city, region, email, phone },
  })
})
