var express = require('express');
var app = express();
var users = require('./users');
var loginRoute = require('./login');

app.use(loginRoute);
app.use(users);
module.exports = app;