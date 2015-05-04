'use strict';
import '../../app/js/app';
import 'angular-mocks';

describe('service', function() {

  // load modules
  beforeEach(angular.mock.module('phonecatApp'));

  // Test service availability
  it('check the existence of Phone factory', inject(function(Phone) {
      expect(Phone).toBeDefined();
    }));
});