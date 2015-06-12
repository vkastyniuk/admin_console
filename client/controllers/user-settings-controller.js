'use strict';

(function (angular) {

    angular.module('console')
        .controller('UserSettingsController', ['$scope', '$state', 'userService',
            function ($scope, $state, userService) {
                $scope.userName = $scope.user.userName;
                $scope.update = function () {
                    $scope.updating = true;
                    $scope.loadingTracker.addPromise(
                        userService.update($scope.userName, $scope.user)
                        .then(function () {
                            $scope.updating = false;
                            $state.go('index.user.settings', {user: $scope.userName});
                        }, function () {
                            $scope.updating = false;
                        }));
                };
            }]);

}(angular));