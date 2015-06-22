'use strict';

(function (angular) {

    angular.module('console')
        .controller('GroupsController', ['$rootScope', '$scope', '$state', 'groupService',
            function ($rootScope, $scope, $state, groupService) {
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

                $scope.create = function () {
                    $state.go('index.group.settings', {group: 'new'});
                };

                $scope.remove = function (user) {
                    if (window.confirm('Are you sure you want to remove ' + user + ' ?')) {
                        $scope.deleting = true;
                        $scope.loadingTracker.addPromise(groupService.remove(user)
                            .then(function () {
                                $scope.deleting = false;
                                $scope.loadData();
                                $rootScope.$broadcast('console.messenger.success', 'Group was successfully removed.');
                            }, function (error) {
                                $scope.deleting = false;
                                $rootScope.$broadcast("console.messenger.error", error.message);
                            }));
                    }
                };
            }]);

}(angular));