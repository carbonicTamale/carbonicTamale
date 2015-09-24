var express = require('express');
var path = require('path');
var config = require('../config');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if (/* User is not signed in */ true) {
    res.sendfile(path.join(config.public, 'index.html'));
  }
  else /* User is signed in */ {
    res.sendfile(path.join(config.public, 'dashboard.html'));
  }
});

module.exports = router;
