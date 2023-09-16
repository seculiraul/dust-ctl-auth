const User = require('../medels/User')
const catchAsync = require('../util/catchAsync')

module.exports = catchAsync(async (req, res, next) => {
  console.log(req.cookies)
  const { jwt: refreshToken } = req.cookies

  if (!refreshToken) return res.sendStatus(204)

  const user = await User.findOne({ refreshToken })

  if (!user) {
    res.clearCookie('jwt', {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    })
    return res.sendStatus(204)
  }

  await User.findOneAndUpdate(
    { email: user.email },
    { refreshToken: '' },
    { runValidators: false }
  )

  res.clearCookie('jwt', {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
  })
  res.sendStatus(204)
})
