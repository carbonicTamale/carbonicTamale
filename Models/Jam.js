var db = require('../db-config');

var Jam = db.Model.extend({
  tableName: 'jams'
});

module.exports = Jam;