'use strict';

/**
 * @ngdoc function
 * @name trcApp.controller:SearchCtrl
 * @description
 * # SearchCtrl
 * Controller of the trcApp
 */
angular.module('trcApp')



  .controller('SearchCtrl', function ($scope, $http, $routeParams, getJSON, $uibModal) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    //store variable ref to this for easy reference
    var thisPage = this;
    // add hook for json
    thisPage.json = {};

	getJSON.allJSON()
    .then(function(d) {
      thisPage.json = d;
    });

    this.filters = {
    	resTypes: [],
    	topics: [],
    	mediaTypes: []

    };

    //for adding and removing elements from filter arrays - 1st arg is the Array/Filter Type, 2nd arg is the tag/option to filter
    this.customFilterMe = function(filterType,filterBy){

    	//DEBUG (array before):
    	console.log(this.filters.resTypes);
    	
    	// Check if ites is already in array:
		if (this.filters[filterType].indexOf(filterBy) > -1) {
		    
		    // If it is in the array, we want to remove it.
		    // Get its position in array:
		    var thisPos = this.filters[filterType].indexOf(filterBy);
		    // Remove it from the array:
		    this.filters[filterType].splice(thisPos, 1);

		} else {
		    //If it's not in the array we want to add it:
		    this.filters[filterType].push(filterBy);
		}

		//DEBUG (array after): 
    	console.log(this.filters.resTypes);


    };

  thisPage.readMore = function () {

    var modalInstance = $uibModal.open({
      animation: true,
      templateUrl: 'myModalContent.html',
      controller: 'ModalInstanceCtrl',
      controllerAs: 'myModal',
      resolve: {
        longText: function () {
          return thisPage.json.descriptionLong;
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    });
  };




  });
