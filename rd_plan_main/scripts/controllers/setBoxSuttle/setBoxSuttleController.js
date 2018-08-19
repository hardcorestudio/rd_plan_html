/**
 * Created by John on 2017/10/16.
 */
'use strict';
angular.module('sbAdminApp').controller('SetBoxSuttleCtrl', ['$scope','Init','Modal','CheckBrowser', function ($scope,Init,Modal,CheckBrowser) {
    CheckBrowser.check();
    //�������
    var resolve = {};
    var url = "";
    var ctrlName = "";

    //��ȡͰ����
    Init.iwbhttp('/transfer/queryBoxSuttle', {}, function(data,header,config,status){
        if(data.resFlag == "0") {
            $scope.boxSuttle = data.BOX_SUTTLE;
        }
    },function(data,header,config,status){
    });

    //����Ͱ����
    $scope.save = function () {
        Init.iwbhttp('/setBoxSuttle/setBoxSuttle', {boxSuttle : $scope.boxSuttle}, function (data, header, config, status) {
            $scope.open(data.msg,data);
        }, function (data, header, config, status) {
        });
    };

    //��ʾmodal����
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
