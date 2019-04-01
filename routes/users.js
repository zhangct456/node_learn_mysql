var express = require('express');
var router = express.Router();
var userDao = require('../dao/userDao');

router.post('/', function(req, res) {
  res.send('respond with a resource');
});
router.post('/addUser', function(req, res, next) {
  userDao.add(req, res, next);
});
router.post('/deleteUser', function(req, res, next){
	userDao.delete(req, res, next);
});
router.post('/updateUser', function(req, res, next){
	userDao.update(req, res, next);
});
router.post('/queryUser', function(req, res, next){
	userDao.query(req, res, next);
});
router.post('/Upload', function(req, res, next){
	console.log(req.body);
  console.log(req.files);
});
module.exports = router;