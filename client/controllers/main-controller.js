'use strict';

(function (angular) {

    angular.module('console')
        .controller('MainController', ['$rootScope', '$scope', '$state', '$timeout', 'promiseTracker',
            function ($rootScope, $scope, $state, $timeout, promiseTracker) {
                $scope.loadingTracker = promiseTracker({activationDelay: 500});
                $scope.alerts = [];

                $scope.closeAlert = function (index) {
                    if ($scope.alerts.length > index) {
                        $scope.alerts.splice(index, 1);
                    } else if ($scope.alerts.length > 0) {
                        $scope.alerts.splice(0, 1);
                    }
                };

                $rootScope.$on('console.messenger.error', function (event, message) {
                    $scope.alerts.push({message: message, type: 'danger'});
                    $timeout($scope.closeAlert, 2500);
                });

                $rootScope.$on('console.messenger.success', function (event, message) {
                    $scope.alerts.push({message: message, type: 'success'});
                    $timeout($scope.closeAlert, 2500);
                });

                $scope.isActive = function () {
                    for (var i = 0; i < arguments.length; i++) {
                        if ($state.current.name == arguments[i]) {
                            return true;
                        }
                    }

                    return false;
                };
            }]);

}(angular));