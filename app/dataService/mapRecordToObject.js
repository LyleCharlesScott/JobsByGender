'use strict';

angular.module('genderWageTable.mapRecordToObject', ['ngRoute'])

.service('mapRecordToObject', [function(){
        return function(record) {
            var columns = [
                    'jobTitle',
                    'fAvgRate', 'fEmpNum', 'fAvgLongevity',
                    'mAvgRate', 'mEmpNum', 'mAvgLongevity',
                    'totalAvgRate', 'totalEmpNum', 'totalAvgLongevity',
                    'ratio', 'notes'
                ],
                output = {};

            record = _.drop(record, 8);
            _.forEach(record, function (val, i) {
                output[columns[i]] = val;
            });
            if (output.fAvgRate && output.mAvgRate) {
                output.difference = Math.abs(parseFloat(_.round(output.fAvgRate - output.mAvgRate, 2).toFixed(2)));
            } else {
                output.difference = null;
            }

            return output;
        };
}]);