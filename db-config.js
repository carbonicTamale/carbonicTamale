var sequelize = require('sequelize');

var db = new Sequelize('database', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

//define user models
var User = sequelize.define('User', {
  name: sequelize.STRING,
  password: sequelize.STRING
}, {
    tableName: 'users'
});

//set up user to user relation as friends
User.hasMany(User, { as: 'Friend' });

//define instrument model
var Instrument = sequelie.define('Instrument', {
  name: sequelize.STRING,
  midi: sequelize.TEXT
});

//create tables if there are none
User.sync();
Instrument.sync();

exports.User = User;
exports.Instrument = Instrument;