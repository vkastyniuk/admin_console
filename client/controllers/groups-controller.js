'use strict';

(function (angular) {

    angular.module('console')
        .controller('UsersController', ['$scope', '$state', 'promiseTracker', 'groupService',
            function ($scope, $state, promiseTracker, groupService) {
                $scope.loadingTracker = promiseTracker({activationDelay: 500});
                $scope.currentPage = 1;
                $scope.itemsPerPage = 25;
                $scope.maxSize = 5;

                $scope.loadData = function () {
                    $scope.loadingTracker.addPromise(
                        groupService.loadPage($scope.currentPage, $scope.itemsPerPage, $scope.searchText)
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

                $scope.removeUser = function (user) {
                    if (window.confirm('Are you sure you want to remove ' + user + ' ?')) {
                        $scope.deleting = true;
                        $scope.loadingTracker.addPromise(groupService.remove(user)
                            .then(function () {
                                $scope.deleting = false;
                                $scope.loadData();
                            }, function () {
                                $scope.deleting = false;
                            }));
                    }
                };
            }]);

}(angular));