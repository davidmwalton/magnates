(function () {
    'use strict';

    var magnatesServices = angular.module('magnatesServices'),

        scope = {},

        loadGames = function () {
            var savedGames = JSON.parse(window.localStorage.getItem('savedGames'));

            if (!savedGames) {
                savedGames = {};
            }

            return savedGames;
        },

        saveGameConfig = function (gameConfig) {
            var savedGames = loadGames();

            if (!gameConfig.id) {
                gameConfig.id = scope.guidHelperService.generateNewHashKey();
            }

            savedGames[gameConfig.id] = gameConfig;

            window.localStorage.setItem('savedGames', JSON.stringify(savedGames));
        },

        setCurrentGameConfig = function (gameConfig) {
            window.localStorage.setItem('currentGameConfig', JSON.stringify(gameConfig));
        },

        getCurrentGameConfig = function () {
            return JSON.parse(window.localStorage.getItem('currentGameConfig'));
        },

        service = function (guidHelperService) {
            var service = {};

            scope.guidHelperService = guidHelperService;

            service.setCurrentGameConfig = setCurrentGameConfig;
            service.saveGameConfig = saveGameConfig;
            service.loadGames = loadGames;
            service.getCurrentGameConfig = getCurrentGameConfig;

            return service;
        };

    magnatesServices.factory('gamePersistenceService', ['guidHelperService', service]);
})();
