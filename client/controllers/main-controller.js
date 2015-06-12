'use strict';

(function (angular) {

    angular.module('console')
        .controller('MainController', ['$scope', '$state', 'promiseTracker',
            function ($scope, $state, promiseTracker) {
                $scope.loadingTracker = promiseTracker({activationDelay: 500});

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