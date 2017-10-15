'use strict';

angular.module('genderWageTable.chartView', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/chartView', {
            templateUrl: 'chartView/chartView.html',
            controller: 'ChartViewCtrl as gt'
        });
    }])

    .controller('ChartViewCtrl', [
        'dataService',
        function (dataService) {

            var gt = this;
            gt.mapRecordToObject = function (record) {
                var columns = [
                        'jobtitle',
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
                return output;
            };
            gt.gridOptions = {
                columnDefs: [
                    {headerName: "Job Title", field: "jobtitle", pinned: "left"},
                    {
                        headerName: "Women", groupId: "femaleFields",
                        children: [
                            {
                                headerName: "Average Hourly Rate",
                                field: "fAvgRate",
                                type: "numberColumn",
                                width: 150
                            },
                            {
                                headerName: "Number of Employees",
                                field: "fEmpNum",
                                type: "numberColumn",
                                width: 150
                            },
                            {
                                headerName: "Average Months Longevity in Classification",
                                field: "fAvgLongevity",
                                type: "numberColumn",
                                width: 150
                            }
                        ]
                    },
                    {
                        headerName: "Men", groupId: "maleFields",
                        children: [
                            {headerName: "Average Hourly Rate", field: "mAvgRate", type: "numberColumn"},
                            {headerName: "Number of Employees", field: "mEmpNum", type: "numberColumn"},
                            {
                                headerName: "Average Months Longevity in Classification",
                                field: "mAvgLongevity",
                                type: "numberColumn"
                            }
                        ]
                    },
                    {
                        headerName: "Total", groupId: "totalFields",
                        children: [
                            {headerName: "Average Hourly Rate", field: "totalAvgRate", type: "numberColumn"},
                            {headerName: "Number of Employees", field: "totalEmpNum", type: "numberColumn"},
                            {
                                headerName: "Average Months Longevity in Classification",
                                field: "totalAvgLongevity",
                                type: "numberColumn"
                            }
                        ]
                    },
                    {
                        headerName: "Ratio of Women's Hourly Rate to Men's Hourly Rate",
                        field: "ratio",
                        type: "percentage"
                    },
                    {headerName: "Notes", field: "notes"}
                ],

                // default ColDef, gets applied to every column
                defaultColDef: {
                    // set the default column width
                    width: 150,
                    // make every column editable
                    editable: false,
                    // make every column use 'text' filter by default
                    filter: 'text'
                },

                // default ColGroupDef, get applied to every column group
                defaultColGroupDef: {
                    marryChildren: true
                },

                // define specific column types
                columnTypes: {
                    "numberColumn": {width: 83, filter: 'number'},
                },
                rowData: null,
                enableFilter: true,
                floatingFilter: true,
                pagination: true,
                paginationPageSize: 25
            };
            gt.gridDiv = document.querySelector('#genderTable');

            Promise.resolve(dataService).then(function (response) {
                gt.data = _.map(response.data.data, gt.mapRecordToObject);
                gt.grid = new agGrid.Grid(gt.gridDiv, gt.gridOptions);
                gt.gridOptions.api.setRowData(gt.data);
            })
        }]);