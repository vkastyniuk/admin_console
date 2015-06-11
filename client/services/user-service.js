'use strict';

(function (angular) {

    angular.module('console')
        .factory('userService', ['$rootScope', 'config',
            function ($rootScope, config) {
                var baseUrl = config.apiPath;
                var service = {};

                service.loadPage = function (pageNumber, pageSize, criteria) {
                    return $http({
                        method: 'GET',
                        url: baseUrl + '/users',
                        params: {
                            criteria: criteria,
                            page: pageNumber,
                            size: pageSize
                        }
                    });
                };

                service.load = function (name) {
                    return $http({
                        method: 'GET',
                        url: baseUrl + '/users/' + name
                    });
                };

                service.create = function (user) {
                    return $http({
                        method: 'POST',
                        url: baseUrl + '/users',
                        data: user
                    });
                };

                service.update = function (name, update) {
                    return $http({
                        method: 'PUT',
                        url: baseUrl + '/users/' + name,
                        data: update
                    });
                };

                service.remove = function (name) {
                    return $http({
                        method: 'DELETE',
                        url: baseUrl + '/users/' + name
                    });
                };

                return service;
            }]);

}(angular));