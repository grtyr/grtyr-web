'use strict';

angular.module('grtyrApp')
  .directive('jarForm', function($http, Jars) {
    return {
      templateUrl: 'components/jarForm/jarForm.html',
      restrict: 'EA',
      scope: false,
      controller: function($scope) {
        $scope.jar = {};
        $scope.create = function() {
          $http.post('/api/jars', $scope.jar).success(function(jar) {
            Jars.addJar(jar);
            $scope.jar = {};
          });
        };
      }
    };
  });
