(function () {
    'use strict';

    angular
        .module('magnatesFactories')
        .factory('gameFactory', gameFactory);

    gameFactory.$inject = [];
    
    function gameFactory() {

        function Game(settings) {
            this.name = settings.name;
            this.gender = settings.gender;
            this.complexion = settings.complexion;
            this.hairColor = settings.hairColor;

            this.isNew = true || settings.isNew;
            this.tutorialEnabled = true || settings.tutorialEnabled;
        }

        Game.prototype.getName = function () {
            return this.name;
        };

        return Game;
    }

    
})();
