(function () {
    'use strict';

    var magnatesControllers = angular.module('magnatesControllers'),

        loadGame = function (game) {
            var $scope = this;
            $scope.gamePersistenceService.setCurrentGameConfig(game);

            return true;
        },

        controller = function ($scope, $routeParams, gamePersistenceService) {
            $scope.name = 'Load Controller';
            $scope.gamePersistenceService = gamePersistenceService;
            $scope.savedGames = gamePersistenceService.loadGames();
            $scope.loadGame = loadGame.bind($scope);
        };

    magnatesControllers.controller('LoadCtrl', ['$scope', '$routeParams', 'gamePersistenceService', controller]);
})();
