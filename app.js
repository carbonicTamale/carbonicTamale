var express = require('express');
var http = require('http');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var session = require('express-session');
var db = require('./config/db-config');
var compress = require('compression');



var routes = require('./routes/index');
// var api = require('./routes/api');

var app = express();

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(compress());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
var sessionMiddleware = session({
  secret: 'secret',
  saveUninitialized: false,
  resave: false
});

app.set('views', path.join(__dirname, 'public'));
app.set('view engine', 'ejs');

app.use(sessionMiddleware);

require('./routes/auth')(app);

app.use('/', routes);
// app.use('/api', api);

app.use('/', express.static(path.join(__dirname, 'public')));

var errorHandler = require('./error-handler')(app);
app.use(errorHandler);


// Get port from environment and store in Express.
var port = process.env.PORT || '3000';
app.set('port', port);

//Create HTTP server.
var server = http.createServer(app);
var io = require('./sockets')(server, sessionMiddleware);


//Listen on provided port, on all network interfaces.
server.listen(port);

module.exports = app;