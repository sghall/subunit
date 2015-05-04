'use strict';
import '../../app/js/app';
import 'angular-mocks';


/* jasmine specs for controllers go here */
describe('PhoneCat controllers', function() {

  beforeEach(function(){
    this.addMatchers({
      toEqualData: function(expected) {
        return angular.equals(this.actual, expected);
      }
    });
  });

  beforeEach(angular.mock.module('phonecatApp'));
  beforeEach(angular.mock.module('phonecatServices'));

  describe('PhoneListCtrl', function(){
    var ctrl, $httpBackend;

    beforeEach(inject(function(_$httpBackend_, $controller) {
      $httpBackend = _$httpBackend_;
      $httpBackend.expectGET('phones/phones.json').
          respond([{name: 'Nexus S'}, {name: 'Motorola DROID'}]);

      ctrl = $controller('PhoneListCtrl');
    }));


    it('should create "phones" model with 2 phones fetched from xhr', function() {
      expect(ctrl.phones).toEqualData([]);
      $httpBackend.flush();

      expect(ctrl.phones).toEqualData(
          [{name: 'Nexus S'}, {name: 'Motorola DROID'}]);
    });


    it('should set the default value of orderProp model', function() {
      expect(ctrl.orderProp).toBe('age');
    });
  });


  describe('PhoneDetailCtrl', function(){
    var $httpBackend, ctrl,
        xyzPhoneData = () => ({
          name: 'phone xyz',
          images: ['image/url1.png', 'image/url2.png']
        });


    beforeEach(inject(function(_$httpBackend_, $routeParams, $controller) {
      $httpBackend = _$httpBackend_;
      $httpBackend.expectGET('phones/xyz.json').respond(xyzPhoneData());

      $routeParams.phoneId = 'xyz';
      ctrl = $controller('PhoneDetailCtrl');
    }));


    it('should fetch phone detail', function() {
      expect(ctrl.phone).toEqualData({});
      $httpBackend.flush();

      expect(ctrl.phone).toEqualData(xyzPhoneData());
    });
  });
});
