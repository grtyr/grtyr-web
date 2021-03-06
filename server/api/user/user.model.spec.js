'use strict';
var sqldb = require('../../sqldb');
var sequelize = sqldb.sequelize;
var User = sqldb.User;

var userTemplate = {
  provider: 'local',
  name: 'Fake User',
  email: 'test@test.com',
  password: 'password'
};

var user = User.build(userTemplate);

describe('User Model', function() {
  before(function() {
    // Sync and clear users before testing
    return sequelize.sync().then(function() {
      return User.destroy();
    });
  });

  afterEach(function() {
    return User.destroy();
  });

  it('should begin with no users', function() {
    return User.findAll()
      .should.eventually.have.length(0);
  });

  it('should fail when saving a duplicate user', function() {
    return user.save()
      .then(function() {
        var userDup = User.build(userTemplate);
        return userDup.save();
      }).should.be.rejected;
  });

  it('should authenticate user if password is valid', function() {
    user.authenticate('password').should.be.true;
  });

  it('should not authenticate user if password is invalid', function() {
    user.authenticate('blah').should.not.be.true;
  });
});
