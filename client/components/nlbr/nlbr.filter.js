'use strict';
(function() {
  angular.module('grtyrApp')
    .filter('nlbr', function() {
      return function(text) {
        if (text) {
          return text.replace(/\n/g, '<br/>');
        }
      };
    });
})();
