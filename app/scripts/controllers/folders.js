'use strict';

angular.module('trcApp')
  .controller('FoldersCtrl', function ($scope, $http, $routeParams) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    this.Id = $routeParams.id;

    //store variable ref to this for easy reference
    var thisPage = this;
    // add hook for json
    thisPage.json = {};

    //for generating the main links on the homepage
    //this will be unlikely to change during lifecycle of a product but will vary by product to product so will either be best as separate file or at least separate in dev and bundled in at build phase
    $http.get('json/'+this.Id+'.json').success(function(data) {
    	thisPage.json = data;
    }).error(function(){
    	console.log('couldnt find the json for this page');
	});

  });
