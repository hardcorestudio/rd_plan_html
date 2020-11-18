'use strict';
angular.module('sbAdminApp').controller('EnterpriseFileIndexCtrl', ['$state', function ($state) {
    $state.go("dashboard.enterpriseFileIndex.enterpriseFileList");
}]);