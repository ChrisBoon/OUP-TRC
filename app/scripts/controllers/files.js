'use strict';

angular.module('trcApp')
  .controller('FilesCtrl', function ($scope, $http, $routeParams, getJSON, $uibModal) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    //store variable ref to this for easy reference
    var thisPage = this;
    // add hook for json
    thisPage.json = {};

    //placeholder to put filter data to separate variable as we'll be binding this
    this.filter = '';

    this.sort = {};

    this.oneList = [];

    getJSON.allJSON()
    .then(function(d) {
      thisPage.json = d;
    })

    
    .then(function(){
      thisPage.filter = thisPage.json.filter;
      thisPage.sort.by = thisPage.json.sort;
      thisPage.sort.setAs = thisPage.sort.by[0];
      thisPage.fileList = [];
      if (thisPage.json.hasUnits === true) {
        thisPage.fileList = thisPage.json.unitList;
      }
      else{
        thisPage.fileList = thisPage.json.assetList;
      }
      var oneList = function(){
        var tempList = [];
        for (var i = 0; i < thisPage.fileList.length; i++) {
          for (var j = 0; j < thisPage.fileList[i].fileList.length; j++) {
            tempList.push(thisPage.fileList[i].fileList[j]);
          }
        }
        return tempList;
      };
      thisPage.oneList = oneList();


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



    

  })

.controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, longText) {
  var myModal = this;
  myModal.longText = longText;

  myModal.ok = function () {
    $uibModalInstance.close();
  };


});

