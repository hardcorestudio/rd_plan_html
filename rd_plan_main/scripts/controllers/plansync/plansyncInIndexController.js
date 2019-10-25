'use strict';
angular.module('sbAdminApp').controller('PlansyncInIndexCtrl', ['$state', function ($state) {
    $state.go("dashboard.plansyncInIndex.plansyncInList");
}]);