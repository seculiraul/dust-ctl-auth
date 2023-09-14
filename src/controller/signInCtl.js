const bcrypt = require('bcrypt')
const User = require('../medels/User')
const ApiError = require('../util/ApiError')
const catchAsync = require('../util/catchAsync')
const createJwt = require('../util/createJwt')
const wrapFunction = require('../util/wrapFunction')

module.exports = catchAsync(async (req, res, next) => {
  console.log(req.body)
  const { email, password } = req.body

  if (!email || !password) {
    throw new ApiError('Request is invalid', 400)
  }

  const { data: user, error } = await wrapFunction(
    User.findOne({ email }).select('+password -__v')
  )

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return next(new ApiError('User not found or password is wrong', 401))
  }

  const { token, refresh } = createJwt(user.id, user.email)

  res.cookie('jwt', refresh, {
    httpOnly: true,
    sameSite: 'none',
    secure: true,
    maxAge: 5 * 24 * 60 * 60 * 1000,
  })

  res.status(201).json({
    token,
    user: user.firstName,
  })
})
