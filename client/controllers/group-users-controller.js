'use strict';

(function (angular) {

    angular.module('console')
        .controller('GroupUsersController', ['$rootScope', '$scope', '$state', 'userService', 'groupService',
            function ($rootScope, $scope, $state, userService, groupService) {
                $scope.currentPage = 1;
                $scope.itemsPerPage = 25;
                $scope.maxSize = 5;

                $scope.loadData = function () {
                    $scope.loadingTracker.addPromise(groupService.user.loadPage($scope.group.name, $scope.currentPage, $scope.itemsPerPage, $scope.searchText)
                        .then(function (data) {
                            $scope.totalItems = data.total;
                            $scope.users = data.content;
                        }));
                };

                $scope.$watch("searchText", function () {
                    $scope.loadData();
                });

                $scope.pageChanged = function () {
                    $scope.loadData();
                };

                $scope.searchUserCallback = function (data) {
                    return userService.loadPage(1, 10, data.query)
                        .then(function (response) {
                            return response.content;
                        }
                    );
                };

                $scope.addUser = function (user) {
                    $scope.adding = true;
                    $scope.loadingTracker.addPromise(groupService.user.add($scope.group.name, user)
                        .then(function () {
                            $scope.adding = false;
                            $scope.loadData();
                            $rootScope.$broadcast('console.messenger.success', 'User was successfully added to the group.');
                            delete $scope.user;
                        }, function (error) {
                            $scope.adding = false;
                            $rootScope.$broadcast("console.messenger.error", error.message);
                        }));
                };

                $scope.remove = function (user) {
                    if (window.confirm("Are you sure you want to remove user from organization?")) {
                        $scope.deleting = true;
                        $scope.loadingTracker.addPromise(
                            groupService.user.remove($scope.group.name, user)
                                .then(function () {
                                    $scope.deleting = false;
                                    $scope.loadData();
                                    $rootScope.$broadcast('console.messenger.success', 'User was successfully removed from the group.');
                                }, function (error) {
                                    $scope.deleting = false;
                                    $rootScope.$broadcast("console.messenger.error", error.message);
                                }));
                    }
                };
            }]);

}(angular));