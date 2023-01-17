const { json } = require('express');
const express = require('express');
const authRouter = require('./routes/signUp');

const app = express();

app.set('trust proxy');
app.use(json());


app.use(authRouter);

module.exports = app;