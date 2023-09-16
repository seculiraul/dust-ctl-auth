const express = require('express')
const { model } = require('mongoose')
const User = require('../medels/User')
const ApiError = require('../util/ApiError')
const catchAsync = require('../util/catchAsync')
const wrapFunction = require('../util/wrapFunction')

const router = express.Router()

router.post(
  '/api/auth/signup',
  catchAsync(async (req, res, next) => {
    const { email, password, passwordConfirmed, firstName, lastName, address } =
      req.body

    const { data: user, error } = wrapFunction(
      await User.create({
        email,
        password,
        passwordConfirmed,
        firstName,
        lastName,
        address,
      })
    )

    if (error) {
      return next(new ApiError('Error creating the user'))
    }

    res.status(201).json({
      message: 'success',
    })
  })
)

module.exports = router
