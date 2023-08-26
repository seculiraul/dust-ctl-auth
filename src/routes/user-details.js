const express = require('express')
const getUserDetails = require('../controller/getUserDetails')
const updateUserDetails = require('../controller/updateUserDetails')
const getLoggedInUser = require('../middleware/getLoggedInUser')
const router = express.Router()

router
  .route('/api/auth/details')
  .get(getLoggedInUser, getUserDetails)
  .patch(getLoggedInUser, updateUserDetails)

module.exports = router
