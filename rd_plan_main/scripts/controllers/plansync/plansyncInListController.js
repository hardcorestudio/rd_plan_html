'use strict';
angular.module('sbAdminApp').controller('PlansyncInListCtrl', ['$scope','$rootScope','$state','Init','CheckBrowser','localStorageService','CheckParam','Modal','$stateParams', function ($scope,$rootScope,$state,Init,CheckBrowser,localStorageService,CheckParam,Modal,$stateParams) {

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
    $scope.statusContent = "状态：全部";

    //table当前数据（页面数据页数等）
    $scope.pageData = "";

    $scope.param = {"orgCode": localStorageService.get("orgCode"), "ROLEID":localStorageService.get("ROLEID")};
    //table数据
    var table = "";
    var p = {}
    p.jsonParam = {
        sxzqhdm:"120000"
    }
    p.method = "getYrKsldSq"
    p.url = $rootScope.syncUrl
    var returnData = {};
    Init.synchttp('/indexForCors',p, function(data,header,config,status){
        if(data.length > 0){
            table = $('#epTable').DataTable({
                "data": data,
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
                            $(nTd).html("<div class='btn-group-vertical'><button type='button' class='btn btn-primary btn-sm dropdown-toggle' data-toggle='dropdown' id='a_check'>回复</button></div>");
                        }
                    },
                    {
                        "data": "zysqclid"
                    },
                    {
                        "data": "ycsxzqhdm"
                    },
                    {
                        "data": "wfycdwmc"
                    },
                    {
                        "data": "ksrq"
                    },
                    {
                        "data": "jsrq"
                    },
                    {
                        "data": "sqrq"
                    },
                    {
                        "data": "yrsxzqhdm"
                    },
                    {
                        "data": "jsdwxkzbh"
                    },
                    {
                        "data": "wfjsdwmc"
                    },
                    {
                        "data": "hfrq"
                    },
                    {
                        "data": "sqjg"
                    },
                    {
                        "data": "sprq",
                    },
                    {
                        "data": "spjg"
                    },
                ],
                "ordering":  false,
                "language": {
                    "lengthMenu": "每页 _MENU_ 条记录 ",
                    "zeroRecords": "没有找到记录",
                    "info": "第 _PAGE_ 页 ( 总共 _PAGES_ 页,共_TOTAL_条 )",
                    "infoEmpty": "无记录",
                    "search": "搜索 : ",
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
                ]
            });
        }
    },function(data,header,config,status){
    });
    // var table = $('#epTable').DataTable({
    //     "serverSide": true,
    //     "columns": [
    //         {
    //             "class":          'details-control',
    //             "orderable":      false,
    //             "data":           null,
    //             "defaultContent": ''
    //         },
    //         {
    //             "class": "mytable-center",
    //             "targets": -1,
    //             "data": null,
    //             "fnCreatedCell": function (nTd, sData, oData, iRow, iCol) {
    //                 $(nTd).html("<div class='btn-group-vertical'><button type='button' class='btn btn-primary btn-sm dropdown-toggle' data-toggle='dropdown' id='a_check'>回复</button></div>");
    //             }
    //         },
    //         {
    //             "data": "zysqclid"
    //         },
    //         {
    //             "data": "ycsxzqhdm"
    //         },
    //         {
    //             "data": "wfycdwmc"
    //         },
    //         {
    //             "data": "ksrq"
    //         },
    //         {
    //             "data": "jsrq"
    //         },
    //         {
    //             "data": "sqrq"
    //         },
    //         {
    //             "data": "yrsxzqhdm"
    //         },
    //         {
    //             "data": "jsdwxkzbh"
    //         },
    //         {
    //             "data": "wfjsdwmc"
    //         },
    //         {
    //             "data": "hfrq"
    //         },
    //         {
    //             "data": "sqjg"
    //         },
    //         {
    //             "data": "sprq"
    //         },
    //         {
    //             "data": "spjg"
    //         },
            
    //     ],
    //     ajax:function(data, callback, settings){
    //         var p = {}
    //         p.jsonParam = {
    //             sxzqhdm:"120000"
    //         }
    //         p.method = "getYrKsldSq"
    //         p.url = $rootScope.syncUrl
    //         var returnData = {};
    //         Init.synchttp(p, function(data,header,config,status){
    //             if(data.length > 0){
    //                 returnData.recordsTotal = data.length;//返回数据全部记录
    //                 returnData.recordsFiltered = data.length;//后台不实现过滤功能，每次查询均视作全部结果
    //                 returnData.data = data
    //                 $scope.datalist = data
    //                 callback(returnData)
    //             }
    //         },function(data,header,config,status){
    //         });
    //     },
    //     "ordering":  false,
    //     "searching": true,
    //     "language": {
    //         "lengthMenu": "每页 _MENU_ 条记录 ",
    //         "zeroRecords": "没有找到记录",
    //         "info": "第 _PAGE_ 页 ( 总共 _PAGES_ 页,共_TOTAL_条 )",
    //         "infoEmpty": "无记录",
    //         "search": "搜索 : _INPUT_",
    //         "paginate": {
    //             "first": "首页",
    //             "last": "尾页",
    //             "next": "下一页",
    //             "previous": "前一页"
    //         },
    //         "infoFiltered": "(从 _MAX_ 条记录过滤)"
    //     },
    //     "pagingType": "full_numbers",
    //     "scrollX": true,
    //     "scrollXInner": "100%",
    //     "scrollY": "350px",
    //     "scrollCollapse": true,
    // });


    //查看详情
    $('#epTable tbody').on('click', '#a_check', function () {
        var row = table.row($(this).parents('tr'));
        var data = row.data();
        var p = {
            "zysqclid" : data.zysqclid,
            "hfrq" : data.hfrq,
            "sqjg" : data.sqjg,
            "url" : $rootScope.syncUrl,
            "method" : "saveKsldSqHf",
        }
        if(data.sqjg != ""){
            $scope.open("已审批，不能回复.")
        }else{
            $scope.reply(p)
        }
    });

    // //单击某个选项三秒单独选中
    // var statusTimeout;
    // //全不选
    // $scope.statusMouseDown = function (obj) {
    //     statusTimeout = setTimeout(function () {
    //         $('input[name="status"]').prop('checked', false);
    //     }, 1000);
    // }
    // //取消statusMouseDown里要执行的方法
    // $scope.statusMouseUp = function (obj) {
    //     clearTimeout(statusTimeout);
    // }

    // //单击标题三秒全选
    // var statusAllTimeout;
    // //全选
    // $scope.statusAllMouseDown = function (obj) {
    //     statusAllTimeout = setTimeout(function () {
    //         $('input[name="status"]').prop('checked', true);
    //         $scope.statusChoice();
    //     }, 1000);
    // }
    // //取消statusAllMouseDown里要执行的方法
    // $scope.statusAllMouseUp = function (obj) {
    //     clearTimeout(statusAllTimeout);
    // }

    // //状态选项卡
    // $scope.statusChoice = function () {
    //     var statusLength = $("input[name='status']:checked").length;
    //     if(statusLength==0){
    //         $('#statusDivId input[value='+$scope.statusValue+']').prop('checked', true);
    //         $scope.open("至少选择一个状态");
    //         return;
    //     }
    //     $scope.statusContent = "";
    //     $scope.statusValue = "";
    //     //是否全选
    //     if(statusLength==$scope.statusList.length){
    //         $scope.statusContent = "状态：全部";
    //         $scope.statusValue = "";
    //     }else{
    //         $('input[name="status"]:checked').each(function () {
    //             var statusVal = $(this).val();
    //             for (var i = 0; i < $scope.statusList.length; i++) {
    //                 if ($scope.statusList[i].value == statusVal) {
    //                     if ($scope.statusContent == null || $scope.statusContent == "") {
    //                         $scope.statusContent = "状态："+$scope.statusList[i].text;
    //                         $scope.statusValue = "'"+$scope.statusList[i].value+"'";
    //                     } else {
    //                         $scope.statusContent = $scope.statusContent + "，" + $scope.statusList[i].text;
    //                         $scope.statusValue = $scope.statusValue + ",'" + $scope.statusList[i].value+"'";
    //                     }
    //                 }
    //             }
    //         });
    //     }
    //     //请求后台
    //     $scope.postService();
    // }

    // //单击某个选项三秒单独选中
    // var sepaTimeout;
    // //全不选
    // $scope.sepaMouseDown = function (obj) {
    //     sepaTimeout = setTimeout(function () {
    //         $('input[name="sepa"]').prop('checked', false);
    //     }, 1000);
    // }
    // //取消sepaMouseDown里要执行的方法
    // $scope.sepaMouseUp = function (obj) {
    //     clearTimeout(sepaTimeout);
    // }

    // //单击标题三秒全选
    // var sepaAllTimeout;
    // //全选
    // $scope.sepaAllMouseDown = function (obj) {
    //     sepaAllTimeout = setTimeout(function () {
    //         $('input[name="sepa"]').prop('checked', true);
    //         $scope.sepaChoice();
    //     }, 1000);
    // }
    // //取消sepaAllMouseDown里要执行的方法
    // $scope.sepaAllMouseUp = function (obj) {
    //     clearTimeout(sepaAllTimeout);
    // }

    // //所属环保局选项卡
    // $scope.sepaChoice = function () {
    //     var checkLength = $("input[name='sepa']:checked").length;
    //     if(checkLength==0){
    //         $('#sepaDivId input[value='+$scope.sepaValue+']').prop('checked', true);
    //         $scope.open("至少选择一个所属环保局");
    //         return;
    //     }
    //     $scope.sepaContent = "";
    //     $scope.sepaValue = "";
    //     //是否全选
    //     if(checkLength==$scope.sepaList.length){
    //         $scope.sepaContent = "所属环保局：全部";
    //         $scope.sepaValue = "";
    //     }else{
    //         $('input[name="sepa"]:checked').each(function () {
    //             var statusVal = $(this).val();
    //             for (var i = 0; i < $scope.sepaList.length; i++) {
    //                 if ($scope.sepaList[i].value == statusVal) {
    //                     if ($scope.sepaContent == null || $scope.sepaContent == "") {
    //                         $scope.sepaContent = "所属环保局："+$scope.sepaList[i].text;
    //                         $scope.sepaValue = "'"+$scope.sepaList[i].value+"'";
    //                     } else {
    //                         $scope.sepaContent = $scope.sepaContent + "，" + $scope.sepaList[i].text;
    //                         $scope.sepaValue = $scope.sepaValue + ",'" + $scope.sepaList[i].value+"'";
    //                     }
    //                 }
    //             }
    //         });
    //     }
    //     //请求后台
    //     $scope.postService();
    // }

    // //请求后台
    // $scope.postService = function (){
    //     if (table != undefined && table.search() != null) {
    //         $scope.searchContent = table.search();
    //     }
    //     $scope.param.searchContent = $scope.searchContent;
    //     $scope.param.statusValue = $scope.statusValue;
    //     $scope.param.sepaValue = $scope.sepaValue;
    //     Init.iwbhttp('/plan/planList', $scope.param, function(data,header,config,status){
    //         if (data.resFlag == 0) {
    //             for(var i = 0 ; i < data.epList.length ; i++)
    //             {
    //                 table.row(i).columns = data.epList[i];
    //             }
    //             table.draw();
    //         } else {
    //             $scope.open(data.msg);
    //         }
    //     },function(data,header,config,status){
    //     });
    // }

    // $scope.applyBtn = function(){
    //     $scope.param.epId = localStorageService.get('epId');
    //     Init.iwbhttp('/plan/apply', $scope.param, function(data,header,config,status){
    //         if(data.resFlag == '0'){
    //             $scope.postService()
    //         }else{
    //             $scope.open(data.resMsg);
    //         }
    //     },function(data,header,config,status){
    //     });
    // }

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
        var fwsz = ""
        for(var i = 0 ; i<d.fwsz.length ; i++){
            fwsz += '<tr>'+
                '<td>'+(i+1)+'</td>'+
                '<td>'+d.fwsz[i].fwmc+'</td>'+
                '<td>HW'+d.fwsz[i].fwlb+'</td>'+
                '<td>'+d.fwsz[i].fwdm+'</td>'+
                '<td>'+d.fwsz[i].zysl+'</td>'+
                '<td>'+d.fwsz[i].jldw+'</td>'+
            '</tr>'
        }
        return '<div style="padding-left:36px;">'+
            '<div class="format_title">移出单位信息</div>'+
            '<table cellpadding="3" cellspacing="0" border="0" style="padding-left:10px;">'+
                '<tr>'+
                    '<td>单位名称</td>'+
                    '<td>县级政区划代码</td>'+
                    '<td>单位地址</td>'+
                    '<td>联系人</td>'+
                    '<td>联系人手机</td>'+
                '</tr>'+
                '<tr>'+
                    '<td>'+d.wfycdwmc+'</td>'+
                    '<td>'+d.ycsxzqhdm+'</td>'+
                    '<td>'+d.wfycdwdz+'</td>'+
                    '<td>'+d.wfycdwlxr+'</td>'+
                    '<td>'+d.fwycdwlxrsj+'</td>'+
                '</tr>'+
            '</table>'+
            '<div class="format_title">移入单位信息</div>'+
            '<table cellpadding="3" cellspacing="0" border="0" style="padding-left:10px;">'+
                '<tr>'+
                    '<td>单位名称</td>'+
                    '<td>县级政区划代码</td>'+
                    '<td>经营许可证号</td>'+
                    '<td>单位地址</td>'+
                    '<td>联系人</td>'+
                    '<td>联系人手机</td>'+
                '</tr>'+
                '<tr>'+
                    '<td>'+d.wfjsdwmc+'</td>'+
                    '<td>'+d.yrsxzqhdm+'</td>'+
                    '<td>'+d.jsdwxkzbh+'</td>'+
                    '<td>'+d.wfjsdz+'</td>'+
                    '<td>'+d.wfjsdwlxr+'</td>'+
                    '<td>'+d.wfjsdwlxrsj+'</td>'+
                '</tr>'+
            '</table>'+
            '<div class="format_title">废物信息</div>'+
            '<table cellpadding="3" cellspacing="0" border="0" style="padding-left:10px;">'+
                '<tr>'+
                    '<td>序号</td>'+
                    '<td>废物名称</td>'+
                    '<td>废物类别</td>'+
                    '<td>危险废物代码</td>'+
                    '<td>转移数量</td>'+
                    '<td>计量单位（吨,桶）</td>'+
                '</tr>'+
                fwsz+
            '</table>'+
        '</div>';
    }

    $('#epTable tbody').on('click', 'td.details-control', function () {
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

    $scope.reply = function (parm){
        url = 'views/dashboard/plansync/replyModal.html';
        ctrlName = 'ReplyModalCtrl';
        resolve = {
            parm: function () {
                return parm;
            },
            content: function () {
                return '回复';
            },
        };
        var modalInstance = Modal.modal(url, ctrlName, resolve, function (result) {
            if(angular.equals("succeed",result)){
                var p = {}
                p.jsonParam = {
                    sxzqhdm:"120000"
                }
                p.method = "getYrKsldSq"
                p.url = $rootScope.syncUrl
                Init.synchttp('/indexForCors',p, function(data,header,config,status){
                    if (data.length > 0 ) {
                        table.clear().draw();
                        table.rows.add(data); // Add new data
                        table.columns.adjust().draw(); 
                    }
                },function(data,header,config,status){
                });
            }
        }, function () {

        });
    } 
}]);