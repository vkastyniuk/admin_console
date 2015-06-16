'use strict';

(function (angular) {

    angular.module('console')
        .controller('UserController', ['$scope', '$state', 'user',
            function ($scope, $state, user) {
                $scope.user = user;
                $scope.userName = $scope.user.userName;
            }]);

}(angular));