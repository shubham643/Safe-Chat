var express = require('express');
var router = express.Router();
var auth = require('controllers/login');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({'hey':'bye'});
  //res.send("tt");
});

/*
 * Routes that can be accessed by any one
 */
router.use('/login', auth.login_user);


module.exports = router;
