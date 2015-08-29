var _           = require('underscore');

// expose this function to our app
var Board = function() {

	// Create an empty array of cards
	var cards = [];
	// Create an empty array of players
	var users = [];
	var boardCards = [[6,6,'r90']];
  var gameOver = false;
  var playersComplete = false;

	// methods =====================

	// Create a new board and populates the cards array out the 6|6
	// with the possible combinations of cards leaving to start the game
	// TODO :: assign the 6|6 dynamicaly not to the fourth player
	var createBoardCards = function() {
	  _.each(_.range(7), function(item){
	    _.each(_.range(item, 7),function(item2){
	      if(item != 6 || item2 != 6){
	        cards.push([item,item2])
	      }
	    })
	  });
	  // Shuffle the cards
	  cards = _.shuffle(cards);
	};

	// Deal cards to a user
	var dealPlayerCards = function() {
		// Take away 7 cards from the array
		var newcards = cards.splice(7);
		// Assign the 7 cards to the player
		var playercards = cards;
		// Re-assign the array without the 7 cards
  		cards = newcards;

  		return playercards;
	};

	// Add new player to the board
	var addPlayerToBoard = function(email) {
		// Set the next move player
        // TODO :: Refactor to assign the next move player dynamically
        if (users.length == 0) {
          selected = true;
        } else {
          selected = false;
        }

        // Add player to the array
        if(!playersComplete && (_.find(users,function(item) {return item.email == email}) == undefined)){
          users.push({email: email, selected: selected});
          if(users.length == 4){ playersComplete = true;}
        }
	};

  var isNewGame = function isNewGame() {
    return (cards.length  == 0) && (playersComplete === false)
  };

  var changeTurn = function(lastTurnEmail){
    _.each(users, function(user, index) {
      if(user.email == lastTurnEmail){
        user.selected = false;
        if(index == users.length -1 ){
          users[0].selected = true;
        }else{
          users[index + 1].selected = true;
        }
      }
    })
  };
  var playHandler = function(data, io) {
    boardCards = data.board;
    changeTurn(data.user);
    io.emit('fetchUsers', {users: users });
    io.emit('fetchBoard', {board: boardCards});
  };

	return {
		cards 			: cards,
		boardCards 	: boardCards,
		users 			: users,
		createBoardCards: createBoardCards,
		dealPlayerCards	: dealPlayerCards,
		addPlayerToBoard: addPlayerToBoard,
    isGameOver: gameOver,
    playHandler: playHandler,
    isPlayersComplete: playersComplete,
    isNewGame: isNewGame
	}
};

exports.Board = Board;
