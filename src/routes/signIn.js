const express = require('express')
const User = require('../medels/User')
const bcrypt = require('bcrypt')
const createJWT = require('../util/createJwt')

const router = express.Router()

router.get('/api/test', async (req, res, next) => {
  console.log(res.session)
  res.json({
    message: 'success',
  })
})

router.post('/api/auth/signin', async (req, res, next) => {
  try {
    console.log(req.body)
    const { email, password } = req.body

    if (!email || !password) {
      throw new Error('invalid request')
    }

    const user = await User.findOne({ email }).select('+password -__v')

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error('invalid')
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
  } catch (err) {
    console.log(err)
  }
})

module.exports = router
