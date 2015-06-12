'use strict';

(function (angular) {

    angular.module('console')
        .factory('userService', ['$rootScope', '$http', 'config',
            function ($rootScope, $http, config) {
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
                    }).then(function(response) {
                        return response.data;
                    });
                };

                service.load = function (name) {
                    return $http({
                        method: 'GET',
                        url: baseUrl + '/users/' + name
                    }).then(function(response) {
                        return response.data;
                    });
                };

                service.create = function (user) {
                    return $http({
                        method: 'POST',
                        url: baseUrl + '/users',
                        data: user
                    }).then(function(response) {
                        return response.data;
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