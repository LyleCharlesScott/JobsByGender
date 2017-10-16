'use strict';

angular.module('genderWageTable.agGridView', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/agGridView', {
            templateUrl: 'agGridView/agGridView.html',
            controller: 'agGridViewCtrl as ag'
        });
    }])

    .controller('agGridViewCtrl', [
        'dataService',
        'gridOptions',
        'mapRecordToObject',
        function (dataService, gridOptions, mapRecordToObject) {


            var gc = this;
            gc.toggle = true;
            gc.options = gridOptions.full;
            gc.gridDiv = document.querySelector('#genderTable');
            gc.createGrid = function (){
                gc.grid = new agGrid.Grid(gc.gridDiv, gc.gridOptions);
                gc.gridOptions.api.setRowData(gc.data);
            };

            gc.toggleGrid = function (bool) {
                gc.toggle = !gc.toggle;
                gc.gridDiv.innerHTML = '';
                bool ? gc.gridOptions = gridOptions.partial : gc.gridOptions = gridOptions.full;
                if (!gc.data) {
                    Promise.resolve(dataService).then(function (response) {
                        gc.data = _.map(response.data.data, mapRecordToObject);
                        gc.createGrid();
                    });
                } else {
                    gc.createGrid();
                }
            };

            gc.toggleGrid();

        }]);