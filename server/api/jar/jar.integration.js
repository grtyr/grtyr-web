'use strict';

var app = require('../../app');
var request = require('supertest');

describe('Jar API:', function() {

  describe('GET /api/jars', function() {
    var jars;

    beforeEach(function(done) {
      request(app)
        .get('/api/jars')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          jars = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      jars.should.be.instanceOf(Array);
    });

  });

});
