const express = require('express')
const getUserDetails = require('../controller/getUserDetails')
const router = express.Router()

router.route('/api/auth/details').get(getUserDetails)

module.exports = router
