const express = require('express')
const User = require('../medels/User')
const bcrypt = require('bcrypt')
const createJWT = require('../util/createJwt')
const wrapFunction = require('../util/wrapFunction')
const catchAsync = require('../util/catchAsync')
const ApiError = require('../util/ApiError')
const signInCtl = require('../controller/signInCtl')
const verifyJWT = require('../middleware/verifyJWT')

const router = express.Router()

router.get('/api/test', verifyJWT, async (req, res, next) => {
  console.log(res.session)
  res.json({
    message: 'success',
  })
})

router.post('/api/auth/signin', signInCtl)

module.exports = router
