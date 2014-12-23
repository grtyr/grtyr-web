'use strict';

var app = require('../../app');
var request = require('supertest');

describe('Token API:', function() {

  describe('GET /api/tokens', function() {
    var tokens;

    beforeEach(function(done) {
      request(app)
        .get('/api/tokens')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          tokens = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      tokens.should.be.instanceOf(Array);
    });

  });

});
