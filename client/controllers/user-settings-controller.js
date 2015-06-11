'use strict';

(function (angular) {

    angular.module('console')
        .controller('UserSettingsController', ['$scope', '$state', 'userService',
            function ($scope, $state, userService) {
                $scope.userName = $scope.user.userName;
                $scope.changeName = function () {
                    $scope.updating = true;
                    $scope.loadingTracker.addPromise(userService.update($scope.user.userName, {name: $scope.userName})
                        .then(function () {
                            $scope.updating = false;
                            $state.go('user.settings', {user: $scope.userName});
                        }, function () {
                            $scope.updating = false;
                        }));
                };
            }]);

}(angular));