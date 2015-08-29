var express     = require('express');
var app         = express();
var port        = 3000;
var server      = require('http').Server(app);
var io          = require('socket.io')(server);
var mongoose    = require('mongoose');
var passport    = require('passport');
var flash       = require('connect-flash');
var _           = require('underscore');

var morgan        = require('morgan');
var cookieParser  = require('cookie-parser');
var bodyParser    = require('body-parser');
var session       = require('express-session');

// Include database config
var configDB  = require('./config/database.js');
// Include the board object
var board     = require('./app/services/game.js').Board();

// configuration ===============================================================
mongoose.connect(configDB.url); // connect to our database

require('./config/passport')(passport); // pass passport for configuration

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms

app.set('view engine', 'ejs'); // set up ejs for templating
app.use(express.static('public'));

// required for passport
app.use(session({ secret: 'dominojs' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in 

// routes ======================================================================
require('./app/routes.js')(app, passport, board); // load our routes and pass in our app and fully configured passport

// Move Code
var games = require('./routes/games');

io.on('connection', function(socket){
  socket.on('fetchUsers', function(){
    io.emit('fetchUsers', {users: board.users});
  });

  socket.on('fetchBoard', function(data){
    io.emit('fetchBoard', {board: board.boardCards});
  });
  socket.on('sendBoard', function(data){
    board.boardCards = data.board;
    console.log(data);
    io.emit('fetchBoard', {board: board.boardCards});
  });
});

// launch ======================================================================
server.listen(port, function () {
  console.log('The magic happens on port ' + port);
});
