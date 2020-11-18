'use strict';
angular.module('sbAdminApp').controller('EnterpriseFileListCtrl', ['$scope','Init','Modal','$stateParams','$rootScope','localStorageService','$state','CheckBrowser','$location', '$interval','CheckParam',function ($scope,Init,Modal,$stateParams,$rootScope,localStorageService,$state,CheckBrowser,$location,$interval,CheckParam) {
    CheckBrowser.check();

    //弹框参数
    var resolve = {};
    var url = "";
    var ctrlName = "";
    //搜索内容
    $scope.searchContent = "";
    //状态列表
    $scope.statusList = "";
    //所属环保局列表
    $scope.sepaList = "";
    //所属环保局默认全选
    $scope.sepaContent = "所属环保局：全部";
    $scope.sepaFlag = false;
    //状态默认全选
    $scope.statusFlag = true;
    $scope.statusContent = "状态";

    //table当前数据（页面数据页数等）
    $scope.pageData = "";

    $scope.param = {"orgCode": localStorageService.get("orgCode"), "ROLEID":localStorageService.get("ROLEID")};
    //table数据
    var table = $('#planTable').DataTable({
        "serverSide": true,
        "columns": [
            {
                "class":          'details-control',
                "orderable":      false,
                "data":           null,
                "defaultContent": ''
            },
            {
                "class": "mytable-center",
                "targets": -1,
                "data": null,
                "fnCreatedCell": function (nTd, sData, oData, iRow, iCol) {
                    $(nTd).html("<div class='btn-group-vertical'><button type='button' class='btn btn-success btn-sm dropdown-toggle' data-toggle='dropdown' id='a_check'>查看详情</button></div>");
                }
            },
            {
                "data": "TP_ID"
            },
            {
                "data": "EP_NAME"
            },
            {
                "data": "REGISTERCODE"
            },
            {
                "data": "PDP"
            },
            {
                "data": "plandate"
            },
            {
                "data": "SEPA_NAME"
            },
            {
                "class": "mytable-borderNone",
                "data": "statusname"
            },
        ],
        ajax:function(data, callback, settings){
            $scope.param.ps = data.length +"";
            $scope.param.start = data.start + "";
            $scope.param.pn = ((data.start/data.length) +1)+"";
            if(table != undefined && table.search() != null){
                $scope.searchContent = table.search();
            }
            $scope.param.searchContent = CheckParam.checkSql($scope.searchContent);
            $scope.param.sepaValue = $scope.sepaValue;
            $scope.param.statusValue = $scope.statusValue;
            Init.iwbhttp('/admin/enterpriseFileList', $scope.param, function(data,header,config,status){
                var returnData = {};
                if(data.resFlag == 0){
                    returnData.recordsTotal = data.totalRow;//返回数据全部记录
                    returnData.recordsFiltered = data.totalRow;//后台不实现过滤功能，每次查询均视作全部结果
                    returnData.data = data.planList;//返回的数据列表
                    if($scope.sepaList == ""){
                        if(data.sepaList != null && data.sepaList != ""){
                            $scope.sepaList = data.sepaList;
                            $scope.sepaFlag = true;
                        }
                    }
                    if($scope.statusList == ""){
                        $scope.statusList = data.statusList;
                    }
                    callback(returnData);
                }else{
                    $scope.open(data.msg);
                }
            },function(data,header,config,status){
            });
        },
        "ordering":  false,
        "searching": true,
        "language": {
            "lengthMenu": "每页 _MENU_ 条记录 ",
            "zeroRecords": "没有找到记录",
            "info": "第 _PAGE_ 页 ( 总共 _PAGES_ 页,共_TOTAL_条 )",
            "infoEmpty": "无记录",
            "search": "搜索 : _INPUT_",
            "paginate": {
                "first": "首页",
                "last": "尾页",
                "next": "下一页",
                "previous": "前一页"
            },
            "infoFiltered": "(从 _MAX_ 条记录过滤)"
        },
        "pagingType": "full_numbers",
        "scrollX": true,
        "scrollXInner": "100%",
        "scrollY": "350px",
        "scrollCollapse": true,
        "columnDefs": [
            {
                searchable: false,
                targets: 0
            },
            {
                searchable: false,
                targets: 1
            }
        ],
    });


    //查看详情
    $('#planTable tbody').on('click', '#a_check', function () {
        var row = table.row($(this).parents('tr'));
        var data = row.data();
        var tpId = data.TP_ID;
        var epId = data.EP_ID;
        var epName = data.EP_NAME;
        var applyId = data.applyId;
        var newWin = window.open('about:blank');//过渡页面的url
        console.log(data.enterprise_file_url)
        var sub_url = data.enterprise_file_url
        // window.open(sub_url, '_blank')
        newWin.location.href = sub_url;
    });

    //单击某个选项三秒单独选中
    var statusTimeout;
    //全不选
    $scope.statusMouseDown = function (obj) {
        statusTimeout = setTimeout(function () {
            $('input[name="status"]').prop('checked', false);
        }, 1000);
    }
    //取消statusMouseDown里要执行的方法
    $scope.statusMouseUp = function (obj) {
        clearTimeout(statusTimeout);
    }

    //单击标题三秒全选
    var statusAllTimeout;
    //全选
    $scope.statusAllMouseDown = function (obj) {
        statusAllTimeout = setTimeout(function () {
            $('input[name="status"]').prop('checked', true);
            $scope.statusChoice();
        }, 1000);
    }
    //取消statusAllMouseDown里要执行的方法
    $scope.statusAllMouseUp = function (obj) {
        clearTimeout(statusAllTimeout);
    }

    //状态选项卡
    $scope.statusChoice = function () {
        var statusLength = $("input[name='status']:checked").length;
        if(statusLength==0){
            $('#statusDivId input[value='+$scope.statusValue+']').prop('checked', true);
            $scope.open("至少选择一个状态");
            return;
        }
        $scope.statusContent = "";
        $scope.statusValue = "";
        //是否全选
        if(statusLength==$scope.statusList.length){
            $scope.statusContent = "状态：全部";
            $scope.statusValue = "";
        }else{
            $('input[name="status"]:checked').each(function () {
                var statusVal = $(this).val();
                for (var i = 0; i < $scope.statusList.length; i++) {
                    if ($scope.statusList[i].value == statusVal) {
                        if ($scope.statusContent == null || $scope.statusContent == "") {
                            $scope.statusContent = "状态："+$scope.statusList[i].text;
                            $scope.statusValue = "'"+$scope.statusList[i].value+"'";
                        } else {
                            $scope.statusContent = $scope.statusContent + "，" + $scope.statusList[i].text;
                            $scope.statusValue = $scope.statusValue + ",'" + $scope.statusList[i].value+"'";
                        }
                    }
                }
            });
        }
        //请求后台
        $scope.postService();
    }

    //单击某个选项三秒单独选中
    var sepaTimeout;
    //全不选
    $scope.sepaMouseDown = function (obj) {
        sepaTimeout = setTimeout(function () {
            $('input[name="sepa"]').prop('checked', false);
        }, 1000);
    }
    //取消sepaMouseDown里要执行的方法
    $scope.sepaMouseUp = function (obj) {
        clearTimeout(sepaTimeout);
    }

    //单击标题三秒全选
    var sepaAllTimeout;
    //全选
    $scope.sepaAllMouseDown = function (obj) {
        sepaAllTimeout = setTimeout(function () {
            $('input[name="sepa"]').prop('checked', true);
            $scope.sepaChoice();
        }, 1000);
    }
    //取消sepaAllMouseDown里要执行的方法
    $scope.sepaAllMouseUp = function (obj) {
        clearTimeout(sepaAllTimeout);
    }

    //所属环保局选项卡
    $scope.sepaChoice = function () {
        var checkLength = $("input[name='sepa']:checked").length;
        if(checkLength==0){
            $('#sepaDivId input[value='+$scope.sepaValue+']').prop('checked', true);
            $scope.open("至少选择一个所属环保局");
            return;
        }
        $scope.sepaContent = "";
        $scope.sepaValue = "";
        //是否全选
        if(checkLength==$scope.sepaList.length){
            $scope.sepaContent = "所属环保局：全部";
            $scope.sepaValue = "";
        }else{
            $('input[name="sepa"]:checked').each(function () {
                var statusVal = $(this).val();
                for (var i = 0; i < $scope.sepaList.length; i++) {
                    if ($scope.sepaList[i].value == statusVal) {
                        if ($scope.sepaContent == null || $scope.sepaContent == "") {
                            $scope.sepaContent = "所属环保局："+$scope.sepaList[i].text;
                            $scope.sepaValue = "'"+$scope.sepaList[i].value+"'";
                        } else {
                            $scope.sepaContent = $scope.sepaContent + "，" + $scope.sepaList[i].text;
                            $scope.sepaValue = $scope.sepaValue + ",'" + $scope.sepaList[i].value+"'";
                        }
                    }
                }
            });
        }
        //请求后台
        $scope.postService();
    }

    //请求后台
    $scope.postService = function (){
        if (table != undefined && table.search() != null) {
            $scope.searchContent = table.search();
        }
        $scope.param.searchContent = $scope.searchContent;
        $scope.param.statusValue = $scope.statusValue;
        $scope.param.sepaValue = $scope.sepaValue;
        Init.iwbhttp('/admin/enterpriseFileList', $scope.param, function(data,header,config,status){
            if (data.resFlag == 0) {
                for(var i = 0 ; i < data.planList.length ; i++)
                {
                    table.row(i).columns = data.planList[i];
                }
                table.draw();
            } else {
                $scope.open(data.msg);
            }
        },function(data,header,config,status){
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

    $scope.format = function(d) {
        // `d` is the original data object for the row
        console.log(d)
        return '<div style="padding-left:36px;">'+
            '<div style="display:flex;">'+
            '<div style="margin-right:100px">地址:'+d.ADRESS+'</div>'+
            '<div>经纬度:'+d.LONGITUDE+','+d.LATITUDE+'</div>'+
            '</div>'+
            '<div style="display:flex;">'+
            '<div style="margin-right:100px">行业代码:'+d.industry+'</div>'+
            '<div>法人:'+d.principal+'</div>'+
            '</div>'+
            '<div style="display:flex;">'+
            '<div style="margin-right:100px">联单量:'+d.num+'</div>'+
            '</div>'+
        '</div>';
    }

    $('#planTable tbody').on('click', 'td.details-control', function () {
        var tr = $(this).closest('tr');
        var row = table.row( tr );
        if ( row.child.isShown() ) {
            // This row is already open - close it
            row.child.hide();
            tr.removeClass('shown');
        }
        else {
            row.child($scope.format(row.data())).show();
            tr.addClass('shown');
        }
    } );

}]);