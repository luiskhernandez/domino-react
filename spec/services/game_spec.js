var board     = require('../../app/services/game.js').Board();
describe("Game Service", function() {
  it("containas a empty array for users", function() {
    expect(board.users.length).toBe(0);
  });
});

