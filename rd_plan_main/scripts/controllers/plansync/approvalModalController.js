'use strict';
angular.module('sbAdminApp').controller('ApprovalModalCtrl', ['$scope','$modalInstance','Init','content','parm','Modal', function ($scope, $modalInstance,Init,content,parm,Modal){
	//弹框标题
	$scope.content = content;
	//传入参数
	$scope.obj = parm;
	//弹框参数
	var resolve = {	};
	var url = "";
	var ctrlName = "";

	//取消
	$scope.cancel = function () {
		$modalInstance.dismiss('cancel');
	};

	$scope.save = function(){
		$scope.obj.sprq= $('#sprq').val();
        if(!$scope.obj.spjg ||$scope.obj.spjg == 'null' || $scope.obj.spjg == null || $scope.obj.spjg == ''){
            $scope.open('请选择结果')
            return false;
        }
        if(!$scope.obj.sprq ||$scope.obj.sprq == 'null' || $scope.obj.sprq == null || $scope.obj.sprq == ''){
            $scope.open('请输入审批日期')
            return false;
		}
		var jsonParam = {
			"zysqclid" : $scope.obj.zysqclid,
			"sprq" : $scope.obj.sprq.length > 11 ? $scope.obj.sprq : $scope.obj.sprq + " 00:00:00",
			"spjg" : $scope.obj.spjg,
		}
		var p =  {
			"method" : $scope.obj.method,
			"url" : $scope.obj.url,
			"jsonParam" : JSON.stringify(jsonParam),
			"zysqclid" : $scope.obj.zysqclid,
		}
		Init.synchttp('/applySyncPlan', p, function (data, header, config, status) {
			$scope.open(data.msg);
			if($scope.closeFlag = true){
				if(data.msg == '成功'){
					$modalInstance.close('succeed');
				}
			}
		}, function (data, header, config, status) {
		});
	}

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