var db = require('../db-config');

var Jam = db.Model.extend({
  tableName: 'jams',
  musicians: function() {
    return this.hasMany(User);
  }
});

module.exports = Jam;