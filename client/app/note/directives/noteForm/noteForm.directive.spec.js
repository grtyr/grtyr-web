'use strict';

describe('Directive: noteForm', function () {

  // load the directive's module and view
  beforeEach(module('grtyrApp'));
  beforeEach(module('app/note/directives/noteForm/noteForm.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<rule-form></rule-form>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the noteForm directive');
  }));
});
