/**
 * Created by John on 2016/12/21.
 */
'use strict';
angular.module('sbAdminApp').controller('LabWarnCtrl', ['$scope','Init','Modal','$state','localStorageService','$stateParams','CheckBrowser', function ($scope,Init,Modal,$state,localStorageService,$stateParams,CheckBrowser) {
    CheckBrowser.check();
    //弹框参数
    var resolve = {};
    var url = "";
    var ctrlName = "";

    $scope.item = {
        TITLE:"",
        CONTENT:"",
    };
  
    //删除按钮是否显示标志
    $scope.showFlag = true;
    $scope.delFlag = false;
    //角色信息
    Init.iwbhttp('/admin/lanWarnInit', {}, function (data, header, config, status) {
        $scope.item = data.resData
    }, function (data, header, config, status) {
    });


    //返回
    $scope.back = function(){
        $state.go($stateParams.from);
    }

    //保存方法
    $scope.save = function () {
        if($scope.item.TITLE == ""){
            $scope.content = "标题不能为空";
            $scope.open($scope.content);
            return;
        }
        if($scope.item.CONTENT == ""){
            $scope.content = "内容不能为空";
            $scope.open($scope.content);
            return;
        }
        //新增或修改角色
        Init.iwbhttp('/admin/lanWarnSave', $scope.item, function (data, header, config, status) {
            if(angular.equals("0",data.resFlag)){
                url = 'views/modal/promptModal.html';
                ctrlName = 'PromptModalCtrl';
                resolve = {
                    content: function () {
                        return data.msg;
                    },
                    data: function () {
                        return "";
                    }
                };
                var modalInstance = Modal.modal(url, ctrlName, resolve, function () {
                    if(!$scope.delFlag){
                        $scope.delFlag = true;
                    }
                }, function () {

                });
                
            }else{
                $scope.open(data.msg);
            }
        }, function (data, header, config, status) {
        });
    }

    //提示modal弹框
    $scope.open = function (content,data) {
        url = 'views/modal/promptModal.html';
        ctrlName = 'PromptModalCtrl';
        resolve = {
            content: function () {
                return content;
            },
            data: function () {
                return data;
            }
        };
        var modalInstance = Modal.modal(url, ctrlName, resolve, function () {

        }, function () {

        });
    };
}]);
