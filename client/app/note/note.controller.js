'use strict';

angular.module('grtyrApp')
  .controller('NoteCtrl', function($scope, $http, Jars) {
    $scope.notes = [];
    $scope.note = {
      body: '',
      category_id: 1
    };
    $scope.editNote = null;

    function resetEdit() {
      $scope.editNote = null;
    }

    function resetNote(jar) {
      $scope.note = {
        body: '',
        category_id: 1,
        jar_id: jar
      };
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
        Jars.updateNote(note);
        resetEdit();
      });
    };

    $scope.saveNote = function() {
      $http.post('/api/notes', $scope.note).success(function(note) {
        Jars.addNote(note);
        resetNote(note.jar_id);
      });
    };
  });
