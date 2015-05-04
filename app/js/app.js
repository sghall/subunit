'use strict';
import angular from 'angular';
import 'angular-route';
import './animations';
import './controllers';
import './directives';
import './filters';
import './services';
import phoneListTpl from '../partials/phone-list.html!text';
import phoneDetailTpl from '../partials/phone-detail.html!text';

/* App Module */

export default angular.module('phonecatApp', [
  'ngRoute',
  'phonecatAnimations',
  'phonecatDirectives',
  'phonecatControllers',
  'phonecatFilters',
  'phonecatServices'
]).config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/phones', {
        template: phoneListTpl,
        controller: 'PhoneListCtrl',
        controllerAs: 'listCtrl'
      }).
      when('/phones/:phoneId', {
        template: phoneDetailTpl,
        controller: 'PhoneDetailCtrl',
        controllerAs: 'detailCtrl'
      }).
      otherwise({
        redirectTo: '/phones'
      });
  }]);
