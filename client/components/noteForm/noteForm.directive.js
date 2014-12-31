'use strict';

angular.module('grtyrApp')
  .directive('noteForm', function(Categories, Jars) {
    return {
      templateUrl: 'components/noteForm/noteForm.html',
      restrict: 'EA',
      scope: {
        submitFn: '&',
        note: '=',
        submitText: '@'
      },
      controller: function($scope) {
        $scope.categories = Categories.query();
        $scope.jars = Jars.mine;
        if ($scope.note && !$scope.note.jar_id) {
          var watchDeregister = $scope.$watchCollection('jars', function(jars) {
            if (jars && jars.length) {
              $scope.note.jar_id = jars[0].id;
              watchDeregister();
            }
          });
        }
      }
    };
  });
