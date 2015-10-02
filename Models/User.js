var db = require('../config/db-config');
var Friend = require('./Friend');

//Here, the User Model is defined and the many-to-many relationship is established for friendships in the app.
var User = db.Model.extend({
  tableName: 'users',
  friends: function () {
    //In addition to creating the many-to-many relationship, we specify the join table as 'friends',
    //and also specify the appropriate keys to use.
    return this.belongsToMany(User, 'friends', 'user_id', 'friend_id');
  }
});

module.exports = User;