const express = require("express")

const router = express.Router()

router.post("/api/auth/signout", (req, res, next) => {
  req.session = null

  res.status(201).json({
    message: "success",
  })
})

module.exports = router
