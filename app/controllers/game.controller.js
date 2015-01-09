(function () {
    'use strict';

    var magnatesControllers = angular.module('magnatesControllers'),

        controller = function ($scope, $routeParams) {
            $scope.name = 'Game Controller';
            $scope.pageId = $routeParams.pageId;

            $scope.currentGameConfig = JSON.parse(window.localStorage.getItem('currentGameConfig'));

            if ($scope.pageId === '' || $scope.pageId === undefined || $scope.pageId === null) {
                $scope.pageId = 'Home';
            }
        };

    magnatesControllers.controller('GameCtrl', ['$scope', '$routeParams', controller]);
})();
