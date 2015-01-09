(function () {
    'use strict';

    var magnatesControllers = angular.module('magnatesControllers'),

        controller = function ($scope, $routeParams) {
            $scope.name = 'Start Menu Controller';
        };

    magnatesControllers.controller('StartMenuCtrl', ['$scope', '$routeParams', controller]);
})();
