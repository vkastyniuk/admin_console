'use strict';

(function (angular) {

    angular.module('console')
        .controller('GroupSettingsController', ['$rootScope', '$scope', '$state', 'groupService',
            function ($rootScope, $scope, $state, groupService) {
                $scope.save = function (group) {
                    var onFulfilled = function () {
                        $scope.saving = false;
                        $scope.groupName = group.name;
                        $state.go('index.group.settings', {group: $scope.groupName});
                        $rootScope.$broadcast('console.messenger.success', 'Group data was successfully saved');
                    };

                    var onRejected = function (error) {
                        $scope.saving = false;
                        $rootScope.$broadcast("console.messenger.error", error.message);
                    };

                    $scope.saving = true;
                    if ($scope.groupName) {
                        $scope.loadingTracker.addPromise(
                            groupService.update($scope.groupName, group)
                                .then(onFulfilled, onRejected));
                    } else {
                        $scope.loadingTracker.addPromise(
                            groupService.create(group)
                                .then(onFulfilled, onRejected));
                    }
                };
            }]);

}(angular));