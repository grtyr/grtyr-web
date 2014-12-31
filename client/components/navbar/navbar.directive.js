'use strict';

angular.module('grtyrApp')
  .directive('navbar', function() {
    return {
      templateUrl: 'components/navbar/navbar.html',
      restrict: 'E',
      controller: function($scope, $state, Auth) {
        $scope.menu = [{
          title: 'Home',
          state: 'main'
        }, {
          title: 'Write',
          state: 'note',
          auth: true
        }];
        $scope.brandSref = 'main';
        Auth.isLoggedIn(function(is) {
          if (is) {
            $scope.brandSref = 'note';
          }
        });

        $scope.brandHref = function() {
          return $state.href($scope.brandSref);
        };

        $scope.isAuthed = function(item) {
          if (!item.auth) {
            return true;
          }
          return Auth.isLoggedIn();
        };

        $scope.isCollapsed = true;
        $scope.isLoggedIn = Auth.isLoggedIn;
        $scope.isAdmin = Auth.isAdmin;
        $scope.getCurrentUser = Auth.getCurrentUser;
      }
    };
  });
