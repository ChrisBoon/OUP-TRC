'use strict';

//TODO: rewrite so we're not asking for the file twice
angular.module('trcApp')
  .factory('getJSON', function ($http, $routeParams, $location) {
    // Service logic
    // ...

    // Public API here
    return {
      allJSON: function() {
        return $http.get('json/'+$routeParams.id+'.json').then(function(result) {
           return result.data;
       });
      },
      
      headerStuff: function() {
        var thePath = $location.path().split(/[\s/]+/).pop();
        if ( thePath ===" "){
          return false;
        }
        else{
          return $http.get('json/'+thePath+'.json')
          .then(
            function(result) {
             return result.data.parentURL;
            }
          );
        }

      }
      
    };
  });
