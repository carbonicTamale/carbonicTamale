var socketio = require('socket.io');

module.exports = function(server, sessionMiddleware) {

  var openSockets = {};
  var jams = {
    test: { id: 'http://google.com', username: 'mdboop' }
  };

  var io = socketio.listen(server);

  io.use(function (socket, next) {
    sessionMiddleware(socket.request, socket.request.res, next);
  });

  io.sockets.on('connection', function (socket) {
    var session = socket.request.session;
    if (session.passport === undefined) {
      return;
    }
    var user = session.passport.user.username;
    openSockets[user] = socket.id;
    console.log('A user has connected');

    server.on('error', console.log.bind('error'));
    server.on('listening', console.log.bind('listening'));
    socket.on('invitation', function (invitee, id) {
      if(openSockets[invitee]) {
        var invitation = {
          id: id,
          username: user
        };
        //send invitation to user at that socketID
        //send jamID and inviter username
        socket.broadcast.to(openSockets[invitee])
        .emit('come jam!', invitation);
      }
    });
    socket.on('get-online-friends', function (friends) { 
      console.log(friends);
      var onlineFriends = [];
      for(var i = 0; i < friends.length; i++) {
        var friend = friends[i].username;
        if(openSockets[friend]) {
          onlineFriends.push(friend);
        }
      }
      socket.emit('send-online-friends', onlineFriends);
    });

  });

  return io;

};
