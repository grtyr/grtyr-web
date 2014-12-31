'use strict';

var app = require('../../app');
var request = require('supertest');

describe('Category API:', function() {

  describe('GET /api/categories', function() {
    var categorys;

    beforeEach(function(done) {
      request(app)
        .get('/api/categories')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          categorys = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      categorys.should.be.instanceOf(Array);
    });

  });

});
