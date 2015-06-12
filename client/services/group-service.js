'use strict';

(function (angular) {

    angular.module('console')
        .factory('groupService', ['$rootScope', '$http', 'config',
            function ($rootScope, $http, config) {
                var baseUrl = config.apiPath;
                var service = {};

                service.loadPage = function (pageNumber, pageSize, criteria) {
                    return $http({
                        method: 'GET',
                        url: baseUrl + '/groups',
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
                        url: baseUrl + '/groups/' + name
                    }).then(function(response) {
                        return response.data;
                    });
                };

                service.create = function (user) {
                    return $http({
                        method: 'POST',
                        url: baseUrl + '/groups',
                        data: user
                    }).then(function(response) {
                        return response.data;
                    });
                };

                service.update = function (name, update) {
                    return $http({
                        method: 'PUT',
                        url: baseUrl + '/groups/' + name,
                        data: update
                    });
                };

                service.remove = function (name) {
                    return $http({
                        method: 'DELETE',
                        url: baseUrl + '/groups/' + name
                    });
                };

                service.user = {};
                service.user.loadPage = function (name, pageNumber, pageSize, criteria) {
                    return $http({
                        method: 'GET',
                        url: baseUrl + '/groups/' + name + '/users',
                        params: {
                            criteria: criteria,
                            page: pageNumber,
                            size: pageSize
                        }
                    }).then(function(response) {
                        return response.data;
                    });
                };

                service.user.add = function (name, user) {
                    return $http({
                        method: 'POST',
                        url: baseUrl + '/groups/' + name + '/users/' + user
                    });
                };

                service.user.remove = function (name, user) {
                    return $http({
                        method: 'DELETE',
                        url: baseUrl + '/groups/' + name + '/users/' + user
                    });
                };

                return service;
            }]);

}(angular));