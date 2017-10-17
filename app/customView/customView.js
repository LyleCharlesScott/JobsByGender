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
        '$scope',
        function (dataService, mapRecordToObject, $scope) {

            var gc = this;
            gc.pageSize = 25;
            gc.currentPageNumber = 1;

            gc.paginate = function (data, page) {
                page--;
                gc.currentPageData = data.slice(page * gc.pageSize, (page + 1) * gc.pageSize);
            };
            gc.first = function () {
                gc.currentPageNumber = 1;
                gc.paginate(gc.data, 1);
            };
            gc.back = function () {
                if (gc.currentPageNumber > 1) {
                    gc.currentPageNumber--
                }
                gc.paginate(gc.data, gc.currentPageNumber);
            };
            gc.forward = function () {
                if (gc.currentPageNumber < gc.totalPages()) {
                    gc.currentPageNumber++;
                }
                gc.paginate(gc.data, gc.currentPageNumber);
            };
            gc.last = function () {
                gc.currentPageNumber = gc.totalPages();
                gc.paginate(gc.data, gc.currentPageNumber);
            };

            gc.goToPage = function (page) {
                console.log(page);
                gc.paginate(gc.data, page);
            };

            gc.changePageSize = function (num) {
                gc.currentPageNumber = 1;
                gc.pageSize = num;
                gc.paginate(gc.data, 1);
            };

            gc.totalPages = function () {
                if (gc.data) {
                    return _.ceil(gc.data.length / gc.pageSize);
                } else {
                    return 0;
                }
            };

            if (!gc.data) {
                Promise.resolve(dataService).then(function (response) {
                    gc.data = _.map(response.data.data, mapRecordToObject);
                    gc.data.pop();
                    console.log(gc.data);
                    gc.paginate(gc.data, 1);
                    $scope.$apply();
                });
            }
        }]);