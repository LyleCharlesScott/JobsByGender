'use strict';

angular.module('genderWageTable.gridOptions', ['ngRoute'])

    .service('gridOptions', [function () {
        return {
            "full": {
                columnDefs: [
                    {headerName: "Job Title", field: "jobtitle", pinned: "left"},
                    {
                        headerName: "Women", groupId: "femaleFields",
                        children: [
                            {
                                headerName: "Average Hourly Rate",
                                field: "fAvgRate",
                                type: "hourlyRate"
                            },
                            {
                                headerName: "Number of Employees",
                                field: "fEmpNum",
                                type: "numberOfEmployees"
                            },
                            {
                                headerName: "Average Months Longevity in Classification",
                                field: "fAvgLongevity",
                                type: "longevity"
                            }
                        ]
                    },
                    {
                        headerName: "Men", groupId: "maleFields",
                        children: [
                            {headerName: "Average Hourly Rate", field: "mAvgRate", type: "hourlyRate"},
                            {headerName: "Number of Employees", field: "mEmpNum", type: "numberOfEmployees"},
                            {
                                headerName: "Average Months Longevity in Classification",
                                field: "mAvgLongevity",
                                type: "longevity"
                            }
                        ]
                    },
                    {
                        headerName: "Total", groupId: "totalFields",
                        children: [
                            {headerName: "Average Hourly Rate", field: "totalAvgRate", type: "hourlyRate"},
                            {headerName: "Number of Employees", field: "totalEmpNum", type: "numberOfEmployees"},
                            {
                                headerName: "Average Months Longevity in Classification",
                                field: "totalAvgLongevity",
                                type: "longevity"
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
                defaultColDef: {
                    width: 150,
                    editable: false,
                    filter: 'text'
                },
                defaultColGroupDef: {
                    marryChildren: true
                },
                columnTypes: {
                    "hourlyRate": {width: 146, filter: 'number'},
                    "longevity": {width: 200, filter: 'number'},
                    "numberOfEmployees": {width: 157, filter: 'number'},
                    "percentage": {width: 150, filter: 'percentage'}
                },
                rowData: null,
                enableFilter: true,
                floatingFilter: true,
                pagination: true,
                paginationPageSize: 25
            },
            partial: {
                columnDefs: [
                    {headerName: "Job Title", field: "jobtitle", pinned: "left"},
                    {
                        headerName: "Women's Average Hourly Rate",
                        field: "fAvgRate",
                        type: "hourlyRate"
                    },
                    {
                        headerName: "Men's Average Hourly Rate",
                        field: "mAvgRate",
                        type: "hourlyRate"
                    },
                    {
                        headerName: "Difference",
                        field: "difference",
                        type: "hourlyRate"
                    }
                    ],
                defaultColDef: {
                    width: 150,
                    editable: false,
                    filter: 'text'
                },
                defaultColGroupDef: {
                    marryChildren: true
                },
                columnTypes: {
                    "hourlyRate": {minWidth: 146, filter: 'number'},
                    "difference": {minWidth: 200, filter: 'number'}
                },
                rowData: null,
                enableFilter: true,
                floatingFilter: true,
                pagination: true,
                paginationPageSize: 25
            }
        };
    }
    ]);