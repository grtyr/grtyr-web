'use strict';

var app = require('../../app');
var User = require('../../sqldb').User;
var request = require('supertest');

describe('User API:', function() {
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

  // Clear users after testing
  after(function() {
    return User.destroy();
  });

  describe('GET /api/users/me', function() {
    var token;

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

    it('should respond with a user profile when authenticated', function(done) {
      request(app)
        .get('/api/users/me')
        .set('authorization', 'Bearer ' + token)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          res.body.id.toString().should.equal(user.id.toString());
          done();
        });
    });

    it('should respond with a 401 when not authenticated', function(done) {
      request(app)
        .get('/api/users/me')
        .expect(401)
        .end(done);
    });
  });
});
