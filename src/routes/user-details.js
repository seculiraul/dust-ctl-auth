const express = require('express')
const getUserDetails = require('../controller/getUserDetails')
const updateUserDetails = require('../controller/updateUserDetails')
const getLoggedInUser = require('../middleware/getLoggedInUser')
const verifyJWT = require('../middleware/verifyJWT')
const router = express.Router()

router
  .route('/api/auth/details')
  .get(verifyJWT, getUserDetails)
  .patch(verifyJWT, updateUserDetails)

module.exports = router
