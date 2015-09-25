var db = require('../config/db-config');
var User = require('../Models/User');

var Users = new db.Collection();

Users.model = User;

module.exports = Users;


