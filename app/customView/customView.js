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

            gc.earnsMore = function (gender) {
                console.log(gc.currentGender === gender);
                if (gc.currentGender === gender) {
                    gc.currentGender = null;
                    return gc.paginate(gc.originalData, gc.currentPageNumber);
                } else {
                    gc.currentGender = gender;
                }
                if (gender === "men") {
                    gender = -1
                }
                if (gender === "women") {
                    gender = 1
                }
                gc.data = _.filter(gc.originalData, function (row) {
                    return Math.sign(row.difference) === gender;
                });
                gc.paginate(gc.data, gc.currentPageNumber);
                console.log(gc.data);

            };

            if (!gc.data) {
                Promise.resolve(dataService).then(function (response) {
                    gc.data = _.map(response.data.data, mapRecordToObject);
                    gc.data.pop();
                    console.log(gc.data);
                    gc.originalData = gc.data;
                    gc.paginate(gc.data, 1);
                    $scope.$apply();
                });
            }
        }])
;