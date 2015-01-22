(function () {
    'use strict';

    var characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

    function service() {
        this.generateNewGuid = generateNewGuid;
        this.generateEmptyGuid = generateEmptyGuid;
        this.generateNewHashKey = generateNewHashKey;

        return this;
    }

    function generateNewGuid() {
        return '123-456-789';
    }

    function generateEmptyGuid() {
        return '000-000-000';
    }

    function generateNewHashKey() {
        var i,
            newKey = '',
            rand;

        for (i = 0; i < 24; i += 1) {
            rand = Math.floor(Math.random() * 52);

            newKey += characters[rand];
        }

        return newKey;
    }

    angular.module('magnatesServices').service('guidHelperService', [service]);
})();
