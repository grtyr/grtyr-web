'use strict';

describe('Controller: NoteCtrl', function () {

  // load the controller's module
  beforeEach(module('grtyrApp'));

  var NoteCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    NoteCtrl = $controller('NoteCtrl', {
      $scope: scope
    });
  }));

});
