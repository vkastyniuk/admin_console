'use strict';

(function (angular) {

    angular.module('console')
        .controller('UsersController', ['$scope', '$state', 'userService',
            function ($scope, $state, userService) {
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

                /*$scope.inviteUser = function (user) {
                 $scope.inviting = true;
                 $scope.loadingTracker.addPromise(orgService.member.invite($scope.organization.name, user)
                 .then(function (data) {
                 $scope.inviting = false;
                 delete $scope.user;

                 if (data) {
                 $scope.successMessage = user + ' was invited';
                 $scope.loadData();
                 } else {
                 $scope.successMessage = 'Invitation was sent to ' + user;
                 }
                 }, function () {
                 $scope.inviting = false;
                 $scope.successMessage = '';
                 }));
                 };*/

                $scope.removeUser = function (user) {
                    if (window.confirm('Are you sure you want to remove ' + user + ' ?')) {
                        $scope.deleting = true;
                        $scope.loadingTracker.addPromise(userService.remove(user)
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