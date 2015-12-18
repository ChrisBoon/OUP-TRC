'use strict';

angular.module('trcApp')
  .controller('FoldersCtrl', function ($scope, $http, $routeParams, getJSON, $uibModal) {
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
