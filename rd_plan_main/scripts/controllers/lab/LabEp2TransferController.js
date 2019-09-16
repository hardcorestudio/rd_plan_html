'use strict';
angular.module('sbAdminApp').controller('LabEp2TransferCtrl', ['$scope','Init','Modal','$stateParams','$rootScope','localStorageService','$state','CheckBrowser','$location', '$interval','CheckParam',function ($scope,Init,Modal,$stateParams,$rootScope,localStorageService,$state,CheckBrowser,$location,$interval,CheckParam) {
    CheckBrowser.check();

    //弹框参数
    var resolve = {};
    var url = "";
    var ctrlName = "";
    //搜索内容
    $scope.searchContent = "";
    $scope.sourceList = [
        {
            value:'1',
            text:'个人'
        },
        {
            value:'2',
            text:'公司'
        }
    ]
    $scope.labList = [
        {
            value:'1',
            text:'第I类废铅蓄电池'
        },
        {
            value:'2',
            text:'第II类废铅蓄电池'
        }
    ]
    //所属环保局列表
    $scope.sepaList = "";
    //所属环保局默认全选
    $scope.sepaContent = "所属环保局：全部";
    $scope.sourceContent = "来源：全部";
    $scope.labContent = "电池类型：全部";
    $scope.sepaFlag = false;

    //table当前数据（页面数据页数等）
    $scope.pageData = "";

    $scope.param = {"orgCode": localStorageService.get("orgCode"), "ROLEID":localStorageService.get("ROLEID")};
    //table数据
    var table = $('#planTable').DataTable({
        "serverSide": true,
        "columns": [
            {
                "data": "ID"
            },
            {
                "data": "EN_NAME_CS"
            },
            {
                "data": "EN_NAME_CZ"
            },
            {
                "data": "SEPA_NAME"
            },
            {
                "data": "EN_TEL_CS"
            },
            {
                "data": "EN_TEL_CZ"
            },
            {
                "data": "COUNT"
            },
            {
                "data": "NUM"
            },
            {
                "data": "PLATE_NUM"
            },
            {
                "data": "DRIVER"
            },
            {
                "data": "flowdate"
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
            $scope.param.sourceValue = $scope.sourceValue;
            $scope.param.labValue = $scope.labValue;
            Init.iwbhttp('/admin/labEp2Transfer', $scope.param, function(data,header,config,status){
                var returnData = {};
                if(data.resFlag == 0){
                    returnData.recordsTotal = data.totalRow;//返回数据全部记录
                    returnData.recordsFiltered = data.totalRow;//后台不实现过滤功能，每次查询均视作全部结果
                    returnData.data = data.epList;//返回的数据列表
                    if($scope.sepaList == ""){
                        if(data.sepaList != null && data.sepaList != ""){
                            $scope.sepaList = data.sepaList;
                            $scope.sepaFlag = true;
                        }
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
    });

    $scope.format = function(d) {
        // `d` is the original data object for the row
        return '<div style="padding-left:36px;">'+
            '<div class="format_title">库存</div>'+
            '<div class="format_content">数量:'+d.COUNT+'个</div>'+
            '<div class="format_content">重量:'+d.NUM+'吨</div>'+
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
            var p = {
                COUNT:0,
                NUM:0
            }
            Init.iwbhttp('/admin/labEpStock', row.data(), function(data,header,config,status){
                if(data.resFlag == 0){
                    p = data.resData;
                }
                row.child($scope.format(p)).show();
                tr.addClass('shown');
            },function(data,header,config,status){
            });
        }
    } );

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

    //单击某个选项三秒单独选中
    var sourceTimeout;
    //全不选
    $scope.sourceMouseDown = function (obj) {
        sourceTimeout = setTimeout(function () {
            $('input[name="source"]').prop('checked', false);
        }, 1000);
    }
    //取消statusMouseDown里要执行的方法
    $scope.sourceMouseUp = function (obj) {
        clearTimeout(sourceTimeout);
    }

    //单击标题三秒全选
    var sourceAllTimeout;
    //全选
    $scope.sourceAllMouseDown = function (obj) {
        sourceAllTimeout = setTimeout(function () {
            $('input[name="source"]').prop('checked', true);
            $scope.sourceChoice();
        }, 1000);
    }
    //取消statusAllMouseDown里要执行的方法
    $scope.sourceAllMouseUp = function (obj) {
        clearTimeout(sourceAllTimeout);
    }

    //状态选项卡
    $scope.sourceChoice = function () {
        var sourceLength = $("input[name='source']:checked").length;
        if(sourceLength==0){
            $('#sourceDivId input[value='+$scope.sourceValue+']').prop('checked', true);
            $scope.open("至少选择一个来源");
            return;
        }
        $scope.sourceContent = "";
        $scope.sourceValue = "";
        //是否全选
        if(sourceLength==$scope.sourceList.length){
            $scope.sourceContent = "状态：全部";
            $scope.sourceValue = "";
        }else{
            $('input[name="source"]:checked').each(function () {
                var sourceVal = $(this).val();
                for (var i = 0; i < $scope.sourceList.length; i++) {
                    if ($scope.sourceList[i].value == sourceVal) {
                        if ($scope.sourceContent == null || $scope.sourceContent == "") {
                            $scope.sourceContent = "状态："+$scope.sourceList[i].text;
                            $scope.sourceValue = "'"+$scope.sourceList[i].value+"'";
                        } else {
                            $scope.sourceContent = $scope.sourceContent + "，" + $scope.sourceList[i].text;
                            $scope.sourceValue = $scope.sourceValue + ",'" + $scope.sourceList[i].value+"'";
                        }
                    }
                }
            });
        }
        //请求后台
        $scope.postService();
    }

    //单击某个选项三秒单独选中
    var labTimeout;
    //全不选
    $scope.labMouseDown = function (obj) {
        labTimeout = setTimeout(function () {
            $('input[name="lab"]').prop('checked', false);
        }, 1000);
    }
    //取消statusMouseDown里要执行的方法
    $scope.labMouseUp = function (obj) {
        clearTimeout(labTimeout);
    }

    //单击标题三秒全选
    var labAllTimeout;
    //全选
    $scope.labAllMouseDown = function (obj) {
        labAllTimeout = setTimeout(function () {
            $('input[name="lab"]').prop('checked', true);
            $scope.labChoice();
        }, 1000);
    }
    //取消statusAllMouseDown里要执行的方法
    $scope.labAllMouseUp = function (obj) {
        clearTimeout(labAllTimeout);
    }

    //状态选项卡
    $scope.labChoice = function () {
        console.log("aaa")
        var labLength = $("input[name='lab']:checked").length;
        if(labLength==0){
            $('#labDivId input[value='+$scope.labValue+']').prop('checked', true);
            $scope.open("至少选择一个电池类型");
            return;
        }
        $scope.labContent = "";
        $scope.labValue = "";
        //是否全选
        if(labLength==$scope.labList.length){
            $scope.labContent = "状态：全部";
            $scope.labValue = "";
        }else{
            $('input[name="lab"]:checked').each(function () {
                var labVal = $(this).val();
                for (var i = 0; i < $scope.labList.length; i++) {
                    if ($scope.labList[i].value == labVal) {
                        if ($scope.labContent == null || $scope.labContent == "") {
                            $scope.labContent = "状态："+$scope.labList[i].text;
                            $scope.labValue = "'"+$scope.labList[i].value+"'";
                        } else {
                            $scope.labContent = $scope.labContent + "，" + $scope.labList[i].text;
                            $scope.labValue = $scope.labValue + ",'" + $scope.labList[i].value+"'";
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
        $scope.param.sepaValue = $scope.sepaValue;
        $scope.param.sourceValue = $scope.sourceValue;
        $scope.param.labValue = $scope.labValue;
        Init.iwbhttp('/admin/labEp2Transfer', $scope.param, function(data,header,config,status){
            if (data.resFlag == 0) {
                for(var i = 0 ; i < data.epList.length ; i++)
                {
                    table.row(i).columns = data.epList[i];
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

}]);