'use strict';

angular.module('genderWageTable', [
    'ngRoute',
    'genderWageTable.chartView',
    'genderWageTable.version',
    'genderWageTable.SeattleCityConnectionService'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/chartView'});
}]);
