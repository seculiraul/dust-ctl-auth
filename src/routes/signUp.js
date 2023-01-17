const express = require('express');
const { model } = require('mongoose');
const User = require('../medels/User');

const router = express.Router();

router.post('/api/auth/signup', async (req, res, next) => {
    
    const {email, password, passwordConfirmed, firstName, lastName } = req.body;

    const user = await User.create(req.body);

    res.status(201).json({
        message: 'success',
        data: {
            user
        }
    })
})

module.exports = router;