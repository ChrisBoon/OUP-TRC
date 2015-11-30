'use strict';

angular.module('trcApp')
  .controller('FilesCtrl', function ($scope, $http, $routeParams) {
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
    //placeholder to put filter data to separate variable as we'll be binding this
    this.filter = '';

    this.sort = {};

    this.oneList = [];

    //for generating the main links on the homepage
    //this will be unlikely to change during lifecycle of a product but will vary by product to product so will either be best as separate file or at least separate in dev and bundled in at build phase
    $http.get('json/'+this.Id+'.json').success(function(data) {
    	thisPage.json = data;
    })
    .error(function(){
    	console.log('couldnt find the json for this page');
  	})
    .then(function(){

      thisPage.filter = thisPage.json.filter;
      thisPage.sort.by = thisPage.json.sort;
      thisPage.sort.setAs = thisPage.sort.by[0];
      var oneList = function(){
        var tempList = [];
        for (var i = 0; i < thisPage.json.unitList.length; i++) {
          for (var j = 0; j < thisPage.json.unitList[i].fileList.length; j++) {
            tempList.push(thisPage.json.unitList[i].fileList[j]);
          }
        }
        return tempList;
      };
      thisPage.oneList = oneList();

    });
    

  });
