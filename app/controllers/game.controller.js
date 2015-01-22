(function () {
    'use strict';

    var magnatesControllers = angular.module('magnatesControllers'),

        enableTutorial = function () {
            var $scope = this;

            $scope.currentGameConfig.tutorialEnabled = true;
        },

        disableTutorial = function () {
            var $scope = this;

            $scope.currentGameConfig.tutorialEnabled = false;
        },

        controller = function ($scope, $routeParams, gamePersistenceService) {
            $scope.name = 'Game Controller';
            $scope.pageId = $routeParams.pageId;

            $scope.enableTutorial = enableTutorial.bind($scope);
            $scope.disableTutorial = disableTutorial.bind($scope);

            $scope.currentGameConfig = gamePersistenceService.getCurrentGameConfig();

            if ($scope.pageId === '' || $scope.pageId === undefined || $scope.pageId === null) {
                $scope.pageId = 'Home';
            }
        };

    magnatesControllers.controller('GameCtrl', ['$scope', '$routeParams', 'gamePersistenceService', controller]);
})();
