'use strict';

var Token = require('../../sqldb').Token;


describe('Token Model', function() {
  before(function() {
    // Sync and clear users before testing
    return Token.sync().then(function() {
      return Token.destroy();
    });
  });

  afterEach(function() {
    return Token.destroy();
  });

  it('should begin with no users', function() {
    return Token.findAll()
      .should.eventually.have.length(0);
  });

});
