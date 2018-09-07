'use strict';
angular.module('sbAdminApp').controller('PlanMainCtrl', ['$scope','Init','CheckBrowser','$state','$stateParams','localStorageService', function ($scope,Init,CheckBrowser,$state,$stateParams,localStorageService) {
    CheckBrowser.check();
    if($stateParams.from == null || $stateParams.from == ""){
        localStorageService.set("collapse", 0);
        $state.go("dashboard.index");
        return;
    }
    $scope.jumpSub = function(pathname){
        Init.iwbhttp('/plan/planMain', {url:pathname}, function(data,header,config,status){
            console.log(data)
            window.open(data.sub_url, '_blank')
        },function(data,header,config,status){
        });
    }
    //返回上一页
    $scope.back = function (){
        console.log($stateParams)
        $state.go($stateParams.from);
    }
    //提交
    $scope.sub = function (){
        console.log("提交成功")
        // $state.go($stateParams.from);
    }
}]);