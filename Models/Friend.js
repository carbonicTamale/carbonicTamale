var db = require('../config/db-config');

var Friend = db.Model.extend({
  tableName: 'friends',
  user: function () {
    return this.belongsTo(User);
  },
  friend: function () {
    return this.belongsTo(User, 'friend_id');
  }
});

module.exports = Friend;