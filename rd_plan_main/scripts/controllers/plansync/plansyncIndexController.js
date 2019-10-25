'use strict';
angular.module('sbAdminApp').controller('PlansyncIndexCtrl', ['$state', function ($state) {
    $state.go("dashboard.plansyncIndex.plansyncList");
}]);