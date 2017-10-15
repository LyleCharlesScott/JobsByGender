'use strict';

angular.module('genderWageTable.SeattleCityConnectionService', ['ngRoute'])

.service('dataService',["$http", function($http){
    return $http({
        method: 'GET',
        url: 'https://data.seattle.gov/api/views/cf52-s8er/rows.json?api_key=SCC1c0Cove7ypmBeuf3dTX2WZOk6\n' +
        'qEfCAki6MoNi'
    }).then(function successCallback(response) {
        return response
    }, function errorCallback(response) {
        console.log(response);
    });
}]);