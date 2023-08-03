const exprexx = require('express')
const jwt = require('jsonwebtoken')
const catchAsync = require('../util/catchAsync')
const router = exprexx.Router()

router.post(
  '/api/v1/auth/validation',
  catchAsync(async (req, res, next) => {
    await jwt.verify(req.body.jwt, process.env.JWT_SECRET)
    res.json({
      message: 'success',
      data: true,
    })
  })
)
