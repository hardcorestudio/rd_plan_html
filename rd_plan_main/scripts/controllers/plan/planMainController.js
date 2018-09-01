'use strict';
angular.module('sbAdminApp').controller('PlanMainCtrl', ['$scope','$state','Init', function ($scope,$state,Init) {

    $scope.jumpSub = function(pathname){
        Init.iwbhttp('/plan/planMain', {url:pathname}, function(data,header,config,status){
            console.log(data)
            window.open(data.sub_url, '_blank')
        },function(data,header,config,status){
        });
    }
}]);