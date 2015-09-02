var _           = require('underscore');

// expose this function to our app
var Board = function() {

	// Create an empty array of cards
	var cards = [];
	// Create an empty array of players
	var users = [];
	var boardCards = [[6,6,'']];
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
	};

  var getShuffleCards = function() {
	  // Shuffle the cards
	  cards =  _.shuffle(cards);
    return cards;
  };
	// Deal cards to a user
	var dealPlayerCards = function dealPlayerCards(email) {
		//Get index of the user
		user = isPlayer(email);
		// player has cards?
		if (user && user.cards.length == 0) {
			// Take away 7 cards from the array
      getShuffleCards();
			var newcards = cards.splice(7);
			// Assign the 7 cards to the player
			user.cards = cards;
			// Re-assign the array without the 7 cards
			cards = newcards;
		}
		return user.cards;
	};

	// Add new player to the board
	var addPlayerToBoard = function(email) {
    if(!playersComplete && !isPlayer(email)){
    	// Set the next move player
    	// TODO :: Refactor to assign the next move player dynamically
    	if (users.length == 0) {
	      selected = true;
	    } else {
	      selected = false;
	    }
    	// Add player to the array
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

    var winner, closed, playerCard;

    // Update board cards
    boardCards = data.board;
    
    winner = false;
    closed = false;
    playedCard = data.playedCard;
    // Remove card from player
    user = isPlayer(data.user);
    // Remove playedCard from the array of user cards if the user play a card
    if (playedCard !== []) {
    	removeCard(user, [playedCard[0], playedCard[1]]);
    }
    // is the current player the winner?
    if (user.cards.length == 0) {
      console.log("We got a winner!");
      console.log(user);
      winner = user;
    }
    // is the game closed?
    if (!checkForMovesAvailable()) {
      console.log("Game is closed!");
      closed = true;
    }

    // Change to the next user
    changeTurn(data.user);

    return new Promise(function promise(resolve, reject){
    	resolve({users: users, board: boardCards, winner: winner, closed: closed});
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

  // Check if there are moves availables
  // If the game is closed the function 
  // returns a promise to emit a message
  var checkForMovesAvailable = function checkForMovesAvailable() {
    var status, left, right;
    status = false;
    left = boardCards[0];
    right = boardCards[boardCards.length - 1];

    // Get the outer left card number
    if (left[2] == "r90") {
      left = left[1];
    } else {
      left = left[0];
    }

    // Get the outer right card number
    if (right[2] == "r90_") {
      right = right[1];
    } else {
      right = right[0];
    }

    // Check if one player have  at least one card to play
    _.each(users, function(user, index) {
      // Check if there is a move available
      var move = _.find(user.cards, function(card) { return (card[0] == left || card[1] == left || card[0] == right || card[1] == right) }); 
      if (move != undefined) {
        status = true;
      }
    })
    return status;
  };

	return {
		getCards 			: function() {return cards;},
		getBoardsCards 	: function(){ return boardCards;},
		getUsers 			: function() {  return users;},
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
