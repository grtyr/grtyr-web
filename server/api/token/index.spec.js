'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var tokenCtrlStub = {
  index: 'tokenCtrl.index'
};

var routerStub = {
  get: sinon.spy(),
  delete: sinon.spy(),
};

// require the index with our stubbed out modules
var tokenIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './token.controller': tokenCtrlStub
});

describe('Token API Router:', function() {

  it('should return an express router instance', function() {
    tokenIndex.should.equal(routerStub);
  });

  describe('GET /api/tokens', function() {

    it('should route to token.controller.index', function() {
      routerStub.get
                .withArgs('/', 'tokenCtrl.index')
                .should.not.have.been.calledOnce;
    });

  });

});
