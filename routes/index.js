var express = require('express');
var router = express.Router();
var auth = require('controllers/login');
var register = require('controllers/register');
//var controllers = require('helpers/controllerRegistry');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({'hey':'bye'});
  //res.send("tt");
});

/*
 * Routes that can be accessed by any one
 */
router.use('/login', auth.loginUser);
router.use('/register', register.registerUser);

module.exports = router;
