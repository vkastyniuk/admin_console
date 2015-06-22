'use strict';

(function (angular) {

    angular.module('console')
        .controller('UsersController', ['$rootScope', '$scope', '$state', 'userService',
            function ($rootScope, $scope, $state, userService) {
                $scope.currentPage = 1;
                $scope.itemsPerPage = 25;
                $scope.maxSize = 5;

                $scope.loadData = function () {
                    $scope.loadingTracker.addPromise(
                        userService.loadPage($scope.currentPage, $scope.itemsPerPage, $scope.searchText)
                            .then(function (data) {
                                $scope.totalItems = data.total;
                                $scope.users = data.content;
                            })
                    );
                };

                $scope.$watch("searchText", function () {
                    $scope.loadData();
                });

                $scope.pageChanged = function () {
                    $scope.loadData();
                };

                $scope.create = function () {
                    $state.go('index.user.settings', {user: 'new'});
                };

                $scope.remove = function (user) {
                    if (window.confirm('Are you sure you want to remove ' + user + ' ?')) {
                        $scope.deleting = true;
                        $scope.loadingTracker.addPromise(userService.remove(user)
                            .then(function () {
                                $scope.deleting = false;
                                $scope.loadData();
                                $rootScope.$broadcast('console.messenger.success', 'User was successfully removed.');
                            }, function (error) {
                                $scope.deleting = false;
                                $rootScope.$broadcast("console.messenger.error", error.message);
                            }));
                    }
                };
            }]);

}(angular));