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
            cv.currencyRegExp = /(?=.)^\$?(([1-9][0-9]{0,2}(,[0-9]{3})*)|[0-9]+)?(\.[0-9]{1,2})?$/;
            cv.pageSize = 25;
            cv.currentPageNumber = 1;
            cv.minimumDifference = 0;

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

            cv.earnsMore = function (gender) {
                if (cv.currentGender === gender) {
                    cv.currentGender = null;
                    cv.data = cv.originalData;
                    return cv.paginate(cv.originalData, cv.currentPageNumber);
                } else {
                    cv.currentGender = gender;
                }
                if (gender === "men") {
                    gender = -1
                }
                if (gender === "women") {
                    gender = 1
                }
                cv.data = _.filter(cv.originalData, function (row) {
                    return Math.sign(row.difference) === gender;
                });
                cv.paginate(cv.data, 1);
            };

            cv.filterMinimum = function(){
                cv.data = _.filter(cv.originalData, function(row){
                    return Math.abs(row.difference) >= cv.minimumDifference;
                });
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
        }])
;