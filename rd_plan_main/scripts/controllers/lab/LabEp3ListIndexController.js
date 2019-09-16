'use strict';
angular.module('sbAdminApp').controller('LabEp3ListIndexCtrl', ['$state', function ($state) {
    $state.go("dashboard.labEp3ListIndex.labEp3List");
}]);