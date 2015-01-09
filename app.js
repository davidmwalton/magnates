(function () {
    'use strict';

    var magnatesApp = angular.module('magnatesApp', [
        'ngRoute',
        'magnatesControllers'
    ]);

    magnatesApp.config(['$routeProvider',
        function ($routeProvider) {
            $routeProvider.
                when('/credits', {
                    templateUrl: 'app/controllers/credits.view.html',
                    controller: 'CreditsCtrl'
                }).
                when('/create', {
                    templateUrl: 'app/controllers/create.view.html',
                    controller: 'CreateCtrl'
                }).
                when('/continue', {
                    templateUrl: 'app/controllers/continue.view.html',
                    controller: 'ContinueCtrl'
                }).
                when('/load', {
                    templateUrl: 'app/controllers/load.view.html',
                    controller: 'LoadCtrl'
                }).
                when('/', {
                    templateUrl: 'app/controllers/start-menu.view.html',
                    controller: 'StartMenuCtrl'
                }).
                otherwise({
                    redirectTo: '/'
                });
        }
    ]);
})();
