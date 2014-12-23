'use strict';

angular.module('grtyrApp')
  .controller('NoteCtrl', function($scope, $http) {
    $scope.canWrite = false;
    $scope.notes = [];
    $scope.years = [];
    $scope.note = {
      body: ''
    };

    $http.get('/api/notes/init').success(function(data) {
      $scope.canWrite = data.can;
      $scope.years = data.years;
    });
    $scope.saveNote = function() {
      $http.post('/api/notes', $scope.note).success(function(note) {
        $scope.canWrite = false;
        $scope.note.body = '';
        $scope.notes.unshift(note);
      });
    };

    $http.get('/api/notes/mine').success(function(data) {
      $scope.notes = data.notes;
    });
  });
