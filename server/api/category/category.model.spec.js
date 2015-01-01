'use strict';

var Category = require('../../sqldb').Category;


describe('Category Model', function() {
  before(function() {
    // Sync and clear users before testing
    return Category.sync().then(function() {
      return Category.destroy();
    });
  });

  afterEach(function() {
    return Category.destroy();
  });

  it('should begin with no users', function() {
    return Category.findAll()
      .should.eventually.have.length(0);
  });

});
