'use strict';

(function (angular) {

    angular.module('console')
        .controller('GroupController', ['$scope', '$state', 'promiseTracker', 'group',
            function ($scope, $state, promiseTracker, group) {
                $scope.loadingTracker = promiseTracker({activationDelay: 500});
                $scope.group = group;
            }]);

}(angular));