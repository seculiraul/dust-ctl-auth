const exprexx = require('express')
const jwt = require('jsonwebtoken')
const router = exprexx.Router()

router.post('/api/v1/auth/validation', async (req, res, next) => {
  try {
    const payload = await jwt.verify(req.body.jwt, process.env.JWT_SECRET)
    res.json({
      message: 'success',
      data: true,
    })
  } catch (err) {
    console.log(err)
  }
})
