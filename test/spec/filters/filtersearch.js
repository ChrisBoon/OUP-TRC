'use strict';

describe('Filter: filterSearch', function () {

  // load the filter's module
  beforeEach(module('trcApp'));

  // initialize a new instance of the filter before each test
  var filterSearch;
  beforeEach(inject(function ($filter) {
    filterSearch = $filter('filterSearch');
  }));

  it('should return the input prefixed with "filterSearch filter:"', function () {
    var text = 'angularjs';
    expect(filterSearch(text)).toBe('filterSearch filter: ' + text);
  });

});
