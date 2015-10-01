var db = require('../config/db-config');
var Friend = require('../Models/Friend');

var Friends = new db.Collection();

Friends.model = Friend;

module.exports = Friends;