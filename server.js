var express = require('express');
var bodyParser = require('body-parser');
var router = require('./routes/index');

var app = express();

app.use(bodyParser());
app.use(bodyParser.urlencoded({extended:false}));
app.use('/vxnode', router);

app.listen(9999);                   // startup our app at http://localhost:8080
console.log("mysql start at port 9999");