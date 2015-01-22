(function () {
    'use strict';

    var getGameConfig = function ($scope) {
            var gameConfig = new $scope.gameFactory($scope);

            return gameConfig;
        },

        onPlayClicked = function () {
            var $scope = this,
                gameConfig = getGameConfig($scope);

            $scope.gamePersistenceService.saveGameConfig(gameConfig);
            $scope.gamePersistenceService.setCurrentGameConfig(gameConfig);

            return true;
        },

        controller = function ($scope, $routeParams, gamePersistenceService, gameFactory) {
            $scope.gamePersistenceService = gamePersistenceService;
            $scope.gameFactory = gameFactory;
            $scope.onPlayClicked = onPlayClicked.bind($scope);
            $scope.enableTutorial = true;
        };

    controller['$inject'] = ['$scope', '$routeParams', 'gamePersistenceService', 'gameFactory']
    angular.module('magnatesControllers').controller('CreateCtrl', controller);
})();
