(function () {
    'use strict';

    var magnatesControllers = angular.module('magnatesControllers'),

        controller = function ($scope, $routeParams) {
            $scope.name = 'Credits Controller';
        };

    magnatesControllers.controller('CreditsCtrl', ['$scope', '$routeParams', controller]);
})();
