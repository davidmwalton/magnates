(function () {
    'use strict';

    angular
        .module('magnatesControllers')
        .controller('CreateController', CreateController);

    CreateController.$inject = ['$scope', '$routeParams', 'gamePersistenceService', 'gameFactory'];
    

    function CreateController($scope, $routeParams, gamePersistenceService, gameFactory) {
        var vm = this;

        vm.gamePersistenceService = gamePersistenceService;
        vm.gameFactory = gameFactory;
        vm.onPlayClicked = onPlayClicked.bind(vm);
        vm.enableTutorial = true;
    }

    function getGameConfig(vm) {
        var gameConfig = new vm.gameFactory(vm);

        return gameConfig;
    }

    function onPlayClicked() {
        var vm = this,
            gameConfig = getGameConfig(vm);

        vm.gamePersistenceService.saveGameConfig(gameConfig);
        vm.gamePersistenceService.setCurrentGameConfig(gameConfig);

        return true;
    }


})();
