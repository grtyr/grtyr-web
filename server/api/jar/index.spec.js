'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var jarCtrlStub = {
  index: 'jarCtrl.index'
};

var authServiceStub = {
  isAuthenticated: function() {
    return 'authService.isAuthenticated';
  },
  hasRole: function(role) {
    return 'authService.hasRole.' + role;
  }
};

var routerStub = {
  get: sinon.spy(),
  post: sinon.spy()
};

// require the index with our stubbed out modules
var jarIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './jar.controller': jarCtrlStub,
  '../../auth/auth.service': authServiceStub
});

describe('Jar API Router:', function() {

  it('should return an express router instance', function() {
    jarIndex.should.equal(routerStub);
  });

  describe('GET /api/jars', function() {

    it('should verify admin role and route to jar.controller.index', function() {
      routerStub.get
        .withArgs('/', 'authService.hasRole.admin', 'jarCtrl.index')
        .should.have.been.calledOnce;
    });

  });

});
