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



	thisSettings.emptyPasswordFields = function(){
		thisSettings.setNewPassword = {
			currentOne: '',
			newOne: '',
			confirm: ''
		};
	};
	thisSettings.emptyPasswordFields();

	this.clearMessages = function(){
		thisSettings.showUpdate(false);	
	    thisSettings.showError(false);
	};

    this.setState = function(setAs,asCommand){
    	//if called by opening another item on page instead of pressing cancel:
    	if (typeof asCommand === 'undefined') { asCommand = 'implicit'; }
    	//if something else already open:
    	if (thisSettings.state !== 'viewing' && asCommand === 'implicit') {
    		

			if (thisSettings.state ==='editName') {
				thisSettings.cancelData($scope.nameForm);
			}
			else if (thisSettings.state ==='editEmail') {
				thisSettings.cancelData($scope.emailForm);
			}
			else if (thisSettings.state ==='editPassword') {
				thisSettings.cancelData($scope.passwordForm);
			}
    	}

	    
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
		    	'lastUpdate': '2016-02-10'
	    	},
	    	'email' : 'chris.boon@oup.com',
	    	'role' : 'teacher'
	    };
    	localStorageService.set('settingsChanged',thisData);
    }


    thisSettings.userDetails = angular.copy( localStorageService.get('settingsChanged') );   



    this.saveData = function(thisForm){
		localStorageService.set('settingsChanged', thisSettings.userDetails);
		thisSettings.setState('viewing');
		thisForm.$setPristine();
    };

    this.cancelData = function(thisForm){
    	if (thisForm.$name === 'passwordForm') {
    		thisSettings.emptyPasswordFields();
    	}
    	thisSettings.userDetails = localStorageService.get('settingsChanged'); 
    	thisForm.$setPristine();
    	thisForm.$setUntouched();
    };

    this.showUpdate = function(type){
    	thisSettings.changed = type;
    };

    this.showError = function(type){
    	if (type === 'oldPasswordFail') {
	    	thisSettings.errorText = 'The password you entered is incorrect. Please try again.';
    	}
    	else if (type === false) {
    		thisSettings.errorText = type ;
    	}
    };

	$scope.submitChange = function(thisForm,type) {
		// check to make sure the form is completely valid
		if (thisForm.$valid) {
			thisSettings.saveData(thisForm);
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
		if (thisSettings.setNewPassword.oldOne !== thisSettings.userDetails.password.value) {
			thisSettings.showError('oldPasswordFail');
			thisSettings.showUpdate(false);
			thisSettings.cancelChange(thisForm, 'error');
		}
		else{
			if (thisForm.$valid) {
				thisSettings.userDetails.password.value = thisSettings.setNewPassword.newOne;
				thisSettings.userDetails.password.lastUpdate = Date.now();
				thisSettings.saveData(thisForm);
				thisSettings.showUpdate('password');

			}
		}

		thisSettings.emptyPasswordFields();
	};
    this.cancelChange = function(thisForm){
    	thisSettings.cancelData(thisForm);
    	thisSettings.setState('viewing', 'explicit');
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
                scope.$watch(attrs.oupFocus, function ( ) {
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