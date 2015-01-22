(function () {
    'use strict';

    var scope = {};

    function service(guidHelperService) {
        scope.guidHelperService = guidHelperService;

        this.setCurrentGameConfig = setCurrentGameConfig;
        this.saveGameConfig = saveGameConfig;
        this.loadGames = loadGames;
        this.getCurrentGameConfig = getCurrentGameConfig;

        return this;
    }

    function loadGames() {
        var savedGames = JSON.parse(window.localStorage.getItem('savedGames'));

        if (!savedGames) {
            savedGames = {};
        }

        return savedGames;
    }

    function saveGameConfig(gameConfig) {
        var savedGames = loadGames();

        if (!gameConfig.id) {
            gameConfig.id = scope.guidHelperService.generateNewHashKey();
        }

        savedGames[gameConfig.id] = gameConfig;

        window.localStorage.setItem('savedGames', JSON.stringify(savedGames));
    }

    function setCurrentGameConfig(gameConfig) {
        window.localStorage.setItem('currentGameConfig', JSON.stringify(gameConfig));
    }

    function getCurrentGameConfig() {
        return JSON.parse(window.localStorage.getItem('currentGameConfig'));
    }


    angular.module('magnatesServices').service('gamePersistenceService', ['guidHelperService', service]);
})();
