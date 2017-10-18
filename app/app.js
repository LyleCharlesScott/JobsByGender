'use strict';

angular.module('genderWageTable', [
    'ngRoute',
    'genderWageTable.gridOptions',
    'genderWageTable.agGridView',
    'genderWageTable.customView',
    'genderWageTable.version',
    'genderWageTable.SeattleCityConnectionService',
    'genderWageTable.mapRecordToObject'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/agGridView'});
}]).
filter('makePositive', function() {
    return function(num) { return Math.abs(num); }
});
