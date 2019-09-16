/**
 * Created by John on 2016/12/21.
 */
'use strict';
angular.module('sbAdminApp').controller('LabNotificationsCtrl', ['$scope','Init','Modal','$state','localStorageService','$stateParams','CheckBrowser', function ($scope,Init,Modal,$state,localStorageService,$stateParams,CheckBrowser) {
    CheckBrowser.check();
    $scope.dataList = []
    //弹框参数
    var resolve = {};
    var url = "";
    var ctrlName = "";
    $scope.init = function(){
        Init.iwbhttp('/admin/notificationsList', {}, function (data, header, config, status) {
            if(data.resFlag == '0'){
                $scope.dataList = data.resDataList
            }        
        }, function (data, header, config, status) {
        });
    }
    $scope.init()

    $scope.add = function (){
        url = 'views/dashboard/lab/labNotificationsModal.html';
        ctrlName = 'LabNotificationsModalCtrl';
        var parm = {
            item:$scope.item,
        };
        resolve = {
            parm: function () {
                return parm;
            },
            content: function () {
                return '录入通知';
            },
        };
        var modalInstance = Modal.modal(url, ctrlName, resolve, function (result) {
            if(angular.equals("succeed",result)){
                $scope.init()
            }
        }, function () {

        });
    }  

    $scope.del = function (id){
        Init.iwbhttp('/admin/notificationsDel', {id:id}, function (data, header, config, status) {
            if(data.resFlag == '0'){
                $scope.init()
            } 
        }, function (data, header, config, status) {
        });
    }
}]);
