'use strict';

angular.module('grtyrApp')
  .factory('Categories', function($resource) {
    return $resource('/api/categories', {}, {
      'query': {
        method: 'GET',
        isArray: true,
        cache: true
      }
    });
  });
