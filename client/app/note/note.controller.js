'use strict';

angular.module('grtyrApp')
  .controller('NoteCtrl', function($scope, $http) {
    $scope.notes = [];
    $scope.years = [];
    $scope.note = {
      body: '',
      category_id: 1
    };
    $scope.editNote = null;

    $http.get('/api/notes/init').success(function(years) {
      $scope.years = years;
    });

    function resetEdit() {
      $scope.editNote = null;
    }

    $scope.edit = function(note) {
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
            n.category_id = note.category_id;
          }
        });
        resetEdit();
      });
    };

    $scope.saveNote = function() {
      $http.post('/api/notes', $scope.note).success(function(note) {
        $scope.note.body = '';
        $scope.notes.unshift(note);
      });
    };

    $http.get('/api/notes/mine').success(function(data) {
      $scope.notes = data.notes;
    });
  });
