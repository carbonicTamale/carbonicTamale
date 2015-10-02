var db = require('../config/db-config');
var Friend = require('../Models/Friend');

//The Friends Collection will allow us to pull up multiple records with a single query.
//Currently, this is not utilized, but is available for any new features which need to work
//on multiple entires in the friends table.
var Friends = new db.Collection();

Friends.model = Friend;

module.exports = Friends;