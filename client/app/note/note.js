'use strict';

angular.module('grtyrApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('note', {
        url: '/write',
        templateUrl: 'app/note/note.html',
        controller: 'NoteCtrl',
        title: 'Write'
      });
  });
