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
    var jam = null;
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

    socket.on('disconnect', function() {
      delete openSockets[user];
      jamDisconnect();
    });

    socket.on('jam disconnect', jamDisconnect);

    function jamDisconnect() {
      var sockets = [];
      for (var i = 0; i < jams[jam].length; i++) {
        if (jams[jam][i] === user) {
          jams[jam].splice(i, 1);
          i--;
        }
        sockets.push(openSockets[jams[jam][i]]);
      }
      socket.broadcast.to(sockets)
      .emit('user disconnected', user);
    }

    socket.on('jam connect', function(jamID) {
      jam = jamID;
      jams[jam].push(user);
    });

    socket.on('jam create', function() {
      jam = Math.floor(Math.random()*10000);
      jams.jamID = [user];
      socket.emit('jam created', jam);
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
