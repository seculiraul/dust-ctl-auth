const express = require('express');
const User = require('../medels/User');
const bcrypt = require('bcrypt');
const createJWT = require('../util/createJwt');


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

        const token = createJWT(user.id, user.email);

        req.session = {
            jwt: token
        }

        res.status(201).json({
            message: 'success',
            data: { token }
        })
} catch(err) {
    console.log(err)
}
})

module.exports = router;