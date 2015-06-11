'use strict';

(function (angular) {

    angular.module('console')
        .controller('UserController', ['$scope', '$state', 'promiseTracker', 'user',
            function ($scope, $state, promiseTracker, user) {
                $scope.loadingTracker = promiseTracker({activationDelay: 500});
                $scope.user = user;
            }]);

}(angular));