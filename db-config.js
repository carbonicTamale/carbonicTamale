var path = require('path');
var knex = require('knex')({
  client: 'sqlite3',
  connection: {
    host: '127.0.0.1',
    user: 'your_database_user',
    password: 'password',
    database: 'instajam',
    charset: 'utf8',
    filename: path.join(__dirname, 'db/instajam.sqlite')
  }
});

var db = require('bookshelf')(knex);



db.knex.schema.hasTable('users').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('users', function (user) {
      user.increments('id').primary();
      user.string('name', 255);
      user.string('email', 255);
      user.timestamps();
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

db.knex.schema.hasTable('jams').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('jams', function (jam) {
      jam.increments('id').primary();
      jam.integer('user_id');
      jam.integer('jam_id');
      jam.timestamps();
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});


module.exports = db;
