const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'You must provide an email'],
    unique: [true, 'this email already exists'],
  },
  firstName: {
    type: String,
    required: [true, 'You must provide a first name'],
  },
  lastName: {
    type: String,
    required: [true, 'You must provide a last name'],
  },
  password: {
    type: String,
    required: [true, 'You must provide a password'],
    min: [6, 'The minimum length of the password is 6'],
    select: false,
  },
  refreshToken: String,
  passwordConfirmed: {
    type: String,
    required: true,
    validate: {
      // ONLY WORKS WITH CREATE/SAVE
      validator: function (el) {
        return el === this.password
      },
    },
  },
  address: String,
  city: String,
  region: String,
  country: String,
  phone: String,
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetTokenExpires: Date,
  role: {
    type: [String],
    enum: ['admin', 'manager', 'employee', 'user'],
    default: ['user'],
  },
})

userSchema.pre('save', async function (next) {
  if (!this.isModified('password') || this.isNew) {
    return next()
  }
  this.passwordChangedAt = Date.now() - 1000
  next()
})

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next()
  }
  this.password = await bcrypt.hash(this.password, 12)
  this.passwordConfirmed = undefined
  next()
})

userSchema.methods.isPasswordCorrect = async function (
  candidatePassword,
  currentPassword
) {
  return await bcrypt.compare(candidatePassword, currentPassword)
}

module.exports = mongoose.model('User', userSchema)
