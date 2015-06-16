'use strict';

(function (angular) {

    angular.module('console')
        .controller('GroupsController', ['$scope', '$state', 'groupService',
            function ($scope, $state, groupService) {
                $scope.currentPage = 1;
                $scope.itemsPerPage = 25;
                $scope.maxSize = 5;

                $scope.loadData = function () {
                    $scope.loadingTracker.addPromise(
                        groupService.loadPage($scope.currentPage, $scope.itemsPerPage, $scope.searchText)
                            .then(function (data) {
                                $scope.totalItems = data.total;
                                $scope.groups = data.content;
                            })
                    );
                };

                $scope.$watch("searchText", function () {
                    $scope.loadData();
                });

                $scope.pageChanged = function () {
                    $scope.loadData();
                };

                $scope.remove = function (user) {
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