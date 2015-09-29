var db = require('../config/db-config');
var Friend = require('./Friend');

var User = db.Model.extend({
  tableName: 'users',
  friends: function () {
    return this.belongsToMany(User, 'friends');
  }
});

module.exports = User;