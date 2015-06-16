'use strict';

(function (angular) {

    angular.module('console')
        .controller('GroupSettingsController', ['$scope', '$state', 'groupService',
            function ($scope, $state, groupService) {
                $scope.save = function (group) {
                    $scope.saving = true;
                    if ($scope.groupName) {
                        $scope.loadingTracker.addPromise(
                            groupService.update($scope.groupName, group)
                                .then(function () {
                                    $scope.saving = false;
                                    $scope.groupName = group.name;
                                    $state.go('index.group.settings', {group: $scope.groupName});
                                }, function () {
                                    $scope.saving = false;
                                }));
                    } else {
                        $scope.loadingTracker.addPromise(
                            groupService.create(group)
                                .then(function () {
                                    $scope.saving = false;
                                    $scope.groupName = group.name;
                                    $state.go('index.group.settings', {group: $scope.groupName});
                                }, function () {
                                    $scope.saving = false;
                                }));
                    }
                };
            }]);

}(angular));