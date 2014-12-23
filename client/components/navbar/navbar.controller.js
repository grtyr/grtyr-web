'use strict';

angular.module('grtyrApp')
  .controller('NavbarCtrl', function($scope, Auth) {
    $scope.menu = [{
      title: 'Home',
      state: 'main'
    }, {
      title: 'Write',
      state: 'note',
      auth: true
    }];

    $scope.isAuthed = function(item) {
      if (!item.auth) {
        return true;
      }
      return Auth.isLoggedIn();
    };

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.isLocal = Auth.isLocal;
    $scope.getCurrentUser = Auth.getCurrentUser;
  });
