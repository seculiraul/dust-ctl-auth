const express = require("express")
const { model } = require("mongoose")
const User = require("../medels/User")
const createJWT = require("../util/createJwt")

const router = express.Router()

router.post("/api/auth/signup", async (req, res, next) => {
  const { email, password, passwordConfirmed, firstName, lastName, address } =
    req.body

  const user = await User.create({
    email,
    password,
    passwordConfirmed,
    firstName,
    lastName,
    address,
  })

  const token = createJWT(user.id, user.email)

  req.session = {
    jwt: token,
  }
  res.status(201).json({
    message: "success",
    data: { token },
  })
})

module.exports = router
