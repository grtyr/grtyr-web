'use strict';

angular.module('grtyrApp')
  .directive('noteForm', function(Categories) {
    return {
      templateUrl: 'app/note/directives/noteForm/noteForm.html',
      restrict: 'EA',
      scope: {
        submitFn: '&',
        note: '=',
        submitText: '@'
      },
      controller: function($scope) {
        $scope.categories = Categories.query();
      }
    };
  });
