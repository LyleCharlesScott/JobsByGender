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
            cv.minimumDifference = '';
            cv.genderGlossery = {men: -1, women: 1};
            cv.currentGender = 'none';
            cv.toggle = {
                mAvgRate: false,
                fAvgRate: false,
                difference: false,
                jobTitle: false
            };
            cv.numberColumn = ['fAvgRate', 'mAvgRate', 'difference'];
            cv.textColumn = ['jobTitle'];

            cv.paginate = function (page) {
                cv.currentPageNumber = page;
                page--;
                return cv.currentPageData = cv.data.slice(page * cv.pageSize, (page + 1) * cv.pageSize);
            };

            cv.first = function () {
                return cv.goToPage(1);
            };

            cv.previous = function () {
                if (cv.currentPageNumber > 1) {
                    cv.currentPageNumber--
                }
                cv.goToPage(cv.currentPageNumber);
            };

            cv.next = function () {
                if (cv.currentPageNumber < cv.totalPages()) {
                    cv.currentPageNumber++;
                }
                cv.goToPage(cv.currentPageNumber);
            };

            cv.last = function () {
                return cv.goToPage(cv.totalPages());
            };

            cv.goToPage = function (page) {
                return cv.paginate(page);
            };

            cv.changePageSize = function (num) {
                cv.pageSize = num;
                return cv.goToPage(1);
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

            cv.sortNumberColumn = function (column) {
                cv.toggle[column] = !cv.toggle[column];
                cv.data = _.orderBy(cv.data, [function (row) {
                    if (_.isNull(row[column])) {
                        return cv.toggle[column] ? 'z' : -1;
                    } else {
                        return parseFloat(row[column]);
                    }

                }], (cv.toggle[column] ? 'asc' : 'desc'));
                return cv.goToPage(1);
            };

            cv.sortTextColumn = function (column) {
                cv.toggle[column] = !cv.toggle[column];
                cv.data = _.orderBy(cv.data, [column], (cv.toggle[column] ? 'asc' : 'desc'));
                cv.currentPageNumber = 1;
                return cv.goToPage(1);
            };

            cv.genderFilter = function () {
                var dataToFilter = (cv.data.length === cv.originalData.length) ? cv.data : cv.originalData;
                if (cv.currentGender === 'none') {
                    return dataToFilter;
                } else {
                    return _.filter(dataToFilter, function (row) {
                        return Math.sign(row.difference) === cv.genderGlossery[cv.currentGender];
                    });
                }
            };

            cv.filterMinimum = function (data) {
                return _.filter(data, function (row) {
                    return Math.abs(row.difference) >= cv.minimumDifference;
                });
            };

            cv.applyFilters = function (newGender) {
                if (newGender) {
                    cv.updateCurrentGender(newGender);
                }
                cv.data = cv.genderFilter();
                cv.data = cv.filterMinimum(cv.data);
                return cv.goToPage(1);
            };

            cv.initializeColumns = function () {
                _.forEach(cv.numberColumn,
                    function (column) {
                        cv.sortNumberColumn(column);
                    });
                _.forEach(cv.textColumn,
                    function (column) {
                        cv.sortTextColumn(column);
                    });
            };

            if (!cv.data) {
                Promise.resolve(dataService).then(function (response) {
                    cv.data = _.map(response.data.data, mapRecordToObject);
                    cv.data.pop();
                    cv.originalData = cv.data;
                    cv.initializeColumns();
                    cv.goToPage(1);
                    $scope.$apply();
                });
            }
        }]);