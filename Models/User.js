var db = require('../db-config');

var User = db.Model.extend({
  tableName: 'users',
  friends: function() {
    return this.belongsToMany(User);
  },
  initialize: function() {

  }
});

module.exports = User;