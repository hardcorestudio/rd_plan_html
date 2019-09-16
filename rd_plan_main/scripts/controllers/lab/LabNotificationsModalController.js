/**
 * Created by John on 2016/12/21.
 */
'use strict';
angular.module('sbAdminApp').controller('LabNotificationsModalCtrl',['$scope','$modalInstance','Init','parm','content','Modal', function ($scope, $modalInstance,Init,parm,content,Modal){
    //弹框标题
	$scope.content = content;
	//传入参数
    $scope.parm = parm;
    $scope.item = parm.item;
	//弹框参数
	var resolve = {	};
	var url = "";
	var ctrlName = "";
	//确认
	$scope.sub = function () {
        if(!$scope.item.TITLE ||$scope.item.TITLE == 'null' || $scope.item.TITLE == null || $scope.item.TITLE == ''){
            $scope.open('请输入标题')
            return false;
        }
        if(!$scope.item.CONTENT ||$scope.item.CONTENT == 'null' || $scope.item.CONTENT == null || $scope.item.CONTENT == ''){
            $scope.open("请输入内容");
			return;
        }
		Init.iwbhttp("/admin/notificationsSave", {parm:$scope.item}, function (data, header, config, status) {
			$scope.open(data.msg);
			if($scope.closeFlag = true){
				if(data.resFlag == '0'){
					$modalInstance.close('succeed');
				}
			}
		}, function (data, header, config, status) {
		});
	};
	//取消
	$scope.cancel = function () {
		$modalInstance.close('cancel');
	};

	//弹框提示
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
			$scope.closeFlag = true;
		}, function () {
		});
	};
}]);
