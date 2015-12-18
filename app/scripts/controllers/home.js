'use strict';

//controllerAs set to 'home'.

angular.module('trcApp')
.controller('MainCtrl', function ($scope, localStorageService, $http) {

	//use a variable to track whether to display the welcome message
	this.showWelcome = true;

	//check localStorage to see if the user has dismissed it - if so set variable to false.
	this.getWelcomeStatus = function(){
      if (localStorageService.get('isWelcomeHidden') === true) {
        this.showWelcome = false;
      }
    };

    //if the user presses to not show the message we instantly hide it and remember it in localStorage so we don't display it again
    this.setWelcomeStatus = function(){
    	this.showWelcome = false;
	    localStorageService.set('isWelcomeHidden',true);
    };

    //note this is just for testing purposes - it wouldn't be needed in the real app.
    //if you click the list of links in the footer this is triggering to bring back the welcome message.
    this.unsetWelcomeStatus = function(){
        this.showWelcome = true;
        localStorageService.set('isWelcomeHidden',false);
    };


    //store variable ref to this for easy reference
    var thisHome = this;
    // add hook for json
    thisHome.json = {};

    //for generating the main links on the homepage
    //this will be unlikely to change during lifecycle of a product but will vary by product to product so will either be best as separate file or at least separate in dev and bundled in at build phase
    $http.get('json/home.json').success(function(data) {
    	thisHome.json = data;
    }).error(function(){
    	console.log('couldnt find the json for this page');
    });


});