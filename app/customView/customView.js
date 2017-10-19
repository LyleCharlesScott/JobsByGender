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

            var cv = this;
            cv.pageSize = 25;
            cv.currentPageNumber = 1;
            cv.minimumDifference = 0;
            cv.genderGlossery = {men: -1, women: 1};
            cv.currentGender = 'none';

            cv.paginate = function (data, page) {
                page--;
                cv.currentPageData = data.slice(page * cv.pageSize, (page + 1) * cv.pageSize);
            };
            cv.first = function () {
                cv.currentPageNumber = 1;
                cv.paginate(cv.data, 1);
            };
            cv.previous = function () {
                if (cv.currentPageNumber > 1) {
                    cv.currentPageNumber--
                }
                cv.paginate(cv.data, cv.currentPageNumber);
            };
            cv.next = function () {
                if (cv.currentPageNumber < cv.totalPages()) {
                    cv.currentPageNumber++;
                }
                cv.paginate(cv.data, cv.currentPageNumber);
            };
            cv.last = function () {
                cv.currentPageNumber = cv.totalPages();
                cv.paginate(cv.data, cv.currentPageNumber);
            };

            cv.goToPage = function (page) {
                console.log(page);
                cv.paginate(cv.data, page);
            };

            cv.changePageSize = function (num) {
                cv.currentPageNumber = 1;
                cv.pageSize = num;
                cv.paginate(cv.data, 1);
            };

            cv.totalPages = function () {
                if (cv.data) {
                    return _.ceil(cv.data.length / cv.pageSize);
                } else {
                    return 0;
                }
            };

            cv.updateCurrentGender = function (newGender) {
                if (cv.currentGender === newGender) {
                    cv.currentGender = 'none';
                } else {
                    cv.currentGender = newGender;
                }
            };

            cv.genderFilter = function(){
                if (cv.currentGender === 'none') {
                    return cv.originalData;
                } else {
                    return _.filter(cv.originalData, function (row) {
                        return Math.sign(row.difference) === cv.genderGlossery[cv.currentGender];
                    });
                }
            };

            cv.filterMinimum = function(data){
                return _.filter(data, function(row){
                    return Math.abs(row.difference) >= cv.minimumDifference;
                });
            };

            cv.applyFilters = function (newGender) {
            if (newGender) {
                cv.updateCurrentGender(newGender)
            }
                cv.data = cv.genderFilter();
                cv.data = cv.filterMinimum(cv.data);
                cv.paginate(cv.data, 1);
            };

            if (!cv.data) {
                Promise.resolve(dataService).then(function (response) {
                    cv.data = _.map(response.data.data, mapRecordToObject);
                    cv.data.pop();
                    cv.originalData = cv.data;
                    cv.paginate(cv.data, 1);
                    $scope.$apply();
                });
            }
        }]);