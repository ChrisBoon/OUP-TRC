'use strict';

/**
 * @ngdoc filter
 * @name trcApp.filter:filterSearch
 * @function
 * @description
 * # filterSearch
 * Filter in the trcApp.
 */
angular.module('trcApp')
    .filter('filterSearch', function () {
	    return function(assetList, userChoseThese, jsonToFilter) {
		    if	(userChoseThese.length === 0){
		    	return assetList;
		    }
	        return assetList.filter(function(item) {

	            for (var i in item[jsonToFilter]) {
	                if (userChoseThese.indexOf(item[jsonToFilter][i]) !== -1) {
	                    return true;
	                }
	            }
	            return false;

	        });
	    };
    });
