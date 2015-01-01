'use strict';

var Note = require('../../sqldb').Note;


describe('Note Model', function() {
  before(function() {
    // Sync and clear users before testing
    return Note.sync().then(function() {
      return Note.destroy();
    });
  });

  afterEach(function() {
    return Note.destroy();
  });

  it('should begin with no users', function() {
    return Note.findAll()
      .should.eventually.have.length(0);
  });

});
