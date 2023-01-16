const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'You must provide an email']
    },
    firstName: {
        type: String,
        required: [true, 'You must provide a first name']
    },
    lastName: {
        type: String,
        required: [true, 'You must provide a last name']
    },
    password: {
        type: String,
        required: [true, 'You must provide a password'],
        min: [6, 'The minimum length of the password is 6']
    },
    role: {
        type: String,
        enum: ['admin', 'manager', 'employee', 'user'],
        default: 'user'
    }
})


module.exports = mongoose.model('User', userSchema);