const express = require('express')
const User = require('../medels/User')
const bcrypt = require('bcrypt')
const createJWT = require('../util/createJwt')
const wrapFunction = require('../util/wrapFunction')
const catchAsync = require('../util/catchAsync')
const ApiError = require('../util/ApiError')

const router = express.Router()

router.get('/api/test', async (req, res, next) => {
  console.log(res.session)
  res.json({
    message: 'success',
  })
})

router.post(
  '/api/auth/signin',
  catchAsync(async (req, res, next) => {
    console.log(req.body)
    const { email, password } = req.body

    if (!email || !password) {
      throw new ApiError('Request is invalid', 400)
    }

    const { data: user, error } = await wrapFunction(
      User.findOne({ email }).select('+password -__v')
    )

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return next(new ApiError('User not found or password is wrong', 400))
    }

    const token = createJWT(user.id, user.email)

    res.cookie('jwt', token, {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    })

    res.status(201).json({
      token,
      user: user.firstName,
    })
  })
)

module.exports = router
