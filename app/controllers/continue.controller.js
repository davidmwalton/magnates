(function () {
    'use strict';

    var magnatesControllers = angular.module('magnatesControllers'),

        controller = function ($scope, $routeParams) {
            $scope.name = 'Continue Controller';
        };

    magnatesControllers.controller('ContinueCtrl', ['$scope', '$routeParams', controller]);
})();
