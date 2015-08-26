var app = require('express')();
var express = require('express');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var games = require('./routes/games');
var _ = require('underscore');
var bodyParser = require('body-parser');

app.set('views', __dirname + '/views')
app.set('view engine', 'jade')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('public'));

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

app.get('/', function(req, res){
  res.render('login');
});

app.post('/users', function(req, res){
  console.log('Create user');
  users.push({email: req.body.email});
  res.redirect('/play');
});

app.get('/play', function(req, res){
  if (_.size(cards) == 0){
    createBoardCards()
  }
  res.render('index');
});

// app.use('/games', games);
app.get('/games/deal/card', function(req, res, next) {
  cards = _.shuffle(cards);
  var newcards = cards.splice(7);
  var playercards = cards;
  cards = newcards;
  res.json({cards: playercards});
});

io.on('connection', function(socket){
  socket.on('fetchUsers', function(){
    io.emit('fetchUsers', {users: users});
  });
});


http.listen(3000, function(){
  console.log('listening on *:3000');
});
