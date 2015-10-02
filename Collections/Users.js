var db = require('../config/db-config');
var User = require('../Models/User');

//The Users Collection allows us to pull multiple users' records from the database in a single query.
//Currently, no methods are needed for this collection.
var Users = new db.Collection();

Users.model = User;

module.exports = Users;


