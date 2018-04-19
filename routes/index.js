var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({'hey':'bye'});
  //res.send("tt");
});

module.exports = router;
