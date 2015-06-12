'use strict';

(function (angular) {

    angular.module('console')
        .controller('GroupController', ['$scope', '$state', 'group',
            function ($scope, $state, group) {
                $scope.group = group;
            }]);

}(angular));