'use strict';
angular.module('sbAdminApp').controller('ConfirmModalCtrl', ['$scope','$modalInstance','content','data', function ($scope, $modalInstance,content,data){
	$scope.content = content;
	//�رշ���
	$scope.cancel = function () {
		$modalInstance.dismiss('close');
	};
	//ȷ������
	$scope.ensure = function () {
		$modalInstance.close(data);
	};
}]);