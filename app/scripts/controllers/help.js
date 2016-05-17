'use strict';

//controllerAs set to 'help'.

angular.module('trcApp')
.controller('HelpCtrl', function ($http) {

    //store variable ref to this for easy reference
    var thisHelp = this;
    // add hook for json
    thisHelp.json = {};

    $http.get('json/help.json').success(function(data) {
    	thisHelp.json = data;
    }).error(function(){
    	console.log('couldnt find the json for this page');
    });

});