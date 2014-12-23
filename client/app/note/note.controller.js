'use strict';

angular.module('grtyrApp')
  .controller('NoteCtrl', function($scope, $http) {
    var __canWrite;
    $scope.canWrite = false;
    $scope.notes = [];
    $scope.years = [];
    $scope.note = {
      body: ''
    };
    $scope.editNote = null;

    $http.get('/api/notes/init').success(function(data) {
      $scope.canWrite = data.can;
      $scope.years = data.years;
    });

    function resetEdit() {
      $scope.canWrite = __canWrite;
      $scope.editNote = null;
    }

    $scope.edit = function(note) {
      __canWrite = $scope.canWrite;
      $scope.canWrite = false;
      $scope.editNote = angular.copy(note);
    };

    $scope.checkEsc = function(event) {
      if (event.keyCode === 27) {
        resetEdit();
      }
    };

    $scope.updateNote = function() {
      $http.put('/api/notes/' + $scope.editNote.id, $scope.editNote).success(function(note) {
        angular.forEach($scope.notes, function(n) {
          if (n.id === note.id) {
            n.body = note.body;
          }
        });
        resetEdit();
      });
    };

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
