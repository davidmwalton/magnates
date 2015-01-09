(function () {
    'use strict';

    var magnatesControllers = angular.module('magnatesControllers'),

        controller = function ($scope, $routeParams) {
            $scope.name = 'Create Controller';
        };

    magnatesControllers.controller('CreateCtrl', ['$scope', '$routeParams', controller]);
})();
