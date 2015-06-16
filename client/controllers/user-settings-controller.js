'use strict';

(function (angular) {

    angular.module('console')
        .controller('UserSettingsController', ['$scope', '$state', 'userService',
            function ($scope, $state, userService) {
                $scope.save = function (user) {
                    $scope.saving = true;
                    if ($scope.userName) {
                        $scope.loadingTracker.addPromise(
                            userService.update($scope.userName, user)
                                .then(function () {
                                    $scope.saving = false;
                                    $scope.userName = user.userName;
                                    $state.go('index.user.settings', {user: $scope.userName});
                                }, function () {
                                    $scope.saving = false;
                                }));
                    } else {
                        $scope.loadingTracker.addPromise(
                            userService.create(user)
                                .then(function () {
                                    $scope.saving = false;
                                    $scope.userName = user.userName;
                                    $state.go('index.user.settings', {user: $scope.userName});
                                }, function () {
                                    $scope.saving = false;
                                }));
                    }

                };
            }]);

}(angular));