const express = require('express')
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
