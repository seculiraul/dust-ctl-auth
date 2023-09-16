const express = require('express')
const signOutCtl = require('../controller/signOutCtl')

const router = express.Router()

router.get('/api/auth/signout', signOutCtl)

module.exports = router
