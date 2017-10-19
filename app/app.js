'use strict';

angular.module('genderWageTable', [
    'ngRoute',
    'genderWageTable.customView',
    'genderWageTable.SeattleCityConnectionService',
    'genderWageTable.mapRecordToObject'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/customView'});
}]).
filter('makePositive', function() {
    return function(num) { return Math.abs(num); }
});
