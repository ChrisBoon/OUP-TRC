'use strict';

//controllerAs set to 'home'.

angular.module('trcApp')
.controller('MainCtrl', function ($scope, localStorageService) {

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

    //for generating the main links on the homepage
    //this will be unlikely to change during lifecycle of a product but will vary by product to product so will either be best as separate file or at least separate in dev and bundled in at build phase
    this.browseMethods = [
	    {
	      	'title': 'Browse by Resource Type',
	      	'class':'browse-type-1',
	      	'para': 'Looking for a particular resource such as Lesson Plans, or Classroom Activities? Choose this option.',
	      	'imgSrc': 'images/browseby-1.svg',
	      	'link': '/resource'
	    },
	    {
	      	'title': 'Browse by Topic',
	      	'class':'browse-type-2',
	      	'para': 'Want everything for a particular topic? Choose this option.',
	      	'imgSrc': 'images/browseby-2.svg',
	      	'link': '/topic'
	    },
	    {
	      	'title': 'Custom search',
	      	'class':'browse-type-3',
	      	'para': 'Looking for something specific? Choose this option for advanced filtering options.',
	      	'imgSrc': 'images/browseby-3.svg',
	      	'link': '/sign-out'
    	}
    ];
    
	//for displaying the updates on the homepage
	//This will be updated multiple times during the lifecycle of the product so will need to be a separate json file to make updating easier/safer
	this.updatesList = [
		{
		  	'title': 'Newsela Articles',
		  	'class':'new',
		  	'para': 'We’ve added these new things - check them out here!',
		  	'date': 'Nov 2016',
		  	'link': '/resource-files/newsela'
		},
		{
			'title': 'Classroom Activities',
			'class':'updated',
			'para': 'We’ve updated all of this resource to include some new stuff that makes them super relavant to users in 2017. Click here to take another look!',
		  	'date': 'Sept 2016',
		  	'link': '/resource-files/classroom-activities'
		}
	];    

});