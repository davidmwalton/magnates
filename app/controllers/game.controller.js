(function () {
    'use strict';

    var magnatesControllers = angular.module('magnatesControllers'),

        controller = function ($scope, $routeParams, gamePersistenceService) {
            $scope.name = 'Game Controller';
            $scope.pageId = $routeParams.pageId;

            $scope.currentGameConfig = gamePersistenceService.getCurrentGameConfig();

            if ($scope.pageId === '' || $scope.pageId === undefined || $scope.pageId === null) {
                $scope.pageId = 'Home';
            }
        };

    magnatesControllers.controller('GameCtrl', ['$scope', '$routeParams', 'gamePersistenceService', controller]);
})();
