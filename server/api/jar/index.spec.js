'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var jarCtrlStub = {
  index: 'jarCtrl.index'
};

var routerStub = {
  get: sinon.spy()
};

// require the index with our stubbed out modules
var jarIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './jar.controller': jarCtrlStub
});

describe('Jar API Router:', function() {

  it('should return an express router instance', function() {
    jarIndex.should.equal(routerStub);
  });

  describe('GET /api/jars', function() {

    it('should route to jar.controller.index', function() {
      routerStub.get
                .withArgs('/', 'jarCtrl.index')
                .should.have.been.calledOnce;
    });

  });

});
