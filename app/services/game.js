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
	        cards.push([item, item2]);
	      }
	    })
	  });
	  // Shuffle the cards
	  cards = _.shuffle(cards);
	};

	// Deal cards to a user
	var dealPlayerCards = function dealPlayerCards(email) {
		//Get index of the user
		user = isPlayer(email)
		// player has cards?
		if (user) {
			// Take away 7 cards from the array
			var newcards = cards.splice(7);
			// Assign the 7 cards to the player
			user.cards = cards;
			console.log(user);
			// Re-assign the array without the 7 cards
			cards = newcards;
		} 
		return user.cards;
	};

	// Add new player to the board
	var addPlayerToBoard = function(email) {
    // Add player to the array
    if(!playersComplete && !isPlayer(email)){
    	// Set the next move player
    	// TODO :: Refactor to assign the next move player dynamically
    	if (users.length == 0) {
	      selected = true;
	    } else {
	      selected = false;
	    }
      users.push({email: email, selected: selected, cards: []});
      if(users.length == 4){ playersComplete = true;}
    }
	};

  var isNewGame = function isNewGame() {
    return (cards.length  == 0) && (playersComplete === false)
  };

  var changeTurn = function(lastTurnEmail){
    _.each(users, function(user, index) {
      if(user.email == lastTurnEmail) {
        user.selected = false;
        if(index == users.length -1 ) {
          users[0].selected = true;
        }else{
          users[index + 1].selected = true;
        }
      }
    })
  };

  var playHandler = function(data) {
    var boardCards = data.board;
    var playedCard = data.playedCard;
    // Remove card from player
    user = isPlayer(data.user);
    // Remove playedCard from the array of user cards if the user play a card
    if (playedCard !== []) {
    	removeCard(user, [playedCard[0], playedCard[1]]);
    }
    changeTurn(data.user);
    return new Promise(function promise(resolve, reject){
    	resolve({users: users, board: boardCards})
    });
  };

  // Get the index of the user or 
  // return false in case is not already a player
  var isPlayer = function isPlayer(email) {
  	return _.find(users,function(item) {return item.email == email}); 
  };

  // Remove played card from player cards array
  var removeCard = function removeCard(user, playedCard) {
  	user.cards = _.reject(user.cards, playedCard);
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
