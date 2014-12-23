'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var noteCtrlStub = {
  index: 'noteCtrl.index'
};

var routerStub = {
  get: sinon.spy()
};

// require the index with our stubbed out modules
var noteIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './note.controller': noteCtrlStub
});

describe('Note API Router:', function() {

  it('should return an express router instance', function() {
    noteIndex.should.equal(routerStub);
  });

  describe('GET /api/notes', function() {

    it('should route to note.controller.index', function() {
      routerStub.get
        .withArgs('/', 'noteCtrl.index')
        .should.have.been.calledOnce;
    });

  });

});
