'use strict';

angular.module('genderWageTable.mapRecordToObject', ['ngRoute'])

    .service('mapRecordToObject', [function () {
        return function (record) {
            var columns = [
                    'jobTitle',
                    'fAvgRate', 'fEmpNum', 'fAvgLongevity',
                    'mAvgRate', 'mEmpNum', 'mAvgLongevity',
                    'totalAvgRate', 'totalEmpNum', 'totalAvgLongevity',
                    'ratio', 'notes'
                ],
                row = {};

            record = _.drop(record, 8);
            _.forEach(record, function (val, i) {
                row[columns[i]] = val;
            });
            if (row.fAvgRate && row.mAvgRate) {
                row.difference = Math.abs(parseFloat(_.round(row.fAvgRate - row.mAvgRate, 2).toFixed(2)));
            } else {
                row.difference = null;
            }

            return row;
        };
    }]);