'use strict';

/* Services */
var factoryServices = angular.module('factoryServices', ['ngResource']);

var pServices = angular.module('factoryServices', ['ngResource']);

pServices.factory('Factory', ['$resource',
  function($resource){
    return $resource('factory', {}, {
      query: {method:'GET', params:{}, isArray:false}
    });
  }]);