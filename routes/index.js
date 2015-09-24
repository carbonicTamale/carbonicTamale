var express = require('express');
var path = require('path');
var config = require('../config');
var apiRouter = require('./api.js');
var auth = require('./auth');

var router = express.Router();

/* GET home page. */
router.get('/', auth, function(req, res, next) {
  res.sendfile(path.join(config.public, 'index.html'));
});

router.get('/api', apiRouter);

module.exports = router;
