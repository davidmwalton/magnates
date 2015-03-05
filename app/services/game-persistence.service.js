(function () {
    'use strict';

    // This is meant to be an example of a "better" way to structure services.
    // Should try to implement cleanup on the other services at some point.
    // https://github.com/johnpapa/angular-styleguide

    angular
        .module('magnatesServices')
        .service('gamePersistenceService', gamePersistenceService);

    gamePersistenceService.$inject = ['guidHelperService'];

    function gamePersistenceService(guidHelperService) {

        this.setCurrentGameConfig = setCurrentGameConfig;
        this.saveGameConfig = saveGameConfig;
        this.loadGames = loadGames;
        this.getCurrentGameConfig = getCurrentGameConfig;

        return this;

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
                gameConfig.id = guidHelperService.generateNewHashKey();
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
    }



})();
