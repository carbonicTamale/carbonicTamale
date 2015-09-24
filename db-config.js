var Sequelize = require('sequelize');

var sequelize = new Sequelize('database', 'root', '', {
  host: 'localhost',
  dialect: 'sqlite',
  storage: './db/database.sqlite'
});

//define user models
var User = sequelize.define('User', {
  name: Sequelize.STRING
}, {
    tableName: 'users'
});

//set up user to user relation as friends
User.hasMany(User, { as: 'Friend' });

//create tables if there are none
User.sync();

exports.User = User;