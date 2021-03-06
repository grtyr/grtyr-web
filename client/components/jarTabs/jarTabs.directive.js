'use strict';

angular.module('grtyrApp')
  .directive('jarTabs', function(Jars) {
    return {
      templateUrl: 'components/jarTabs/jarTabs.html',
      restrict: 'EA',
      controller: function($scope) {
        $scope.jars = Jars.mine;
        $scope.newJarForm = false;
      }
    };
  });
