'use strict';

angular.module('trcApp')
  .controller('MainCtrl', function ($scope, localStorageService) {

  	$scope.showWelcome = true;


	$scope.getWelcomeStatus = function(){
      if (localStorageService.get('isWelcomeHidden') === true) {
        $scope.showWelcome = false;
      }
    };

    //Updates localstorage so we can use getLang next time a user is here.
    $scope.setWelcomeStatus = function(){
    	$scope.showWelcome = false;
	    localStorageService.set('isWelcomeHidden',true);
    };

    $scope.browseMethods = [
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
     $scope.updatesList = [
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