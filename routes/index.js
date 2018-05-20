var express = require('express');
var router = express.Router();
var auth = require('controllers/login');
var register = require('controllers/register');
var encryptData = require('controllers/encryptData');

// @TODO: add the middleware for validating the token.
//var controllers = require('helpers/controllerRegistry');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({'hey':'bye'});
});

/*
 * Routes that can be accessed by any one
 */

 // For login of the username
router.use('/login', auth.loginUser);

// For registering a new user.
router.use('/register', register.registerUser);

// For encrypting data.
router.use('/encrypt', encryptData.encrypt);

module.exports = router;
