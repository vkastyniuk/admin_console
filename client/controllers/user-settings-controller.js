'use strict';

(function (angular) {

    angular.module('console')
        .controller('UserSettingsController', ['$rootScope', '$scope', '$state', 'userService',
            function ($rootScope, $scope, $state, userService) {
                $scope.save = function (user) {
                    var onFulfilled = function () {
                        $scope.saving = false;
                        $scope.userName = user.userName;
                        $state.go('index.user.settings', {user: $scope.userName});
                        $rootScope.$broadcast('console.messenger.success', 'User data was successfully saved');
                    };

                    var onRejected = function (error) {
                        $scope.saving = false;
                        $rootScope.$broadcast("console.messenger.error", error.message);
                    };

                    $scope.saving = true;
                    if ($scope.userName) {
                        $scope.loadingTracker.addPromise(
                            userService.update($scope.userName, user)
                                .then(onFulfilled, onRejected));
                    } else {
                        $scope.loadingTracker.addPromise(
                            userService.create(user)
                                .then(onFulfilled, onRejected));
                    }
                };
            }]);

}(angular));