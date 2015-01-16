(function () {
    'use strict';

    var magnatesServices = angular.module('magnatesServices'),
        characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',


        generateNewGuid = function () {
            return '123-456-789';
        },

        generateEmptyGuid = function () {
            return '000-000-000';
        },

        generateNewHashKey = function () {
            var i,
                newKey = '',
                rand;

            for (i = 0; i < 24; i += 1) {
                rand = Math.floor(Math.random() * 52);

                newKey += characters[rand];
            }

            return newKey;
        },

        service = function (guidHelperService) {
            var service = {};

            service.generateNewGuid = generateNewGuid;
            service.generateEmptyGuid = generateEmptyGuid;
            service.generateNewHashKey = generateNewHashKey;

            return service;
        };

    magnatesServices.factory('guidHelperService', [service]);
})();
