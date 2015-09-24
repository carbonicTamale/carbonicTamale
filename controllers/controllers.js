var db = require('../db-config');


exports.addFriend = function (username, friend) {
  return db.User.findOne({where: { username: username }})
  .then(function(user) {
    //create relationship between users
    return user;
  });
};

exports.addUser = function (username) {
  return db.User.findOrCreate({where: {username: username}})
  .then(function(user) {
    return user;
  });
};
