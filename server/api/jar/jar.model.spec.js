'use strict';

var Jar = require('../../sqldb').Jar;


describe('Jar Model', function() {
  before(function() {
    // Sync and clear users before testing
    return Jar.sync().then(function() {
      return Jar.destroy();
    });
  });

  afterEach(function() {
    return Jar.destroy();
  });

  it('should begin with no users', function() {
    return Jar.findAll()
      .should.eventually.have.length(0);
  });

});
