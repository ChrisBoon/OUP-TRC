'use strict';

//controller for Header element

angular.module('trcApp')
  .controller('HeaderCtrl', ['$scope', '$location', function($scope, $location) {

  	$scope.$location = $location;

  	//sets class on branding element to adjust styling depnding on current view
  	//probably want to move this to a servce or directive or something
  	$scope.locationClass = function (){
  		var locationString = $location.path();
  		if (locationString === '/'){
  			return 'home';
  		}
  		else{
  			return 'page';
  		}
  	};

	$scope.openOtherStuffNav = {"open":false};

  	//defines content of dropdown on hamburger
    $scope.otherStuff = [
      {
      	'text': 'Help',
      	'link': '/help'
      },
      {
      	'text': 'Settings',
      	'link': '/settings'
      },
      {
      	'text': 'Sign out',
      	'link': '/sign-out'
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
  }]);