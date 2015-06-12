'use strict';

(function (angular) {

    angular.module('console.config', [])
        .constant('config', {
            apiPath: 'http://localhost/api/v1.0'
        });

}(angular));