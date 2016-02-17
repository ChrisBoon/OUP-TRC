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

    //stores the selected tags - powers the filtering:
    this.filters = {
    	resTypes: [],
    	topics: [],
    	mediaTypes: []

    };

    //Keeps track of which accoridon is currently open - used to add 'is-open' class.
    this.dropdowns = {
	    isResTypesOpen: false,
	    isTopicsOpen: false,
	    isMediaTypesOpen: false
	};

    //for adding and removing elements from filter arrays - 1st arg is the Array/Filter Type, 2nd arg is the tag/option to filter
    this.customFilterMe = function(filterType,filterBy){

    	
    	// Check if it is already in array:
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

    };

    this.toggleAll = function(unit){
    	//by default we will assume all are checked and we want to uncheck
    	var toggleTo = 'off';

    	//loop through
    	for (var i in unit.topicList){
    		//if one is missing we actually want to turn it on
    		if ( this.filters.topics.indexOf(unit.topicList[i].search) === -1) {
    			toggleTo = 'on';
    		}

    	}
    	if (toggleTo === 'on') {
    		for (var j in unit.topicList){
    			if (this.filters.topics.indexOf(unit.topicList[j].search) === -1) {
    				this.filters.topics.push(unit.topicList[j].search);
    			}
    		}
    	}
    	else{
    		for (var k in unit.topicList){
	    		if (this.filters.topics.indexOf(unit.topicList[k].search) > -1) {
	    			var thisPos = this.filters.topics.indexOf(unit.topicList[k].search);
					this.filters.topics.splice(thisPos, 1);
				}
			}
    	}
    };

    this.allTopicsActive = function(unit){
    	var count = 0;
    	for (var i in unit.topicList){
    		if (this.filters.topics.indexOf(unit.topicList[i].search) > -1){
    			count++;
    		}
    	}
    	if (count === unit.topicList.length) {
    		return true;
    	}
    };

    this.isTagActive = function(filterType,filterBy){
    	if (this.filters[filterType].indexOf(filterBy) > -1) {
    		return true;
    	}

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
