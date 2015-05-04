'use strict';
import angular from 'angular';
import './services';

/* Controllers */

class PhoneListCtrl {
  constructor(Phone) {
    this.phones = Phone.query();
    this.orderProp = 'age';
  }
}
PhoneListCtrl.$inject = ['Phone'];

class PhoneDetailCtrl {
  constructor($routeParams, Phone) {
    this.phone = Phone.get({phoneId: $routeParams.phoneId}, (phone) => {
      this.mainImageUrl = phone.images[0];
    });
  }

  setImage(imageUrl) {
    this.mainImageUrl = imageUrl;
  }
}
PhoneDetailCtrl.$inject = ['$routeParams', 'Phone'];

export default angular.module('phonecatControllers', []).
  controller('PhoneListCtrl', PhoneListCtrl).
  controller('PhoneDetailCtrl', PhoneDetailCtrl);