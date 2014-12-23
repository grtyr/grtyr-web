'use strict';

angular.module('grtyrApp')
  .controller('AdminCtrl', function($scope, User) {
    $scope.users = User.query();
  });
