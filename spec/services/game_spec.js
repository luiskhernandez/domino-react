var _ = require("underscore");
var sinon = require("sinon");
var board;

describe("Game Service", function() {
  beforeEach(function() {
    board = require('../../app/services/game.js').Board();
  });

  describe("Initial state", function() {
    it("containas a empty array for users", function() {
      expect(board.getUsers().length).toBe(0);
    });

    it("contains a empty array for cards", function() {
      expect(board.getCards().length).toBe(0);
    });

    it("gameOver began false", function() {
      expect(board.isGameOver).toBe(false);
    });
  });

  describe("#createBoardCards",function() {
    beforeEach(function() {
      board.createBoardCards();
    });

    it("should create all the dominos card",function() {
      expect(board.getCards().length).toBe(27);
    });

  });

  describe("#dealPlayerCards",function() {
    describe("First player", function() {
      beforeEach(function() {
        board.createBoardCards();
        board.addPlayerToBoard("demo@demo.com");
      })

      it("shuffles the cards",function() {
        spyOn(_,"shuffle").andCallThrough();
        board.dealPlayerCards("demo@demo.com")
          expect(_.shuffle).toHaveBeenCalled();
      });
    });

    describe("Game started", function() {
      beforeEach(function() {
        playHandlerSetup();
      });

      it("returns the same cards if the players is already in the game",function() {
        user = board.getUsers()[0];
        user_cards_before = user.cards;
        user_cards = board.dealPlayerCards(user.email);
        expect(user.cards).toEqual(user_cards_before);
      });
    });
  });

  describe("#addPlayerToBoard",function() {
    beforeEach(function() {
      board.createBoardCards();
    });

    it("should add player to the board",function() {
      expect(board.getUsers().length).toEqual(0);
      board.addPlayerToBoard("demo@demo.com");
      expect(board.getUsers().length).toEqual(1);
      board.addPlayerToBoard("demo2@demo.com");
      expect(board.getUsers().length).toEqual(2);
    });
  });

  var playHandlerSetup = function() {
    board.createBoardCards();
    board.addPlayerToBoard("demo@demo.com");
    board.addPlayerToBoard("demo2@demo.com");
    board.addPlayerToBoard("demo3@demo.com");
    board.addPlayerToBoard("demo4@demo.com");

    board.dealPlayerCards("demo@demo.com");
    board.dealPlayerCards("demo2@demo.com");
    board.dealPlayerCards("demo3@demo.com");
    board.dealPlayerCards("demo4@demo.com");
  };

  describe("#playHandler", function() {
    beforeEach(function() {
      playHandlerSetup();

      user = board.getUsers()[0];
      before_cards = user.cards;
    });

    describe("player send valid card",function() {
      it("should reomve card from player cards ",function() {
        card = user.cards[0];
        board.playHandler({board: [[6,6, "r90"], [6,5, "r90"]], playedCard: card, user: user.email});
        player_cards = user.cards;
        expect(player_cards.length).toBe(before_cards.length -1);
        expect(player_cards).not.toContain(card);
      });
    });

    describe("player send empty card (PASS)",function() {
      it("should not reomve card from player cards ",function() {
        card = [];
        board.playHandler({board: [[6,6, "r90"], [6,5, "r90"]], playedCard: card, user: user.email});
        player_cards = user.cards;
        expect(player_cards.length).toBe(before_cards.length);
      });
    });

    it("should change the turn",function() {
      card = [];
      expect(board.getUsers()[0].selected).toBe(true);
      board.playHandler({board: [[6,6, "r90"], [6,5, "r90"]],
        playedCard: card, user: user.email}).then(function(data) {
        expect(data.users[0].selected).toBe(false);
        expect(data.users[1].selected).toBe(true);
      });
    });
  });

});



