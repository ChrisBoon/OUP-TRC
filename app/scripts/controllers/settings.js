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

  })

  	//THESE ARE DIRECTIVES - I SHOULD MOVE IT INTO SEPARATE FILES!:

  	//directive for adding 'enter' keyboard control on divs - requires same function be called in 'my-enter' as 'ng-click'
	.directive('oupEnter', function () {
	    return function (scope, element, attrs) {
	        element.bind('keydown keypress', function (event) {
	            if(event.which === 13) {
	                scope.$apply(function (){
	                    scope.$eval(attrs.oupEnter);
	                });

	                event.preventDefault();
	            }
	        });
	    };
	})

	//directive for setting focus on an element - used in TRC to auto set focus to first input in a section when pressing 'edit'.
	.directive('oupFocus', function ($timeout) {
    return {
        restrict: 'A',
        link: {
            post: function postLink(scope, element, attrs) {
                scope.$watch(attrs.oupFocus, function (value) {
                	console.log(value);
                    if (attrs.oupFocus) {
                        if (scope.$eval(attrs.oupFocus)) {
                            $timeout(function () {
                                element[0].focus();
                            }, 100); //need some delay to work with ng-disabled
                        }
                    }
                });
            }
        }
    };
});