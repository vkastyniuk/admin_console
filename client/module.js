'use strict';

(function (angular) {

    angular.module('console', ['ajoslin.promise-tracker', 'ui.bootstrap', 'ui.router', 'console.config', 'console.directives'])
        .config(['$stateProvider', '$locationProvider',
            function ($stateProvider, $locationProvider) {
                $locationProvider.html5Mode({
                    enabled: true,
                    requireBase: false
                });

                $stateProvider
                    .state('index', {
                        url: '',
                        abstract: true,
                        template: '<div ui-view></div>',
                        controller: 'MainController'
                    })

                    .state('index.users', {
                        url: '/users',
                        templateUrl: '/partials/users.html',
                        controller: 'UsersController'
                    })

                    .state('index.user', {
                        url: '/users/{user}',
                        abstract: true,
                        templateUrl: '/partials/user.html',
                        controller: 'UserController',
                        resolve: {
                            user: ['$stateParams', 'userService', function ($stateParams, userService) {
                                if ($stateParams.user == 'new') {
                                    return undefined;
                                } else {
                                    return userService.load($stateParams.user);
                                }
                            }]
                        }
                    })

                    .state('index.user.settings', {
                        url: '/settings',
                        templateUrl: '/partials/user-settings.html',
                        controller: 'UserSettingsController'
                    })

                    .state('index.groups', {
                        url: '/groups',
                        templateUrl: '/partials/groups.html',
                        controller: 'GroupsController'
                    })

                    .state('index.group', {
                        url: '/groups/{group}',
                        abstract: true,
                        templateUrl: '/partials/group.html',
                        controller: 'GroupController',
                        resolve: {
                            group: ['$stateParams', 'groupService', function ($stateParams, groupService) {
                                if ($stateParams.group == 'new') {
                                    return undefined;
                                } else {
                                    return groupService.load($stateParams.group);
                                }
                            }]
                        }
                    })

                    .state('index.group.settings', {
                        url: '/settings',
                        templateUrl: '/partials/group-settings.html',
                        controller: 'GroupSettingsController'
                    })

                    .state('index.group.users', {
                        url: '/users',
                        templateUrl: '/partials/group-users.html',
                        controller: 'GroupUsersController'
                    })
            }]);

}(angular));