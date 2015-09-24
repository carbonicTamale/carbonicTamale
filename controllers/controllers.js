var db = require('./db-config');

module.exports = {
  users: {
    post: function(req, res) {
      db.User.findOrCreate({ where:{ username: req.body.username }})
      .then(function(user) {
        console.log(user);
      });
    },
    get: function(req, res) {
      db.User.findOne({where:{username: req.body.username }})
      .then(function(user) {
        console.log(user);
      });
    }
  }
};

