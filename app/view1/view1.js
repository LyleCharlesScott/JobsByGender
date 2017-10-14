'use strict';

angular.module('myApp.view1', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/view1', {
            templateUrl: 'view1/view1.html',
            controller: 'View1Ctrl as gt'
        });
    }])

    .controller('View1Ctrl', [
        '$http',
        function ($http) {

            var mapRecordToObject = function (record) {
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

            var gt = this;

            var gridOptions = {
                columnDefs: [
                    {headerName: "Job Title", field: "jobtitle"},
                    {
                        headerName: "Women", groupId: "femaleFields",
                        children: [
                            {headerName: "Average Hourly Rate", field: "fAvgRate", type: "numberColumn"},
                            {headerName: "Number of Employees", field: "fEmpNum", type: "numberColumn"},
                            {
                                headerName: "Average Months Longevity in Classification",
                                field: "fAvgLongevity",
                                type: "numberColumn"
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
                    editable: true,
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
                floatingFilter: true
            };
            var gridDiv = document.querySelector('#genderTable');

            $http({
                method: 'GET',
                url: 'https://data.seattle.gov/api/views/cf52-s8er/rows.json?api_key=SCC1c0Cove7ypmBeuf3dTX2WZOk6\n' +
                'qEfCAki6MoNi'
            }).then(function successCallback(response) {
                gt.data = _.map(response.data.data, mapRecordToObject);
                new agGrid.Grid(gridDiv, gridOptions);
                gridOptions.api.setRowData(gt.data);
                return gt.data;
            }, function errorCallback(response) {
                console.log(response);
            });

// setup the grid after the page has finished loading
//             var gridDiv = document.querySelector('#genderTable');
//             new agGrid.Grid(gridDiv, gridOptions);

            // do http request to get our sample data - not using any framework to keep the example self contained.
            // you will probably use a framework like JQuery, Angular or something else to do your HTTP calls.
            // var httpRequest = new XMLHttpRequest();
            // httpRequest.open('GET', 'https://raw.githubusercontent.com/ag-grid/ag-grid-docs/master/src/olympicWinnersSmall.json');
            // httpRequest.send();
            // httpRequest.onreadystatechange = function () {
            //     if (httpRequest.readyState === 4 && httpRequest.status === 200) {
            //         var httpResult = JSON.parse(httpRequest.responseText);
            //         gridOptions.api.setRowData(httpResult);
            //     }
            // };


        }]);