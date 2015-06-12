'use strict';

(function (angular) {

    angular.module('console')
        .controller('GroupSettingsController', ['$scope', '$state', 'groupService',
            function ($scope, $state, groupService) {
                $scope.groupName = $scope.group.name;
                $scope.update = function () {
                    $scope.updating = true;
                    $scope.loadingTracker.addPromise(
                        groupService.update($scope.groupName, $scope.group)
                        .then(function () {
                            $scope.updating = false;
                            $state.go('index.group.settings', {group: $scope.groupName});
                        }, function () {
                            $scope.updating = false;
                        }));
                };
            }]);

}(angular));