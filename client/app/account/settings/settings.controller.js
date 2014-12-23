'use strict';

angular.module('grtyrApp')
  .controller('SettingsCtrl', function($scope, User, $http, Auth) {
    $scope.errors = {};
    $scope.tokens = [];
    $scope.isLocal = Auth.isLocal;

    $http.get('/api/tokens/mine').success(function(tokens) {
      $scope.tokens = tokens;
    });

    $scope.delete = function(token) {
      $http.delete('/api/tokens?token=' + encodeURIComponent(token.token)).success(function() {
        angular.forEach($scope.tokens, function(t, i) {
          if (t.id === token.id) {
            $scope.tokens.splice(i, 1);
          }
        });
      });
    };

    $scope.changePassword = function(form) {
      $scope.submitted = true;
      if (form.$valid) {
        Auth.changePassword($scope.user.oldPassword, $scope.user.newPassword)
          .then(function() {
            $scope.message = 'Password successfully changed.';
          })
          .catch(function() {
            form.password.$setValidity('mongoose', false);
            $scope.errors.other = 'Incorrect password';
            $scope.message = '';
          });
      }
    };
  });
