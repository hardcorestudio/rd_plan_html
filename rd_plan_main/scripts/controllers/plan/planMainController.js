'use strict';
angular.module('sbAdminApp').controller('PlanMainCtrl', ['$rootScope','$scope','Init','CheckBrowser','$state','$stateParams','localStorageService','Modal','$location', function ($rootScope,$scope,Init,CheckBrowser,$state,$stateParams,localStorageService,Modal,$location) {
    CheckBrowser.check();
    //弹框参数
    var resolve = {};
    var url = "";
    var ctrlName = "";
    if($stateParams.from == null || $stateParams.from == ""){
        localStorageService.set("collapse", 0);
        $state.go("dashboard.index");
        return;
    }

    $scope.baseInfoClass = false;
    $scope.productionSituationClass = false;
    $scope.produceSituationClass = false;
    $scope.decrementPlanClass = false;
    $scope.transferStuationClass = false;
    $scope.selfDisposalMeasuresClass = false;
    $scope.entrustDisposalMeasuresClass = false;
    $scope.envClass = false;
    $scope.lastClass = false;
    
    $scope.param = {TP_ID:$stateParams.tpId}
    $scope.taskFlag = $stateParams.from.indexOf('Task') > -1 ? true : false;
    $scope.btnFlag = $stateParams.btnFlag;
    $scope.userType = localStorageService.get('userType');
    $scope.epId = $stateParams.epId;
    $scope.epName = $stateParams.epName;
    $scope.applyBtnFlag = false;
    $scope.applyId = $stateParams.applyId;
    Init.iwbhttp('/plan/checkPlan', $scope.param, function(data,header,config,status){
        if(data.applyListStatus == "" || data.applyListStatus == "00" || data.applyListStatus == "03"){
            $scope.applyBtnFlag = true;
        }
        if(data.baseInfoFlag == '1'){
            $scope.baseInfoClass = true
        }
        if(data.productionSituationFlag == '1'){
            $scope.productionSituationClass = true
        }
    },function(data,header,config,status){
    });

    $scope.jumpSub = function(pathname){
        Init.iwbhttp('/plan/planMain', {url:pathname}, function(data,header,config,status){
            console.log(data)
            var sub_url = data.sub_url+"?IWBSESSION="+localStorageService.get('IWBSESSION')+"&WJWT="+localStorageService.get('WJWT')+"&DEVICE_UUID="+$rootScope.uuid+"&CURRENT_URL="+$location.url()+"&USER_ID="+localStorageService.get('userId')+"&TP_ID="+$stateParams.tpId+"&EP_ID="+$stateParams.epId  ;
            window.open(sub_url, '_blank')
        },function(data,header,config,status){
        });
    }

    $scope.test1 = function(pathname){
        // var p = {};
        // p.EP_ID = $stateParams.epId;
        // p.TP_ID = $stateParams.tpId
        // Init.iwbhttp('/plan/initBaseInfo', p, function(data,header,config,status){
        //     console.log(JSON.stringify(data))
           
        // },function(data,header,config,status){
        // });
        var p = {};
        p.TP_ID = $stateParams.tpId
        Init.iwbhttp('/plan/initProductInfo', p, function(data,header,config,status){
            console.log(data)
           
        },function(data,header,config,status){
        });
    }
    $scope.test = function(pathname){
        // var p = {};
        // p.EP_ID = $stateParams.epId;
        // p.TOTAL_INVESTMENT = 'aa';
        // p.TOTAL_INVESTMENT_UNIT = 'bb';
        // p.TOTAL_OUTPUTVALUE = 'cc';
        // p.TOTAL_OUTPUTVALUE_UNIT = 'dd';
        // p.FLOOR_AREA = 'ee';
        // p.FLOOR_AREA_UNIT = 'ff';
        // p.EMPLOYEES_NUM = '10';
        // p.PRINCIPAL = 'hh';
        // p.LINKMAN = 'ii';
        // p.LINK_NUM = 'jj';
        // p.FAX_TEL = 'll';
        // p.MAIL = 'mm';
        // p.WEBSITE = 'nn';
        // p.DEPARTMENT = 'oo';
        // p.DEPARTMENT_HEAD = 'pp';
        // p.MANAGER = 'qq';
        // p.SYS_MANAGER = '0';
        // p.SYS_RESPONSIBILITY = '1';
        // p.SYS_OPERATION = '0';
        // p.SYS_LEDGER = '1';
        // p.SYS_TRAINING = '0';
        // p.SYS_ACCIDENT = '1';
        // p.MANAGEMENT_ORG = 'rr';
        // p.sons = [
        //     {
        //         "TECHNICAL_DIRECTER": "111", 
        //         "EDU_LEVEL": "aaa"
        //     },
        //     {
        //         "TECHNICAL_DIRECTER": "222", 
        //         "EDU_LEVEL": "bbb"
        //     }
        // ]
        // console.log(JSON.stringify(p));
        // Init.iwbhttp('/plan/saveBaseInfo', p, function(data,header,config,status){
        //     console.log(data)
           
        // },function(data,header,config,status){
        // });
        var p = {};
        p.EP_ID = $stateParams.epId;
        p.TP_ID = $stateParams.tpId;
        p.PRODUCT_DESC = 'aaa'
        p.PRODUCT_ORI = [
            {
                "NAME": "111", 
                "UNIT": "aaa",
                "LAST_NUM": "100.00",
                "YEAR_NUM": "1000.00",
            },
            {
                "NAME": "222", 
                "UNIT": "bbb",
                "LAST_NUM": "100.00",
                "YEAR_NUM": "1000.00",
            }
        ]
        p.PRODUCT_EQU = [
            {
                "NAME": "111", 
                "UNIT": "aaa",
                "LAST_NUM": "100.00",
                "YEAR_NUM": "1000.00",
            },
            {
                "NAME": "222", 
                "UNIT": "bbb",
                "LAST_NUM": "100.00",
                "YEAR_NUM": "1000.00",
            }
        ]
        p.PRODUCT_OUTPUT = [
            {
                "NAME": "111", 
                "UNIT": "aaa",
                "LAST_NUM": "100.00",
                "YEAR_NUM": "1000.00",
            },
            {
                "NAME": "222", 
                "UNIT": "bbb",
                "LAST_NUM": "100.00",
                "YEAR_NUM": "1000.00",
            }
        ]
        console.log(JSON.stringify(p));
        Init.iwbhttp('/plan/saveProductInfo', p, function(data,header,config,status){
            console.log(data)
           
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
        Init.iwbhttp('/plan/apply2q', $scope.param, function(data,header,config,status){
            if(data.resFlag == '0'){
                $scope.applyBtnFlag = false;
                $scope.open('提交成功');
            }else{
                $scope.open('提交失败');
            }
        },function(data,header,config,status){
        });
    }

    //同意
    $scope.agree = function () {
        //业务等级（sjsp-市级审批，qjsp-市级审批）
        var bizstep = "";
        if(angular.equals("SHB",localStorageService.get("orgCode"))){
            bizstep = "sjsp";
        }else{
            bizstep = "qjsp";
        }
        var par = {
            epId:$scope.epId,
            epName:$scope.epName,
            bizId:$stateParams.bizId,
            TP_ID:$stateParams.bizId,
            bizName:"管理计划",
            bizStep:bizstep,
            checkResult:"01",
            checkAdvice:"",
            btoId:localStorageService.get("btoId"),
            btoName:localStorageService.get("btoName"),
            btofId:localStorageService.get("btofId"),
            btofName:localStorageService.get("btofName"),
            applyId:$stateParams.applyId
        };
        //管理员处理待办业务
        Init.iwbhttp('/admin/adminDealTask', {approveInfo:par}, function (data, header, config, status) {
            $scope.open(data.msg);
            if(data.resFlag == "0"){
                // $("#agreeBtn").attr("disabled",true);
                // $("#disagreeBtn").attr("disabled",true);
                $scope.btnFlag = false;
            }
        }, function (data, header, config, status) {
        });
    };

    //返回上一页
    $scope.back = function (){
        $state.go($stateParams.from);
    }

    //驳回
    $scope.disagree = function () {
        //业务等级（sjsp-市级审批，qjsp-市级审批）
        var bizstep = "";
        if(angular.equals("SHB",localStorageService.get("orgCode"))){
            bizstep = "sjsp";
        }else{
            bizstep = "qjsp";
        }
        var content = "原因";
        var parm = {
            epId:$scope.epId,
            epName:$scope.epName,
            bizId:$stateParams.bizId,
            TP_ID:$stateParams.bizId,
            bizName:"管理计划",
            bizStep:bizstep,
            checkResult:"00",
            checkAdvice:"",
            btoId:localStorageService.get("btoId"),
            btoName:localStorageService.get("btoName"),
            btofId:localStorageService.get("btofId"),
            btofName:localStorageService.get("btofName"),
            applyId:$stateParams.applyId,
            httpUrl:"/admin/adminDealTask"
        };
        url = 'views/dashboard/admin/approveDisagreeModal.html';
        ctrlName = 'DisagreeModalCtrl';
        resolve = {
            content: function () {
                return content;
            },
            parm: function () {
                return parm;
            }
        };
        var modalInstance = Modal.modal(url, ctrlName, resolve, function (result) {
            if(angular.equals("succeed",result)){
                // $("#agreeBtn").attr("disabled",true);
                // $("#disagreeBtn").attr("disabled",true);
                $scope.btnFlag = false;
            }
        }, function () {

        });
       
    };

    //查看审批记录
    $scope.check = function (){
        url = 'views/dashboard/admin/approveDetailModal.html';
        ctrlName = 'ApproveDetailModalCtrl';
        resolve = {
            applyId: function () {
                return $stateParams.applyId;
            }
        };
        var modalInstance = Modal.modal(url, ctrlName, resolve, function () {

        }, function () {

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