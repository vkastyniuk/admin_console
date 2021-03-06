'use strict';

(function (angular) {

    angular.module('console')
        .controller('GroupController', ['$scope', '$state', 'group',
            function ($scope, $state, group) {
                if (group) {
                    $scope.group = group;
                    $scope.groupName = $scope.group.name;
                }
            }]);

}(angular));