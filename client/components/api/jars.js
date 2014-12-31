'use strict';

angular.module('grtyrApp')
  .factory('Jars', function($rootScope, Auth, $http) {
    var BASE_URL = '/api/jars';
    var _jars = [];

    function initialize() {
      $http.get(BASE_URL + '/mine').success(function(jars) {
        Array.prototype.push.apply(_jars, jars);
      });
    }

    function clear() {
      while (_jars.length > 0) {
        _jars.pop();
      }
    }
    Auth.isLoggedIn(function(is) {
      if (is) {
        return initialize();
      }
    });
    $rootScope.$on('loggedIn', initialize);
    $rootScope.$on('loggedOut', clear);
    return {
      mine: _jars,
      addNote: function(note) {
        _jars.forEach(function(jar) {
          if (jar.id === note.jar_id) {
            jar.Notes.unshift(note);
          }
        });
      },
      updateNote: function(note) {
        _jars.forEach(function(jar) {
          if (jar.id === note.jar_id) {
            jar.Notes.forEach(function(n) {
              if (n.id === note.id) {
                n.body = note.body;
                n.category_id = note.category_id;
              }
            });
          }
        });
      },
      addJar: function(jar) {

      },
      updateJar: function(jar) {

      }
    };
  });
