'use strict';

describe('Controller: FoldersCtrl', function () {

  // load the controller's module
  beforeEach(module('trcApp'));

  var FoldersCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    FoldersCtrl = $controller('FoldersCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(FoldersCtrl.awesomeThings.length).toBe(3);
  });
});
