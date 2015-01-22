(function () {
    'use strict';

    function gameFactory() {

        function Game(settings) {
            this.name = settings.name;
            this.gender = settings.gender;
            this.complexion = settings.complexion;
            this.hairColor = settings.hairColor;
        }

        Game.prototype.getName = function () {
            return this.name;
        };

        return Game;
    }

    angular.module('magnatesFactories').factory('gameFactory', [gameFactory]);
})();
