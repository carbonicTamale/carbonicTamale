var db = require('../config/db-config');

var User = db.Model.extend({
  tableName: 'users',
  friends: function() {
    return this.belongsToMany(User);
  }
});

module.exports = User;