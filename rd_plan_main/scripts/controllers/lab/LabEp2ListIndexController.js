'use strict';
angular.module('sbAdminApp').controller('LabEp2ListIndexCtrl', ['$state', function ($state) {
    $state.go("dashboard.labEp2ListIndex.labEp2List");
}]);