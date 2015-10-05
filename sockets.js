var socketio = require('socket.io');

module.exports = function(server, sessionMiddleware) {

  var openSockets = {};
  var jams = {
    '101': [
        {
          name: 'Chris',
          instrument: 'piano',
          volume: 0.7
        },
        {
          name: 'Blaine',
          instrument: 'drums',
          volume: 0.45
        }
      ]
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
    var user = session.passport.user;
    console.log('user =', user);
    var name = user.name;
    console.log('name =', name);
    var username = user.username;
    var email = user.email;

    var player = {
      name: name,
      username: username,
      instrument: 'piano',
      volume: 0.5
    };

    var currentJam = null;
    openSockets[username] = socket.id;
    console.log('openSockets =', openSockets);
    console.log('A user has connected');
    socket.emit('friend online');

    server.on('error', console.log.bind('error'));
    server.on('listening', console.log.bind('listening'));

    socket.on('disconnect', disconnect);
    socket.on('send jam invite', sendJamInvite);
    socket.on('jam disconnect', jamDisconnect);
    socket.on('jam connect', jamConnect);
    socket.on('jam create', jamCreate);
    socket.on('change instrument', changeInstrument);
    socket.on('get online friends', getFriends);

    function disconnect() {
      delete openSockets[username];
      // jamDisconnect();
    }

    function sendJamInvite(invitee, roomName) {
      console.log('openSockets[invitee] = ', openSockets[invitee]);
      if(openSockets[invitee]) {
        var invitation = {
          name: name,
          roomName: roomName
        };
        socket.broadcast.to(openSockets[invitee])
        .emit('receive jam invite', invitation);
      }
    }

    function jamCreate(jamID) {
      console.log('jam created at', jamID);
      currentJam = jamID;
      jams[currentJam] = [player];

      updateJamRoom();
    }

    function jamConnect(jamID) {
      console.log('jam connected at', jamID);
      currentJam = jamID;
      jams[currentJam].push(player);

      updateJamRoom();
    }

    function jamDisconnect() {
      for (var i=0; i < jams[currentJam].length; i++) {
        if (jams[currentJam][i].name === name) {
          jams[currentJam].splice(i, 1);
          break;
        }
      }

      updateJamRoom();
    }


    function changeInstrument(newInstrument) {
      player.instrument = newInstrument;

      for (var i=0; i<jams[currentJam].length; i++) {
        if (jams[currentJam][i].name === name) {
          jams[currentJam][i].instrument = newInstrument;
          break;
        }
      }

      updateJamRoom();
    }

    function getFriends(friends) {
      var onlineFriends = {};
      for(var i = 0; i < friends.length; i++) {
        var friend = friends[i].username;
        onlineFriends[friend] = (!!openSockets[friend]);
      }

      socket.emit('send online friends', onlineFriends);
    }

    // tell everyone to update their display
    function updateJamRoom() {
      var players = [];
      console.log('jams[currentJam] =', jams[currentJam]);

      for (var i=0; i<jams[currentJam].length; i++) {
        players.push(jams[currentJam][i]);
      }

      var sockets = players.map(function(p) {
        return openSockets[p.username];
      });

      console.log('sockets =', sockets);
      socket.broadcast.to(sockets)
      .emit('update room', jams[currentJam]);
    }

  });

  return io;

};
