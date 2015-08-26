var express     = require('express');
var app         = express();
var port        = 3000;
var mongoose    = require('mongoose');
var passport    = require('passport');
var flash       = require('connect-flash');

var morgan        = require('morgan');
var cookieParser  = require('cookie-parser');
var bodyParser    = require('body-parser');
var session       = require('express-session');

var configDB = require('./config/database.js');

// configuration ===============================================================
mongoose.connect(configDB.url); // connect to our database

require('./config/passport')(passport); // pass passport for configuration

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms

app.set('view engine', 'ejs'); // set up ejs for templating

// required for passport
app.use(session({ secret: 'dominojs' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in 

// routes ======================================================================
require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

// launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);


// Move Code
/*var io          = require('socket.io')(http);

var games = require('./routes/games');
var _ = require('underscore');

var cards = [];
var users = [];

var createBoardCards = function createBoardCards(){
  _.each(_.range(7), function(item){
    _.each(_.range(item, 7),function(item2){
      if(item != 6 || item2 != 6){
        cards.push([item,item2])
      }
    })
  });
}

// Move routes to routes file ================================================

app.post('/users', function(req, res){
  if (_.filter(users, function(user){ return user.email == req.body.email }).length == 0) {
    console.log('Create user');
    if (users.length == 0) {
      selected = true;
    } else {
      selected = false;
    }
    users.push({email: req.body.email, selected: selected});
    res.redirect('/play');
  } else {
    console.log('User already in the list');
    res.redirect('/');
  }
});

app.get('/play', function(req, res){
  if (_.size(cards) == 0){
    createBoardCards()
  }
  res.render('index');
});

app.get('/games/deal/card', function(req, res, next) {
  cards = _.shuffle(cards);
  var newcards = cards.splice(7);
  var playercards = cards;
  cards = newcards;
  res.json({cards: playercards});
});

// End Routes ===============================================================

io.on('connection', function(socket){
  socket.on('fetchUsers', function(){
    io.emit('fetchUsers', {users: users});
  });
});