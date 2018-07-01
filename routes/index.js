var express = require('express');
var router = express.Router();
var auth = require('controllers/login');
var register = require('controllers/register');
var encryptData = require('controllers/encryptData');
var createKey = require('controllers/createKey');
var decryptData = require('controllers/decryptData');
var requestKeyAccess = require('controllers/requestKeyAccess');
var constants = require('helpers/constants');

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
// validateRequest middleware is not required for login as there is no token till now.
router.use('/login', auth.loginUser);

// For registering a new user.
router.use(constants.BASE_PATH + '/register', register.registerUser);

// For creating a new key.
router.use(constants.BASE_PATH + '/createKey', createKey.create);

// For encrypting data.
router.use(constants.BASE_PATH + '/encrypt', encryptData.encrypt);

// For decrypting the data.
router.use(constants.BASE_PATH + '/decrypt', decryptData.decrypt);

// For requesting access to key.
router.use(constants.BASE_PATH + '/requestKeyAccess', requestKeyAccess.requestAccess);

module.exports = router;
