'use strict';

angular.module('grtyrApp')
  .directive('footer', function() {
    return {
      templateUrl: 'components/footer/footer.html',
      restrict: 'C',
      replace: true
    };
  });
