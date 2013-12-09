'use strict';

/* App Module */

var factory2013App = angular.module('factory2013App', [
  'ngRoute',
  'factoryAnimations',

  'factoryControllers',
  'factoryFilters',
  'factoryServices'
]);

factory2013App.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/factory', {
        templateUrl: 'partials/list2.html',
        controller: 'JsonCtrl'
      }).
      otherwise({
        redirectTo: '/factory'
      });
  }]);
