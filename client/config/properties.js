'use strict';

(function (root, angular) {

    angular.module('console.config', [])
        .constant('config', {
            apiPath: 'http://localhost:3000/api/v1.0/api'
        });

}(window, angular));