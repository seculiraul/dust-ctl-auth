const { json } = require('express');
const express = require('express');
const signUpRouter = require('./routes/signUp');
const signInRouter = require('./routes/signIn');

const app = express();

app.set('trust proxy');
app.use(json());


app.use(signUpRouter);
app.use(signInRouter);

module.exports = app;