(function () {
    'use strict';

    var magnatesControllers = angular.module('magnatesControllers'),

        controller = function ($scope, $routeParams, gamePersistenceService) {
            $scope.name = 'Continue Controller';

            $scope.game = gamePersistenceService.getCurrentGameConfig();
        };

    magnatesControllers.controller('ContinueCtrl', ['$scope', '$routeParams', 'gamePersistenceService', controller]);
})();
