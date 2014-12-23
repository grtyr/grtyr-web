'use strict';

var app = require('../../app');
var request = require('supertest');

describe('Note API:', function() {

  describe('GET /api/notes', function() {
    var notes;

    beforeEach(function(done) {
      request(app)
        .get('/api/notes')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          notes = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      notes.should.be.instanceOf(Array);
    });

  });

});
