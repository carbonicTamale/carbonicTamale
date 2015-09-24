var db = require('../db-config');

var User = db.Model.extend({
  tableName: 'users',
  friends: function() {
    return this.hasMany(Users);
  },
  initialize: function() {
    
  }
});


