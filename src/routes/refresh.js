const express = require('express')
const refreshTokenCtl = require('../controller/refreshTokenCtl')

const router = express.Router()

router.get('/api/auth/refresh', refreshTokenCtl)

module.exports = router
