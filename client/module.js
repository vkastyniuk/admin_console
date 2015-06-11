'use strict';

(function (angular) {

    angular.module('console', ['ajoslin.promise-tracker', 'ui.bootstrap', 'ui.router', 'console.config', 'console.directives'])
        .config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
            function ($stateProvider, $urlRouterProvider, $locationProvider) {
                $urlRouterProvider.when('/groups/{group}', '/edit/{org}/groups/{group}/settings');
                $urlRouterProvider.when('/users/{user}', '/users/{user}/settings');

                $locationProvider.html5Mode({
                    enabled: true
                });

                $stateProvider
                    .state('users', {
                        url: '/users',
                        templateUrl: 'partials/users.html',
                        controller: 'UsersController'
                    })

                    .state('user', {
                        url: '/user/{user}',
                        templateUrl: 'partials/user.html',
                        controller: 'UserController',
                        resolve: {
                            user: ['$stateParams', 'userService', function ($stateParams, userService) {
                                return userService.load($stateParams.user);
                            }]
                        }
                    })

                    .state('user.settings', {
                        url: '/settings',
                        templateUrl: 'partials/user-settings.html',
                        controller: 'UserSettingsController'
                    })

                    .state('groups', {
                        url: '/groups',
                        templateUrl: 'partials/groups.html',
                        controller: 'GroupsController'
                    })

                    .state('group', {
                        url: '/groups/{group}',
                        templateUrl: 'partials/group.html',
                        controller: 'GroupController',
                        resolve: {
                            group: ['$stateParams', 'groupService', function ($stateParams, groupService) {
                                return groupService.load($stateParams.group);
                            }]
                        }
                    })

                    .state('group.settings', {
                        url: '/settings',
                        templateUrl: 'partials/group-settings.html',
                        controller: 'GroupSettingsController'
                    })

                    .state('group.users', {
                        url: '/users',
                        templateUrl: 'partials/group-users.html',
                        controller: 'GroupUsersController'
                    })
            }]);

}(angular));