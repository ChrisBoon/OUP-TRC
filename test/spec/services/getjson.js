'use strict';

describe('Service: getJSON', function () {

  // load the service's module
  beforeEach(module('trcApp'));

  // instantiate service
  var getJSON;
  beforeEach(inject(function (_getJSON_) {
    getJSON = _getJSON_;
  }));

  it('should do something', function () {
    expect(!!getJSON).toBe(true);
  });

});
