const express = require('express');
const User = require('../medels/User');
const bcrypt = require('bcrypt');

const router = express.Router();

router.post('/api/auth/signin', async(req, res, next) => {

    try { 
        const { email, password } = req.body;

        if(!email || !password) {
            throw new Error('invalid request')
        }

        const user = await User.findOne({email}).select('+password -__v')

        if(!user || !(await bcrypt.compare(password, user.password))) {
            throw new Error('invalid')
        }

        res.status(201).json({
            message: 'success',
            data: { user }
        })
} catch(err) {
    console.log(err)
}
})

module.exports = router;