'use strict';

(function (angular) {

    angular.module('console')
        .controller('GroupSettingsController', ['$scope', '$state', 'groupService',
            function ($scope, $state, groupService) {
                $scope.groupName = $scope.group.name;
                $scope.changeName = function () {
                    $scope.updating = true;
                    $scope.loadingTracker.addPromise(groupService.update($scope.group.name, {name: $scope.groupName})
                        .then(function () {
                            $scope.updating = false;
                            $state.go('group.settings', {group: $scope.groupName});
                        }, function () {
                            $scope.updating = false;
                        }));
                };
            }]);

}(angular));