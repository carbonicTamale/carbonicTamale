var path = require('path');

//connect to database
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

//initialize ORM with knex 
var db = require('bookshelf')(knex);

//define users table schema
db.knex.schema.hasTable('users').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('users', function (user) {
      user.increments('id').primary();
      user.string('name', 255);
      user.string('email', 255);
      user.timestamps();
    }).then(function (table) {
      console.log('Created Users Table', table);
    });
  }
});

//define jams table schema
db.knex.schema.hasTable('jams').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('jams', function (jam) {
      jam.increments('id').primary();
      jam.integer('user_id').references('user.id');
      jam.integer('jam_id');
      jam.timestamps();
    }).then(function (table) {
      console.log('Created Jams Table', table);
    });
  }
});

db.knex.schema.hasTable('friends').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('friends', function (friend) {
      friend.increments('id').primary();
      friend.integer('userOne_id').references('user.id');
      friend.integer('userTwo_id').references('user.id');
    }).then(function (table) {
      console.log('Created Friends Table', table);
    });
  }
});


module.exports = db;
