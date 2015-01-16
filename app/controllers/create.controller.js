(function () {
    'use strict';

    var magnatesControllers = angular.module('magnatesControllers'),

        getGameConfig = function ($scope) {
            var gameConfig = {};

            gameConfig.name = $scope.name;
            gameConfig.gender = $scope.gender;
            gameConfig.complexion = $scope.complexion;
            gameConfig.hairColor = $scope.hairColor;

            return gameConfig;
        },

        onPlayClicked = function () {
            var $scope = this,
                gameConfig = getGameConfig($scope);

            $scope.gamePersistenceService.saveGameConfig(gameConfig);
            $scope.gamePersistenceService.setCurrentGameConfig(gameConfig);

            return true;
        },

        controller = function ($scope, $routeParams, gamePersistenceService) {
            $scope.gamePersistenceService = gamePersistenceService;
            $scope.onPlayClicked = onPlayClicked.bind($scope);
        };

    magnatesControllers.controller('CreateCtrl', ['$scope', '$routeParams', 'gamePersistenceService', controller]);
})();
