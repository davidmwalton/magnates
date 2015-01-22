(function () {
    'use strict';

    var magnatesApp = angular.module('magnatesApp', [
            'ngRoute',
            'magnatesControllers',
            'magnatesServices',
            'magnatesFactories'
        ]),
        browserSupportsHtml5Storage = function () {
            try {
                return 'localStorage' in window && window['localStorage'] !== null;
            } catch (e) {
                return false;
            }
        };

    magnatesApp.config(['$routeProvider',
        function ($routeProvider) {
            if (!browserSupportsHtml5Storage()) {
                $routeProvider.
                    when('/', {
                        templateUrl: 'app/controllers/unsupported.view.html'
                    }).
                    otherwise({
                        redirectTo: '/'
                    });
                return;
            }

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
                when('/game', {
                    redirectTo: '/game/summary'
                }).
                when('/game/:pageId', {
                    templateUrl: 'app/controllers/game.view.html',
                    controller: 'GameCtrl'
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
