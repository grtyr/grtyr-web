'use strict';

angular.module('grtyrApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('admin', {
        url: '/admin',
        templateUrl: 'app/admin/admin.html',
        controller: 'AdminCtrl',
        title: 'Admin',
        authenticate: true
      });
  });
