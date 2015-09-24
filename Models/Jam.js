var db = require('../db-config');

var Jam = db.Model.extend({
  tableName: 'jams',
  user: function() {
    return this.hasMany(User);
  }
});

module.exports = Jam;