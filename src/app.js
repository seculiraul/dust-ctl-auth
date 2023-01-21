const { json } = require('express');
const express = require('express');
const cookieSession = require('cookie-session');
const signUpRouter = require('./routes/signUp');
const signInRouter = require('./routes/signIn');
const signoutRouter = require('./routes/signOut');

const app = express();

app.set('trust proxy');
app.use(json());
app.use(cookieSession({
    signed: false,
    secure: false
}));


app.use(signUpRouter);
app.use(signInRouter);
app.use(signoutRouter);

module.exports = app;