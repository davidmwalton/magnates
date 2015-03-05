(function () {
    'use strict';

    // This is meant to be an example of a "better" way to structure controllers.
    // Should try to implement cleanup on the other controllers at some point.
    // https://github.com/johnpapa/angular-styleguide

    angular
        .module('magnatesControllers')
        .controller('ContinueController', ContinueController);

    ContinueController.$inject = ['$scope', '$routeParams', 'gamePersistenceService'];

    function ContinueController($scope, $routeParams, gamePersistenceService) {
        var vm = this;

        vm.name = 'Continue Controller';
        vm.game = gamePersistenceService.getCurrentGameConfig();
    };
})();
