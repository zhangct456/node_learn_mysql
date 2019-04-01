var express = require('express');
var router = express.Router();
var login = require('../dao/login');

router.post('/', function(req, res) {
	res.send('respond with a resource');
});
router.post('/userLogin', function(req, res, next) {
	login.userLogin(req, res, next);
});
router.post('/managerLogin', function(req, res, next) {
	login.managerLogin(req, res, next);
});
module.exports = router;