'use strict';
import '../../app/js/app';
import 'angular-mocks';

/* jasmine specs for filters go here */

describe('filter', function() {

  beforeEach(angular.mock.module('phonecatFilters'));


  describe('checkmark', function() {

    it('should convert boolean values to unicode checkmark or cross',
        inject(function(checkmarkFilter) {
      expect(checkmarkFilter(true)).toBe('\u2713');
      expect(checkmarkFilter(false)).toBe('\u2718');
    }));
  });
});
