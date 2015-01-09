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

            window.localStorage.setItem('currentGameConfig', JSON.stringify(gameConfig));

            return true;
        },

        controller = function ($scope, $routeParams) {
            $scope.onPlayClicked = onPlayClicked.bind($scope);
        };

    magnatesControllers.controller('CreateCtrl', ['$scope', '$routeParams', controller]);
})();
