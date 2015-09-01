var _ = require("underscore");
var sinon = require("sinon");

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

  describe("#addPlayerToBoard",function() {
    beforeEach(function() {
      board.createBoardCards();
    });

    it("should add player to the board",function() {
      console.log(board.getUsers());
      expect(board.getUsers().length).toEqual(0);
      board.addPlayerToBoard("demo@demo.com");
      expect(board.getUsers().length).toEqual(1);
      board.addPlayerToBoard("demo2@demo.com");
      expect(board.getUsers().length).toEqual(2);
    });
  });

  describe("#playHandler", function() {
    beforeEach(function() {
      board.createBoardCards();
      board.addPlayerToBoard("demo@demo.com");
      board.addPlayerToBoard("demo2@demo.com");
      board.addPlayerToBoard("demo3@demo.com");
      board.addPlayerToBoard("demo4@demo.com");

      boad.dealPlayerCards("demo@demo.com")
      boad.dealPlayerCards("demo2@demo.com")
      boad.dealPlayerCards("demo3@demo.com")
      boad.dealPlayerCards("demo4@demo.com")
    });

    describe("player send valid card",function() {
      board.playHandler({board: [], playedCard: [6,6, "r90"], user: "demo4@demo.com"});j
      it("should reomve card from player cards ",function() {
      });
    });

    describe("player send empty card (PASS)",function() {
      it("should not reomve card from player cards ",function() {
      });
    });

    it("should change the turn",function() {
    });
  });

});



