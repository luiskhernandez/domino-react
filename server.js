var app = require('express')();
var express = require('express');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var games = require('./routes/games');
var _ = require('underscore');


app.use(express.static('public'));

var cards = [];
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
  if (_.size(cards) == 0){
    createBoardCards()
  }
  res.sendfile('index.html');
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
  console.log('a user connected');
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
