var socketio = require('socket.io');

module.exports = function(server, sessionMiddleware) {

  var io = socketio.listen(server);

  io.use(function (socket, next) {
    sessionMiddleware(socket.request, socket.request.res, next);
  });

  io.sockets.on('connection', function (socket) {
    var session = socket.request.session;
    console.log('A user has connected');

  server.on('error', console.log.bind('error'));
  server.on('listening', console.log.bind('listening'));

  });

  return io;

};