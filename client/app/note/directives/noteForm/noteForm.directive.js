'use strict';

angular.module('grtyrApp')
  .directive('noteForm', function() {
    return {
      templateUrl: 'app/note/directives/noteForm/noteForm.html',
      restrict: 'EA',
      scope: {
        submitFn: '&',
        model: '=',
        submitText: '@'
      },
    };
  });
