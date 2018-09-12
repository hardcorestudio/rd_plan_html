'use strict';
angular.module('sbAdminApp').controller('PlanMainCtrl', ['$scope','Init','CheckBrowser','$state','$stateParams','localStorageService', function ($scope,Init,CheckBrowser,$state,$stateParams,localStorageService) {
    CheckBrowser.check();
    if($stateParams.from == null || $stateParams.from == ""){
        localStorageService.set("collapse", 0);
        $state.go("dashboard.index");
        return;
    }
    $scope.param = {TP_ID:$stateParams.tpId}
    $scope.applyBtnFlag = false;
    Init.iwbhttp('/plan/checkPlan', $scope.param, function(data,header,config,status){
        if(data.applyListStatus == "" || data.applyListStatus == "00" || data.applyListStatus == "03"){
            $scope.applyBtnFlag = true;
        }
    },function(data,header,config,status){
    });

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
        Init.iwbhttp('/plan/apply2q', {url:pathname}, function(data,header,config,status){
            console.log(data)
        },function(data,header,config,status){
        });
    }
}]);