const { json } = require('express');
const express = require('express');

const app = express();

app.set('trust proxy');
app.use(json());


app.get('/api/auth/start', (req, res, next) => {
    res.json({
        hello: 'world'
    })
})

module.exports = app;