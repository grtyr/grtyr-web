'use strict';

var app = require('../../app');
var User = require('../../sqldb').User;
var request = require('supertest');

describe('Token API:', function() {
  var user;

  // Clear users before testing
  before(function(done) {
    User.destroy().then(function() {
      user = User.build({
        name: 'Fake User',
        email: 'test@test.com',
        password: 'password'
      });

      user.save().then(function() {
        done();
      }, function(err) {
        return done(err);
      });
    });
  });

  describe('GET /api/tokens/mine', function() {
    var tokens, token;

    before(function(done) {
      request(app)
        .post('/auth/local')
        .send({
          email: 'test@test.com',
          password: 'password'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          token = res.body.token;
          done();
        });
    });

    beforeEach(function(done) {
      request(app)
        .get('/api/tokens/mine')
        .set('authorization', 'Bearer ' + token)
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
