const { json } = require('express')
const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const signUpRouter = require('./routes/signUp')
const signInRouter = require('./routes/signIn')
const signoutRouter = require('./routes/signOut')
const credentials = require('./middleware/credentals')
const allowedOrigins = require('./allowedOrigins')
const errorMiddleware = require('./middleware/errorMiddleware')
const userDetails = require('./routes/user-details')
const refreshRoute = require('./routes/refresh')

const app = express()

app.set('trust proxy')
app.use(cookieParser())
app.use(credentials)
app.use(
  cors({
    origin: (origin, callback) => {
      if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
        callback(null, true)
      } else {
        callback(new Error('Not Allowed By CORS'))
      }
    },
    optionsSuccessStatus: 200,
  })
)
app.use(json())
app.use(signUpRouter)
app.use(signInRouter)
app.use(signoutRouter)
app.use(refreshRoute)
app.use(userDetails)
app.use(errorMiddleware)

module.exports = app
