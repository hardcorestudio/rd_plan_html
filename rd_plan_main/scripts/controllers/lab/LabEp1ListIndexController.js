'use strict';
angular.module('sbAdminApp').controller('LabEp1ListIndexCtrl', ['$state', function ($state) {
    $state.go("dashboard.labEp1ListIndex.labEp1List");
}]);