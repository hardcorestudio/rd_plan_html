'use strict';
angular.module('sbAdminApp').controller('PlanMainCtrl', ['$rootScope','$scope','Init','CheckBrowser','$state','$stateParams','localStorageService','Modal','$location','WebSocket', function ($rootScope,$scope,Init,CheckBrowser,$state,$stateParams,localStorageService,Modal,$location,WebSocket) {
    $scope.WebSocket = WebSocket;
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
        if(data.produceSituationFlag == '1'){
            $scope.produceSituationClass = true
        }
        if(data.decrementPlanFlag == '1'){
            $scope.decrementPlanClass = true
        }
        if(data.transferStuationFlag == '1'){
            $scope.transferStuationClass = true
        }
        if(data.selfDisposalMeasuresFlag == '1'){
            $scope.selfDisposalMeasuresClass = true
        }
        if(data.entrustDisposalMeasuresFlag == '1'){
            $scope.entrustDisposalMeasuresClass = true
        }
    },function(data,header,config,status){
    });

    $scope.jumpSub = function(pathname){
        var newWin = window.open('about:blank');//过渡页面的url
        Init.iwbhttp('/plan/planMain', {url:pathname}, function(data,header,config,status){
            console.log(data)
            var showflag = false;
            if($scope.userType == 'admin'){
                showflag = $stateParams.btnFlag 
            }else{
                if($scope.applyBtnFlag && $scope.btnFlag ){
                    showflag = true
                }
            }
            var sub_url = data.sub_url+"?IWBSESSION="+localStorageService.get('IWBSESSION')+"&WJWT="+localStorageService.get('WJWT')+"&DEVICE_UUID="+$rootScope.uuid+"&CURRENT_URL="+$location.url()+"&USER_ID="+localStorageService.get('userId')+"&TP_ID="+$stateParams.tpId+"&EP_ID="+$stateParams.epId+"&showflag="+showflag ;
            // window.open(sub_url, '_blank')
            newWin.location.href = sub_url;
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
        // var p = {};
        // p.TP_ID = $stateParams.tpId
        // Init.iwbhttp('/plan/initProductInfo', p, function(data,header,config,status){
        //     console.log(data)
        //     console.log(JSON.stringify(data))
        // },function(data,header,config,status){
        // });
        // var p = {};
        // p.TP_ID = $stateParams.tpId
        // Init.iwbhttp('/plan/initOverview', p, function(data,header,config,status){
        //     console.log(data)
        //     console.log("sssssssssssss")
        //    console.log(JSON.stringify(data))
        // },function(data,header,config,status){
        // });
        // var p = {};
        // p.TP_ID = $stateParams.tpId
        // Init.iwbhttp('/plan/initReduction', p, function(data,header,config,status){
        //     console.log(data)
        //     console.log("sssssssssssss")
        //    console.log(JSON.stringify(data))
        // },function(data,header,config,status){
        // });
        // var p = {};
        // p.TP_ID = $stateParams.tpId
        // Init.iwbhttp('/plan/initTransfer', p, function(data,header,config,status){
        //     console.log(data)
        //     console.log("sssssssssssss")
        //    console.log(JSON.stringify(data))
        // },function(data,header,config,status){
        // });
        // var p = {};
        // p.TP_ID = $stateParams.tpId
        // Init.iwbhttp('/plan/initHandleSelf', p, function(data,header,config,status){
        //     console.log(data)
        //     console.log("sssssssssssss")
        //    console.log(JSON.stringify(data))
        // },function(data,header,config,status){
        // });
        var p = {};
        p.TP_ID = $stateParams.tpId
        Init.iwbhttp('/plan/initHandle', p, function(data,header,config,status){
            console.log(data)
            console.log("sssssssssssss")
           console.log(JSON.stringify(data))
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
        // var p = {};
        // p.EP_ID = $stateParams.epId;
        // p.TP_ID = $stateParams.tpId;
        // p.PRODUCT_DESC = 'aaa'
        // p.PRODUCT_ORI = [
        //     {
        //         "NAME": "111", 
        //         "UNIT": "aaa",
        //         "LAST_NUM": "100.00",
        //         "YEAR_NUM": "1000.00",
        //     },
        //     {
        //         "NAME": "222", 
        //         "UNIT": "bbb",
        //         "LAST_NUM": "100.00",
        //         "YEAR_NUM": "1000.00",
        //     }
        // ]
        // p.PRODUCT_EQU = [
        //     {
        //         "NAME": "111", 
        //         "UNIT": "aaa",
        //         "LAST_NUM": "100.00",
        //         "YEAR_NUM": "1000.00",
        //     },
        //     {
        //         "NAME": "222", 
        //         "UNIT": "bbb",
        //         "LAST_NUM": "100.00",
        //         "YEAR_NUM": "1000.00",
        //     }
        // ]
        // p.PRODUCT_OUTPUT = [
        //     {
        //         "NAME": "111", 
        //         "UNIT": "aaa",
        //         "LAST_NUM": "100.00",
        //         "YEAR_NUM": "1000.00",
        //     },
        //     {
        //         "NAME": "222", 
        //         "UNIT": "bbb",
        //         "LAST_NUM": "100.00",
        //         "YEAR_NUM": "1000.00",
        //     }
        // ]
        // console.log(JSON.stringify(p));
        // Init.iwbhttp('/plan/saveProductInfo', p, function(data,header,config,status){
        //     console.log(data)
          
        // },function(data,header,config,status){
        // });
        // var p = {};
        // p.EP_ID = $stateParams.epId;
        // p.TP_ID = $stateParams.tpId;
        // p.LIST = [
        //     {
        //         "D_NAME": "aa", 
        //         "UNIT": "bb", 
        //         "LAST_NUM": "11", 
        //         "YEAR_NUM": "22", 
        //         "BIG_CATEGORY_ID": "cc", 
        //         "BIG_CATEGORY_NAME": "dd", 
        //         "SAMLL_CATEGORY_ID": "ee", 
        //         "SAMLL_CATEGORY_NAME": "ff", 
        //         "W_SHAPE": "gg", 
        //         "W_NAME": "hh", 
        //         "CHARACTER": "ii", 
        //         "SOURCE_PROCESS": "gg"
        //     },
        //     {
        //         "D_NAME": "aa11", 
        //         "UNIT": "bb11", 
        //         "LAST_NUM": "1100", 
        //         "YEAR_NUM": "2200", 
        //         "BIG_CATEGORY_ID": "cc11", 
        //         "BIG_CATEGORY_NAME": "dd11", 
        //         "SAMLL_CATEGORY_ID": "ee11", 
        //         "SAMLL_CATEGORY_NAME": "ff11", 
        //         "W_SHAPE": "gg11", 
        //         "W_NAME": "hh11", 
        //         "CHARACTER": "ii11", 
        //         "SOURCE_PROCESS": "gg11"
        //     }
        // ]
        // var p = {};
        // p.EP_ID = $stateParams.epId;
        // p.TP_ID = $stateParams.tpId;
        // p.PLAN_REDUCTION = 'fdasfdasfdas'
        // p.MEASURES_REDUCTION = 'aaadfsafdasfafda1111111'
       
        // console.log(JSON.stringify(p));
        // Init.iwbhttp('/plan/saveReduction', p, function(data,header,config,status){
        //     console.log(data)
          
        // },function(data,header,config,status){
        // });
        // var p = {};
        // p.TP_ID = $stateParams.tpId;
        // p.CC_1 = '0'
        // p.CC_2 = '1'
        // p.CC_3 = '0'
        // p.CC_4 = '1'
        // p.CC_5 = '0'
        // p.CC_PROCESS = 'aaa'
        // p.TRANSFER_FACILITY = [
        //     {
        //         "NAME": "111", 
        //         "STORE":"111111",
        //         "UNIT": "吨",
        //         "NUM": "100.00",
        //         "NUM_UNIT": "个",
        //         "AREA": "100",
        //         "AREA_UNIT": "平方米",
        //         "TYPE": "bbb",
        //     },
        //     {
        //         "NAME": "111", 
        //         "STORE":"111111",
        //         "UNIT": "吨",
        //         "NUM": "100.00",
        //         "NUM_UNIT": "个",
        //         "AREA": "100",
        //         "AREA_UNIT": "平方米",
        //         "TYPE": "bbb",
        //     }
        // ]
        // p.TRANSFER_CC = [
        //     {
        //         "D_NAME": "111", 
        //         "BIG_CATEGORY_ID": "HW01",
        //         "BIG_CATEGORY_NAME": "放大睡觉了；房间打扫；",
        //         "STORE_REASON": "啊啊啊",
        //         "STORE_PLAN": "1000.00",
        //         "STORE_PLAN_UNIT": "吨",
        //         "STORE_LAST": "1000.00",
        //         "STORE_LAST_UNIT": "个",
        //         "STORE_LASTSUM": "100.00",
        //         "STORE_LASTSUM": "吨",
        //     },
        //     {
        //         "D_NAME": "111", 
        //         "BIG_CATEGORY_ID": "HW01",
        //         "BIG_CATEGORY_NAME": "放大睡觉了；房间打扫；",
        //         "STORE_REASON": "啊啊啊",
        //         "STORE_PLAN": "1000.00",
        //         "STORE_PLAN_UNIT": "吨",
        //         "STORE_LAST": "1000.00",
        //         "STORE_LAST_UNIT": "个",
        //         "STORE_LASTSUM": "100.00",
        //         "STORE_LASTSUM": "吨",
        //     },
        //     {
        //         "D_NAME": "111", 
        //         "BIG_CATEGORY_ID": "HW01",
        //         "BIG_CATEGORY_NAME": "放大睡觉了；房间打扫；",
        //         "STORE_REASON": "啊啊啊",
        //         "STORE_PLAN": "1000.00",
        //         "STORE_PLAN_UNIT": "吨",
        //         "STORE_LAST": "1000.00",
        //         "STORE_LAST_UNIT": "个",
        //         "STORE_LASTSUM": "100.00",
        //         "STORE_LASTSUM": "吨",
        //     }
        // ]
        // p.TRANSFER_YS = [
        //     {
        //         "EN_ID_YS": "111", 
        //         "EN_NAME_YS": "aaa",
        //         "YS_ZZ": "bbb",
        //         "YS_1": "1",
        //         "YS_2": "0",
        //         "YS_3": "1",
        //         "YS_PROCESS": "aaaaaaaaa",
        //     },
        //     {
        //         "EN_ID_YS": "222", 
        //         "EN_NAME_YS": "bbb",
        //         "YS_ZZ": "bbb",
        //         "YS_1": "1",
        //         "YS_2": "0",
        //         "YS_3": "1",
        //         "YS_PROCESS": "bbbbbbbbbbb",
        //     },
        //     {
        //         "EN_ID_YS": "111", 
        //         "EN_NAME_YS": "aaa",
        //         "YS_ZZ": "bbb",
        //         "YS_1": "1",
        //         "YS_2": "0",
        //         "YS_3": "1",
        //         "YS_PROCESS": "aaaaaaaaa",
        //     },
        //     {
        //         "EN_ID_YS": "222", 
        //         "EN_NAME_YS": "bbb",
        //         "YS_ZZ": "bbb",
        //         "YS_1": "1",
        //         "YS_2": "0",
        //         "YS_3": "1",
        //         "YS_PROCESS": "bbbbbbbbbbb",
        //     },
        //     {
        //         "EN_ID_YS": "111", 
        //         "EN_NAME_YS": "aaa",
        //         "YS_ZZ": "bbb",
        //         "YS_1": "1",
        //         "YS_2": "0",
        //         "YS_3": "1",
        //         "YS_PROCESS": "aaaaaaaaa",
        //     },
        //     {
        //         "EN_ID_YS": "222", 
        //         "EN_NAME_YS": "bbb",
        //         "YS_ZZ": "bbb",
        //         "YS_1": "1",
        //         "YS_2": "0",
        //         "YS_3": "1",
        //         "YS_PROCESS": "bbbbbbbbbbb",
        //     }
        // ]
        // console.log(JSON.stringify(p));
        // Init.iwbhttp('/plan/saveTransfer', p, function(data,header,config,status){
        //     console.log(data)
          
        // },function(data,header,config,status){
        // });
        // var p = {};
        // p.TP_ID = $stateParams.tpId;
        // p.FACILITY_NAME = '放大'
        // p.FACILITY_TYPE = '范德萨发'
        // p.FACILITY_ADDRESS = '放大书法大赛嘎的说法'
        // p.INVEST_SUM = '1'
        // p.INVEST_SUM_UNIT = '吨'
        // p.DESIGN = '放大书法'
        // p.DESIGN_TIME = '十年'
        // p.RUN_TIME = '二年'
        // p.RUN_MONEY = '10'
        // p.RUN_MONEY_UNIT = '万元'
        // p.FACILITY_SUM = '放大书法大赛'
        // p.HANDLE_EFFECT = '范德萨发大水'
        // p.DB_1 = '1'
        // p.DB_2 = '0'
        // p.DESC_CONTENT = '范德萨范德萨发大水萨法'
        // p.MEASURE = '啊啊啊啊啊啊啊啊啊啊啊啊啊啊'
        // p.HANDLE_LIST = [
        //     {
        //         "D_NAME": "", 
        //     "STORE_YEAR": "100", 
        //     "STORE_PLAN_UNIT": "吨", 
        //     "STORE_LAST": "1000", 
        //     "STORE_LAST_UNIT": "个"
        //     },
        //     {
        //         "D_NAME": "", 
        //     "STORE_YEAR": "200", 
        //     "STORE_PLAN_UNIT": "吨", 
        //     "STORE_LAST": "2000", 
        //     "STORE_LAST_UNIT": "个"
        //     }
        // ]
       
        // console.log(JSON.stringify(p));
        // Init.iwbhttp('/plan/saveHandleSelf', p, function(data,header,config,status){
        //     console.log(data)
          
        // },function(data,header,config,status){
        // });
        // var p = {};
        // p.TP_ID = $stateParams.tpId;
        // p.LIST = [
        //     {
        //         "EN_ID_CZ": "EP00000000001", 
        //     "EN_NAME_CZ": "范德萨发生发撒附近开了；阿", 
        //     "LINCENSE_NO": "1234567", 
        //     "D_NAME": "范德萨", 
        //     "BIG_CATEGORY_ID": "HW01", 
        //     "HANDLE_TYPE": "范德萨", 
        //     "YEAR_NUM": "100", 
        //     "LAST_NUM": "100", 
        //     "UNIT": "吨"
        //     },
        //     {
        //         "EN_ID_CZ": "EP00000000002", 
        //     "EN_NAME_CZ": "范德萨发生发撒附近开了；阿", 
        //     "LINCENSE_NO": "1234567", 
        //     "D_NAME": "范德萨", 
        //     "BIG_CATEGORY_ID": "HW01", 
        //     "HANDLE_TYPE": "范德萨", 
        //     "YEAR_NUM": "100", 
        //     "LAST_NUM": "100", 
        //     "UNIT": "吨"
        //     },
        //     {
        //         "EN_ID_CZ": "EP00000000003", 
        //     "EN_NAME_CZ": "aaaaaaaaaaaa", 
        //     "LINCENSE_NO": "1234567", 
        //     "D_NAME": "范德萨", 
        //     "BIG_CATEGORY_ID": "HW01", 
        //     "HANDLE_TYPE": "范德萨", 
        //     "YEAR_NUM": "100", 
        //     "LAST_NUM": "100", 
        //     "UNIT": "吨"
        //     }
        // ]
       
        // console.log(JSON.stringify(p));
        // Init.iwbhttp('/plan/saveHandle', p, function(data,header,config,status){
        //     console.log(data)
          
        // },function(data,header,config,status){
        // });
        //  var p = {};
        // p.TP_ID = $stateParams.tpId;
        // p.LIST = [
        //     {
        //         "D_NAME": "aa", 
        //         "UNIT": "吨", 
        //         "LAST_NUM": "100", 
        //         "YEAR_NUM": "1000", 
        //         "BIG_CATEGORY_ID": "HW01", 
        //         "BIG_CATEGORY_NAME": "范德萨", 
        //         "SAMLL_CATEGORY_ID": "1124325432", 
        //         "SAMLL_CATEGORY_NAME": "范德萨发撒发撒的", 
        //         "W_SHAPE": "范德萨", 
        //         "W_NAME": "范德萨", 
        //         "CHARACTER": "啊啊啊", 
        //         "SOURCE_PROCESS": "afd"
        //     },
        //     {
        //         "D_NAME": "aa", 
        //         "UNIT": "吨", 
        //         "LAST_NUM": "100", 
        //         "YEAR_NUM": "1000", 
        //         "BIG_CATEGORY_ID": "HW01", 
        //         "BIG_CATEGORY_NAME": "范德萨", 
        //         "SAMLL_CATEGORY_ID": "1124325432", 
        //         "SAMLL_CATEGORY_NAME": "范德萨发撒发撒的", 
        //         "W_SHAPE": "范德萨", 
        //         "W_NAME": "范德萨", 
        //         "CHARACTER": "啊啊啊", 
        //         "SOURCE_PROCESS": "afd"
        //     },
        //     {
        //         "D_NAME": "aa", 
        //         "UNIT": "吨", 
        //         "LAST_NUM": "100", 
        //         "YEAR_NUM": "1000", 
        //         "BIG_CATEGORY_ID": "HW01", 
        //         "BIG_CATEGORY_NAME": "范德萨", 
        //         "SAMLL_CATEGORY_ID": "1124325432", 
        //         "SAMLL_CATEGORY_NAME": "范德萨发撒发撒的", 
        //         "W_SHAPE": "范德萨", 
        //         "W_NAME": "范德萨", 
        //         "CHARACTER": "啊啊啊", 
        //         "SOURCE_PROCESS": "afd"
        //     }
        // ]
       
        // console.log(JSON.stringify(p));
        // Init.iwbhttp('/plan/saveOverview', p, function(data,header,config,status){
        //     console.log(data)
          
        // },function(data,header,config,status){
        // });
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