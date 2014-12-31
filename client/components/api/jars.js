'use strict';

angular.module('grtyrApp')
  .factory('Jars', function($http) {
    var BASE_URL = '/api/jars';
    var _jars = [];
    $http.get(BASE_URL + '/mine').success(function(jars) {
      Array.prototype.push.apply(_jars, jars);
    });
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
