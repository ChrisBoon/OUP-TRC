'use strict';

angular.module('trcApp')
  .controller('SignInCtrl', function ($scope, getJSON, localStorageService, $location) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

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


    //store variable ref to this for easy reference
    // var thisPage = this;
    var thisPage = this;
    // add hook for json
    thisPage.json = {};
    getJSON.JSONbyPath()
    .then(function(d) {
      thisPage.json = d;
    });
 
    this.logMeIn = function(){
    	var credentials = localStorageService.get('settingsChanged');
    	if (credentials.email === thisPage.signInAttempt.email  && credentials.password.value === thisPage.signInAttempt.password) {
    		console.log('ya');
    		$location.path('/');
    	}
    	else{
    		thisPage.signInAttempt.email = '';
    		thisPage.signInAttempt.password = '';
    		thisPage.signInAttempt.error = 'We didn\'t recognize your details. Please try again.';
    		$scope.isRetry = true;
    	}
    };

    this.dontIncludeThisFunctionItsJustForThePrototype = function(){
    	var credentials = localStorageService.get('settingsChanged');
    	var text = 'username: ' + credentials.email + ', password: ' + credentials.password.value;
    	window.alert(text);
    };
  })

  //using this directive to refocus on email field when login fails.
  .directive('focusMe', function($timeout, $parse) {
  return {
    link: function(scope, element, attrs) {
      var model = $parse(attrs.focusMe);
      scope.$watch(model, function(value) {
        if(value === true) { 
          $timeout(function() {
            element[0].focus(); 
          });
        }
      });
      element.bind('blur', function() {
        scope.$apply(model.assign(scope, false));
      });
    }
  };
});