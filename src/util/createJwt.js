const jwt = require('jsonwebtoken');
module.exports = (id, email) => {
    return jwt.sign({ id, email} , process.env.JWT_SECRET)
}