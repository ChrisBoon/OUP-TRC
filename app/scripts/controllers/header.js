'use strict';

//controller for Header element

angular.module('trcApp')
  .controller('HeaderCtrl', ['$scope', '$location', 'getJSON', '$rootScope', function($scope, $location, getJSON, $rootScope) {

  	$scope.$location = $location;

  	//sets class on branding element to adjust styling depnding on current view
  	//probably want to move this to a servce or directive or something
  	$scope.setViewAs = false;
  	$scope.locationClass = function (){
  		var locationString = $location.path();
  		if (locationString === '/'){
  			$scope.setViewAs = 'home';
  		}
  		else if (locationString === '/sign-in'){
  			$scope.setViewAs = 'signIn';
  		}
  		else{
  			$scope.setViewAs = false;
  		}
  	};
  	$scope.$on('$routeChangeSuccess', function () {
	  	$scope.locationClass();
  	});
  	
  	//defines content of dropdown on hamburger
    $scope.otherStuff = [
      {
      	'text': 'Help',
      	'link': '/help'
      },
      {
      	'text': 'Settings',
      	'link': 'settings'
      },
      {
      	'text': 'Sign out',
      	'link': 'sign-in'
      }
    ];

    $scope.footerLinks = [
		{
			'text': 'Privacy Policy',
			'link': '/'
		},
		{
			'text': 'Legal Notice',
		 	'link': '/'
		},
		{
			'text': 'Cookie Policy',
			'link': '/'
		},
		{
			'text': 'Contact Us',
			'link': '/'
		},
		{
			'text': 'Terms and Conditions',
			'link': '/'
		},
		{
			'text': 'Requirements',
			'link': '/'
		},
		{
			'text': 'Accessibility',
			'link': '/'
		},
		{
			'text': 'Acknowledgements',
			'link': '/'
		}
    ];


//this is dumb- need a less hacky way to push data to header
  $scope.$on('$locationChangeStart', function() {
	    getJSON.headerStuff()
	    .then(
	      	function(d) {
		        $rootScope.parentURL = d;
	        },
	        function(){
	        	$rootScope.parentURL = undefined;
	        }

	    );

	});
  }]);
