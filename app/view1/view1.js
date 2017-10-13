'use strict';

angular.module('myApp.view1', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/view1', {
            templateUrl: 'view1/view1.html',
            controller: 'View1Ctrl'
        });
    }])

    .controller('View1Ctrl', [
        '$http',
        function ($http) {

            $http({
                method: 'GET',
                url: 'https://data.seattle.gov/api/views/cf52-s8er/rows.json?api_key=SCC1c0Cove7ypmBeuf3dTX2WZOk6\n' +
                'qEfCAki6MoNi'
            }).then(function successCallback(response) {
                console.log(response.data.data);
            }, function errorCallback(response) {
                console.log(response);
            });

        }]);