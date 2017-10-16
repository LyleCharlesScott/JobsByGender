'use strict';

angular.module('genderWageTable.customView', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/customView', {
            templateUrl: 'customView/customView.html',
            controller: 'customViewCtrl as cv'
        });
    }])

    .controller('customViewCtrl', [
        'dataService',
        'mapRecordToObject',
        function (dataService, mapRecordToObject) {

            var gc = this;
            Promise.resolve(dataService).then(function (response) {
                gc.data = _.map(response.data.data, mapRecordToObject);
            });


            console.log(gc);
        }]);