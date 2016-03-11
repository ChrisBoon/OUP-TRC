'use strict';

/**
 * @ngdoc function
 * @name trcApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the trcApp
 */
angular.module('trcApp')
  .controller('SettingsCtrl', function ($scope, localStorageService) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    this.setNewPassword ='';
    var thisSettings = this;

    this.state = 'viewing';
    this.changed = false;

    this.setState = function(setAs){
    	thisSettings.state = setAs;
    };

    if (localStorageService.get('settingsChanged') === null) {
    	var thisData = {
	    	'profile' : {
		    	'firstName' : 'Chris',
		    	'lastName' : 'Boon'
	    	},
	    	'password' : {
		    	'value' : 'weakPassword',
		    	'lastUpdate': '2016-02-27'
	    	},
	    	'email' : 'chris.boon@oup.com',
	    	'role' : 'teacher'
	    };
    	localStorageService.set('settingsChanged',thisData);
    }


    thisSettings.userDetails = angular.copy( localStorageService.get('settingsChanged') );   



    this.saveData = function(){
		localStorageService.set('settingsChanged', thisSettings.userDetails);
		thisSettings.setState('viewing');
    };

    this.cancelData = function(){
    	thisSettings.userDetails = localStorageService.get('settingsChanged'); 
    };

    this.showUpdate = function(type){
    	thisSettings.changed = type;
    };

	$scope.submitChange = function(thisForm,type) {
		// check to make sure the form is completely valid
		if (thisForm.$valid) {
			thisSettings.saveData();
			if (type ==='email') {
				thisSettings.showUpdate('email address');
			}
			else if (type ==='name') {
				thisSettings.showUpdate('name');
			}
		}
	};

	$scope.submitChangePassword = function(thisForm) {
		// check to make sure the form is completely valid
		if (thisForm.$valid) {
			console.log(thisSettings.setNewPassword);
			thisSettings.userDetails.password.value = thisSettings.setNewPassword;
			thisSettings.userDetails.password.lastUpdate = Date.now();
			thisSettings.saveData();
			thisSettings.showUpdate('password');
		}

	};
    this.cancelChange = function(){
    	thisSettings.userDetails = localStorageService.get('settingsChanged');
    	thisSettings.setState('viewing');
    };

  });
