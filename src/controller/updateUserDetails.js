const User = require('../medels/User')
const catchAsync = require('../util/catchAsync')

module.exports = catchAsync(async (req, res, next) => {
  const updatedUser = await User.findOneAndUpdate(
    { email: req.payload.email },
    req.body
  )
  res.status(203).json({
    message: 'success',
  })
})
