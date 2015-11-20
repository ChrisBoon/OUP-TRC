'use strict';

describe('MainCtrl', function() {
  var scope;

  beforeEach(function(){
    module('trcApp');

    inject(function($controller, $rootScope) {
      scope = $rootScope.$new();
      var localInjections = {
        $scope: scope,
      };
      $controller('MainCtrl as home', localInjections);
    });
  });

  it('should show the welcome message on first view', function() {
    expect(scope.home.showWelcome).toBe(true);
  });

});