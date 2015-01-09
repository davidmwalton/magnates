(function () {
    'use strict';

    var magnatesControllers = angular.module('magnatesControllers'),

        controller = function ($scope, $routeParams) {
            $scope.name = 'Load Controller';
        };

    magnatesControllers.controller('LoadCtrl', ['$scope', '$routeParams', controller]);
})();
