var sequelize = require('sequelize');

var db = new sequelize('database', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

//define user models
var User = db.define('User', {
  name: sequelize.STRING
}, {
    tableName: 'users'
});

//set up user to user relation as friends
User.hasMany(User, { as: 'Friend' });

//create tables if there are none
User.sync();

exports.User = User;
exports.db = db;