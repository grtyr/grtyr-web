'use strict';

angular.module('grtyrApp')
  .directive('noteList', function() {
    return {
      templateUrl: 'components/noteList/noteList.html',
      restrict: 'EA',
      scope: {
        editFn: '&',
        notes: '=',
        editNote: '='
      }
    };
  });
