<template>
  <div id='transProvincialTransfer'>
    <my-aside
      :userRole="userRole"
      class="my-aside"
      :titleInfo="myTitleInfo"
      @doSubmit="doSubmit"
    ></my-aside>
    <div id="transProvincialTransferBg">
			<div v-for="(tptItem,tptIndex) in tptDataList" :key="tptIndex">
        <div class="tptFormTitle">危险废物跨省转移(表{{tptIndex + 1}})
          <div class="tptFormTitle_delText" @click="delFromByIndex(tptIndex)">删除</div>
          <div v-if="tptIndex == tptDataList.length - 1" class="tptFormTitle_newText" @click="addFromByIndex">新增</div>
        </div>
        <div class="tptFormBg">
          <assTitle
            :userRole="userRole"
            :titleInfo="title1"
          ></assTitle>
          <el-form
            class="tptElForm"
            :ref="'form_' + tptIndex"
            :model="tptItem.tptData"
            label-width="90px"
          >
            <el-row :gutter="20">
              <el-col :span="10">
                <el-form-item label="单位名称">
                  <el-input
                    v-model="tptItem.compName"
                    placeholder="必填"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="许可证编号">
                  <el-input
                    v-model="tptItem.licenceNo"
                    placeholder="必填"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-button
                  type="success"
                  plain
                  @click="doSearch(tptIndex)"
                >查询</el-button>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="单位名称">
                  <el-row>{{tptItem.tptData.compNameDetail}}</el-row>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="许可证编号">
                  <el-row>{{tptItem.tptData.licenceNoDetail}}</el-row>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="产品地址">
                  <el-row>{{tptItem.tptData.addrDetail}}</el-row>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item
                  label="处置单位市级行政代码"
                  class="cardDetail"
                >
                  <el-row>{{tptItem.tptData.cardDetail}}</el-row>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="联系人">
                  <el-row>{{tptItem.tptData.contactDetail}}</el-row>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="联系人电话">
                  <el-row>{{tptItem.tptData.contactPhoneDetail}}</el-row>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <assTptTitle
            :userRole="userRole"
            :titleInfo="title2"
          ></assTptTitle>
          <el-form
            class="tptElForm"
            :ref="'form' + tptIndex"
            :model="tptItem.transferData"
            label-width="136px"
            :rules="rules"
          >
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item
                  label="产生单位联系人"
                  prop="name"
                >
                  <el-input
                    v-model="tptItem.transferData.name"
                    placeholder="必填"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item
                  label="产生单位联系电话"
                  prop="phone"
                >
                  <el-input
                    v-model="tptItem.transferData.phone"
                    placeholder="手机号或区号-座机号码"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <assTptTitle
            :userRole="userRole"
            titleSize="small"
            :formStatus="tptItem.formStatus === 'card' ? '0' : '1'"
            :titleInfo="title3"
            titleType="reset"
            :tptIndex="tptIndex"
            @doReset="doResetUnitInfo"
            @formStatusChange="formStatusChange"
          ></assTptTitle>
          <assForm
            v-if="tptItem.formStatus === 'card'"
            :formList="tptItem.title1fromList"
            :type="userRole === 'CSEP' ? '' : 'label'"
          ></assForm>
          <assTable
            v-else-if="tptItem.formStatus === 'table'"
            :tableList="tptItem.formDataList"
            :tableTitleList="tptItem.formDataListTitle"
          ></assTable>
          <assTptTitle
            :userRole="userRole"
            titleSize="small"
            :titleInfo="title4"
            titleType="reset"
            :tptIndex="tptIndex"
            @doReset="doResetSituation"
          ></assTptTitle>
          <assFormTptItem
            v-if="tptItem.formStatus === 'card'"
            :type="userRole !== 'CSEP' ? 'label' : ''"
            v-for="(item,index) in tptItem.formList"
            :key="index"
            :formItem="item"
            :index="index"
            :listLength="tptItem.formList.length"
            :tptIndex="tptIndex"
            :nameList="nameList"
            @addSign="addSign"
            @reduceSign="reduceSign"
          ></assFormTptItem>
          <assTable
            v-if="tptItem.formStatus === 'table'"
            :tableList="tptItem.formDataList1"
            :tableTitleList="tptItem.formDataListTitle1"
          ></assTable>
          <el-dialog
            title="搜索结果"
            :visible.sync="tptItem.dialogTableVisible"
          >
            <el-table
              :data="tptItem.searchGridData"
              @current-change="handleSelectionChange"
            >
              <el-table-column
                type="index"
                width="50"
              >
              </el-table-column>
              <el-table-column
                property="dwmc"
                label="单位名称"
              ></el-table-column>
              <el-table-column
                property="xkzbh"
                label="许可证编号"
              ></el-table-column>
            </el-table>
          </el-dialog>
        </div>
      </div>
      <div class="footerSign"></div>
    </div>
  </div>
</template>
<script>
import Aside from '../Aside.vue';
import assTitle from '../../common/assTitle.vue'
import assTptTitle from '../../common/assTptTitle.vue'
import assForm from '../../common/assForm.vue'
import assTable from '../../common/assTable.vue'
import assFormTptItem from '../../common/assFormTptItem.vue'
import { checkBrowser, getQueryString } from '../../utils/browserCheck.js'
import fetch from '../../utils/fetch.js'
import fetchPt from '../../utils/fetchPt.js'
export default {
  name: 'transProvincialTransfer',
  data () {
    var validatePhone = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入'));
      } else {
        var regBox = {
          regEmail: /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,//邮箱
          regMobile: /^0?1[3|4|5|8][0-9]\d{8}$/,//手机
          regTel: /^0[\d]{2,3}-[\d]{7,8}$/
        }
        var mflag = regBox.regMobile.test(value);
        var tflag = regBox.regTel.test(value);
        if (mflag || tflag) {
          callback();
        } else {
          callback(new Error('请输入正确的电话号码'));
        };
      }
    };
    return {
      repaetClickTime: 2,
      repeatClickFlag: false,
      nowSearchIndex: '',
      myTitleInfo: {
        title: "危险废物跨省转移",
        epName: "",
        textInfoList: []
      },
      userRole: '',
      ifsave: "0",
      EP_ID: "",
      TP_ID: "",
      queryJson: {},
      title1: {
        title: "危险废物处置单位信息",
      },
      title2: {
        title: "跨省转移信息",
      },
      title3: {
        title: "跨省运输单位信息",
      },
      title4: {
        title: "危险废物情况",
      },
      tptDataList: [{
        dialogTableVisible: false,
        searchGridData: [],
        licenceNo: "",
        compName: "",
        tptData: {
          compNameDetail: "",
          licenceNoDetail: "",
          addrDetail: "",
          cardDetail: "",
          contactDetail: "",
          contactPhoneDetail: ""
        },
        formStatus: 'card',
        transferData: {
          name: "",
          phone: ""
        },
        title1fromList: [{
          index: 1,
          itemList: [{
            type: "input",
            text: "",
            title: "单位名称",
            limit: "100"
          }, {
            type: "input",
            text: "",
            title: "道路危险货物运输许可证",
            limit: "100"
          }, {
            type: "input",
            text: "",
            title: "联系人",
            limit: "100"
          }, {
            type: "input",
            text: "",
            title: "联系方式",
            limit: "100"
          }, {
            type: "input",
            text: "",
            title: "单位地址",
            limit: "100"
          }]
        }],
        formDataListTitle: [{
          title: '单位名称',
          key: 'EN_NAME_YS'
        }, {
          title: '道路危险货物运输许可证',
          key: 'ysdwdlyszh'
        }, {
          title: '联系人',
          key: 'ysdwlxr'
        }, {
          title: '联系方式',
          key: 'ysdwlxrsj'
        }, {
          title: '单位地址',
          key: 'ysdwdz'
        }],
        formDataListTitle1: [{
          title: '废物名称',
          key: 'D_NAME'
        }, {
          title: '废物类别',
          key: 'BIG_CATEGORY_ID'
        }, {
          title: '废物代码',
          key: 'SAMLL_CATEGORY_ID'
        }, {
          title: '预计产量',
          key: 'UNIT_NUM'
        }, {
          title: '上年实际产量',
          key: 'LAST_NUM'
        }],
        formDataList: [],
        formDataList1: [],
        formList: [{
          "UNIT": "",
          "SAMLL_CATEGORY_ID": "",
          "SAMLL_CATEGORY_NAME": "",
          "ID": "",
          "D_NAME": "",
          "UNIT_NUM": "",
          "BIG_CATEGORY_ID": "",
          "BIG_CATEGORY_NAME": "",
          "LAST_NUM": ""
        }]
      }],
			rules: {
				name: [
					{ required: true, message: '请输入', trigger: 'blur' }
				],
				phone: [
					{ required: true, trigger: 'blur', validator: validatePhone },
				]
			},
			nameList: [],
    }
  },
  components: {
    'my-aside': Aside,
		'assTitle': assTitle,
		'assTptTitle': assTptTitle,
    'assForm': assForm,
    'assTable': assTable,
    'assFormTptItem': assFormTptItem
  },
  mounted () {
    checkBrowser(() => {
      // this.$message({
      // 	showClose: true,
      // 	message: '您当前使用的浏览器不支持本模块功能，建议使用Chrome浏览器',
      // 	type: 'warning'
      // });
      // this.$router.push({ path: '/pageIncompatible' })
      window.location.href = "pageIncompatible.html";
    })
    this.repeatClickFlag = false
    this.queryJson = getQueryString()

    this.myTitleInfo.epName = this.queryJson.epName

    fetch({
    	url: '/plan/initPt',
    	method: 'POST',
    	data: 'params=' + JSON.stringify(this.queryJson)
    }).then(res => {
    // let res = {
    //   "WJWT": "czlEcjhPMjRXelI5LzQrVE5JS1hiU3FJK2M5U0Z2VWhKYlB0SmppYktlND0=",
    //   "operatorId": "",
    //   "empId": "",
    //   "userType": "CSEP",
    //   "newGuideFlag": "",
    //   "belongQ": "",
    //   "belongS": "",
    //   "nickName": "天津市昱隆泰再生资源环保处理有限公司",
    //   "orgCode": "",
    //   "userId": "EP201410280946090018",
    //   "userName": "",
    //   "sepaName": "西青区",
    //   "status": "",
    //   "ifLogin": "0",
    //   "ROLEID": "CSEP",
    //   "epName": "天津市昱隆泰再生资源环保处理有限公司",
		// 	"epId": "EP201410280946090018",
		// 	"initPtInfoList": [{
		// 		"initPtList": [{
		// 			"SAMLL_CATEGORY_ID": "100-200-300",
		// 			"CAPACITY": null,
		// 			"SHAPE": null,
		// 			"wxfwmc": "bbb",
		// 			"jldw": "吨",
		// 			"UNIT_NUM": "100",
		// 			"BIG_CATEGORY_COMMENT": null,
		// 			"UNIT_NUM_YC": null,
		// 			"SAMLL_CATEGORY_NAME": "bbb",
		// 			"SAMLL_CATEGORY_COMMENT": null,
		// 			"ID": "1",
		// 			"BIG_CATEGORY_NAME": "aaa",
		// 			"UNIT_NUM_WC": null,
		// 			"UNIT": "吨",
		// 			"CONTAINER": null,
		// 			"TP_ID": "TP201810091008460015",
		// 			"BIG_CATEGORY_ID": "HW01",
		// 			"METERIAL": null,
		// 			"D_FROM": null,
		// 			"CONTAINER_NUM_YC": null,
		// 			"D_NAME": "bbb",
		// 			"wxfwdm": "100-200-300",
		// 			"CONTAINER_NUM": null,
		// 			"CONTAINER_NUM_WC": null,
		// 			"zysl": "100",
		// 			"LAST_NUM": "12"
		// 		}, {
		// 			"SAMLL_CATEGORY_ID": "100-200-300",
		// 			"CAPACITY": null,
		// 			"SHAPE": null,
		// 			"wxfwmc": "bbb",
		// 			"jldw": "吨",
		// 			"UNIT_NUM": "100",
		// 			"BIG_CATEGORY_COMMENT": null,
		// 			"UNIT_NUM_YC": null,
		// 			"SAMLL_CATEGORY_NAME": "bbb",
		// 			"SAMLL_CATEGORY_COMMENT": null,
		// 			"ID": "2",
		// 			"BIG_CATEGORY_NAME": "aaa",
		// 			"UNIT_NUM_WC": null,
		// 			"UNIT": "吨",
		// 			"CONTAINER": null,
		// 			"TP_ID": "TP201810091008460015",
		// 			"BIG_CATEGORY_ID": "HW01",
		// 			"METERIAL": null,
		// 			"D_FROM": null,
		// 			"CONTAINER_NUM_YC": null,
		// 			"D_NAME": "bbb",
		// 			"wxfwdm": "100-200-300",
		// 			"CONTAINER_NUM": null,
		// 			"CONTAINER_NUM_WC": null,
		// 			"zysl": "100",
		// 			"LAST_NUM": "111"
		// 		}],
		// 		"initPt": {
		// 			"ysdwlxrsj": "手机号1$手机号2",
		// 			"EN_NAME_YS": "名称1$名称2",
		// 			"EN_NAME_CZ": "处置单位名称",
		// 			"BTO_ID_CS": "XQQ",
		// 			"IF_ADDITIONAL": "0",
		// 			"BTO_ID_CZ": null,
		// 			"wfjsdz": "处置地址",
		// 			"ysdwdlyszh": "道路许可证号1$道路许可证号2",
		// 			"CHECK_DATE": null,
		// 			"wfjsdwlxrsj": "处置联系方式",
		// 			"fwycdwlxrsj": "23991989",
		// 			"wfycdwmc": "天津市昱隆泰再生资源环保处理有限公司",
		// 			"STATUS": "0",
		// 			"ysdwlxr": "联系人1$联系人2",
		// 			"ysdwdz": "地址1$地址2",
		// 			"jhqrr": null,
		// 			"LINKTEL": null,
		// 			"CHECK_RESULT": null,
		// 			"IF_TP_ADDITIONAL": "0",
		// 			"EN_ID_YS": null,
		// 			"wfycdwbm": "EP201410280946090018",
		// 			"jhqrrq": null,
		// 			"EN_NAME_CS": "天津市昱隆泰再生资源环保处理有限公司",
		// 			"EN_ID_CZ": null,
		// 			"LINKPHONE": "bb",
		// 			"wfycdwdz": "天津市西青区天津西青高端金属制品工业区19号",
		// 			"wfjsdwlxr": "处置联系人",
		// 			"ysdwmc": "名称1$名称2",
		// 			"jhqryj": null,
		// 			"wfjsdwmc": "处置单位名称",
		// 			"ACTIONDATE": 1544384454420,
		// 			"ycsxzqhdm": "120111",
		// 			"TP_ID": "TP201810091008460015",
		// 			"jhqrjg": null,
		// 			"jsrq": 1546185600000,
		// 			"ksrq": 1514736000000,
		// 			"MAIN_ID": null,
		// 			"CHECK_ADVICE": null,
		// 			"fwjsdwwxfwjyxkzh": "处置许可证号",
		// 			"yrsxzqhdm": "处置行政区划",
		// 			"wfycdwlxr": "王富庆",
		// 			"sysdate": 1544384454430,
		// 			"LINKMAN": "aa",
		// 			"jhqrsxzqh": "120000",
		// 			"BEGINTIME": 1514736000000,
		// 			"ENDTIME": 1546185600000,
		// 			"EN_ID_CS": "EP201410280946090018",
		// 			"bcsfcg": null
		// 		}
		// 	}],
    //   "belongSepa": "XQQ",
    //   "userPortrait": "",
    //   "IWBSESSION": "BROWSER-20181210055815",
    //   "initOverviewList": [{
    //     "BIG_CATEGORY_NAME": "医疗废物",
    //     "UNIT": "个",
    //     "W_NAME": "发f",
    //     "SOURCE_PROCESS": "21",
    //     "SAMLL_CATEGORY_ID": "831-001-01",
    //     "TP_ID": "TP201810091008460015",
    //     "YEAR_NUM": "11",
    //     "BIG_CATEGORY_ID": "HW01",
    //     "W_SHAPE": "大",
    //     "LAST_NUM": "22",
    //     "SAMLL_CATEGORY_NAME": "感染性废物",
    //     "ID": "1",
    //     "D_NAME": "测试",
    //     "CHARACTER": "T,I"
    //   }, {
    //     "BIG_CATEGORY_NAME": "医药废物",
    //     "UNIT": "吨",
    //     "W_NAME": "发大水",
    //     "SOURCE_PROCESS": "发达",
    //     "SAMLL_CATEGORY_ID": "271-002-02",
    //     "TP_ID": "TP201810091008460015",
    //     "YEAR_NUM": "11",
    //     "BIG_CATEGORY_ID": "HW02",
    //     "W_SHAPE": "12",
    //     "LAST_NUM": "22",
    //     "SAMLL_CATEGORY_NAME": "化学合成原料药生产产生的废母液及反应基废物",
    //     "ID": "2",
    //     "D_NAME": "发撒",
    //     "CHARACTER": "T,I"
    //   }, {
    //     "BIG_CATEGORY_NAME": "废有机溶剂与含有机溶剂废物",
    //     "UNIT": "吨",
    //     "W_NAME": "测试33有害物质",
    //     "SOURCE_PROCESS": "测试33来源",
    //     "SAMLL_CATEGORY_ID": "900-406-06",
    //     "TP_ID": "TP201810091008460015",
    //     "YEAR_NUM": "100",
    //     "BIG_CATEGORY_ID": "HW06",
    //     "W_SHAPE": "测试",
    //     "LAST_NUM": "50",
    //     "SAMLL_CATEGORY_NAME": "900-402-06和900-404-06中所列废物再生处理产生的废活性炭及其他过滤吸附介质",
    //     "ID": "3",
    //     "D_NAME": "测试33",
    //     "CHARACTER": "C"
    //   }],
    //   "realName": "",
    //   "contextPath": "",
    //   "orgSeq": ""
    // }
    this.userRole = res.userType
    this.ifsave = res.ifsave
    this.EP_ID = this.queryJson.EP_ID
    this.TP_ID = this.queryJson.TP_ID
		this.nameList = res.initOverviewList

		// this.tptDataList = []
		if (res.initPtInfoList.length > 0) {
			for (let index in res.initPtInfoList) {
        if(index == 0){
          this.tptDataList[index].dialogTableVisible = false
          this.tptDataList[index].searchGridData = []
          this.tptDataList[index].formStatus = "card"
          
          this.tptDataList[index].formDataList1 = res.initPtInfoList[index].initPtList
          if (res.initPtInfoList[index].initPtList.length > 0) {
            this.tptDataList[index].formList = res.initPtInfoList[index].initPtList;
          } else {
            this.tptDataList[index].formList = [{
              "UNIT": "",
              "SAMLL_CATEGORY_ID": "",
              "SAMLL_CATEGORY_NAME": "",
              "ID": "",
              "D_NAME": "",
              "UNIT_NUM": "",
              "BIG_CATEGORY_ID": "",
              "BIG_CATEGORY_NAME": "",
              "LAST_NUM": ""
            }]
          }
          let name = [];
          let phone = [];
          let code = [];
          let person = [];
          let addr = [];
          if (res.initPtInfoList[index].initPt !== "") {
            this.tptDataList[index].transferData.name = res.initPtInfoList[index].initPt.LINKMAN
            this.tptDataList[index].transferData.phone = res.initPtInfoList[index].initPt.LINKPHONE

            name = res.initPtInfoList[index].initPt.EN_NAME_YS.split('$');
            phone = res.initPtInfoList[index].initPt.ysdwlxrsj.split('$');
            code = res.initPtInfoList[index].initPt.ysdwdlyszh.split('$');
            person = res.initPtInfoList[index].initPt.ysdwlxr.split('$');
            addr = res.initPtInfoList[index].initPt.ysdwdz.split('$');

            this.tptDataList[index].tptData.compNameDetail = res.initPtInfoList[index].initPt.wfjsdwmc
            this.tptDataList[index].tptData.licenceNoDetail = res.initPtInfoList[index].initPt.fwjsdwwxfwjyxkzh
            this.tptDataList[index].tptData.addrDetail = res.initPtInfoList[index].initPt.wfjsdz
            this.tptDataList[index].tptData.cardDetail = res.initPtInfoList[index].initPt.yrsxzqhdm
            this.tptDataList[index].tptData.contactDetail = res.initPtInfoList[index].initPt.wfjsdwlxr
            this.tptDataList[index].tptData.contactPhoneDetail = res.initPtInfoList[index].initPt.wfjsdwlxrsj

          }
          let ptArray = []
          for (let i = 0; i < name.length; i++) {
            let ptItem = {}
            ptItem.EN_NAME_YS = name[i]
            ptItem.ysdwlxrsj = phone[i]
            ptItem.ysdwdlyszh = code[i]
            ptItem.ysdwlxr = person[i]
            ptItem.ysdwdz = addr[i]
            ptArray.push(ptItem)
          }
          this.tptDataList[index].formDataList = ptArray
          if (ptArray.length > 0) {
            this.tptDataList[index].title1fromList = []
            for (let i in ptArray) {
              let item = {
                index: i + 1,
                itemList: [{
                  type: "input",
                  text: ptArray[i].EN_NAME_YS,
                  title: "单位名称",
                  limit: "100"
                }, {
                  type: "input",
                  text: ptArray[i].ysdwdlyszh,
                  title: "道路危险货物运输许可证",
                  limit: "100"
                }, {
                  type: "input",
                  text: ptArray[i].ysdwlxr,
                  title: "联系人",
                  limit: "100"
                }, {
                  type: "input",
                  text: ptArray[i].ysdwlxrsj,
                  title: "联系方式",
                  limit: "100"
                }, {
                  type: "input",
                  text: ptArray[i].ysdwdz,
                  title: "单位地址",
                  limit: "100"
                }]
              }
              this.tptDataList[index].title1fromList.push(item)
            }
          } else {
            this.tptDataList[index].title1fromList = [{
              index: 1,
              itemList: [{
                type: "input",
                text: "",
                title: "单位名称",
                limit: "100"
              }, {
                type: "input",
                text: "",
                title: "道路危险货物运输许可证",
                limit: "100"
              }, {
                type: "input",
                text: "",
                title: "联系人",
                limit: "100"
              }, {
                type: "input",
                text: "",
                title: "联系方式",
                limit: "100"
              }, {
                type: "input",
                text: "",
                title: "单位地址",
                limit: "100"
              }]
            }]
          }
        }else{
          let dataItem = {}
          dataItem.dialogTableVisible = false
          dataItem.searchGridData = []
          dataItem.formStatus = "card"
          
          dataItem.formDataList1 = res.initPtInfoList[index].initPtList
          if (res.initPtInfoList[index].initPtList.length > 0) {
            dataItem.formList = res.initPtInfoList[index].initPtList;
          } else {
            dataItem.formList = [{
              "UNIT": "",
              "SAMLL_CATEGORY_ID": "",
              "SAMLL_CATEGORY_NAME": "",
              "ID": "",
              "D_NAME": "",
              "UNIT_NUM": "",
              "BIG_CATEGORY_ID": "",
              "BIG_CATEGORY_NAME": "",
              "LAST_NUM": ""
            }]
          }
          let name = [];
          let phone = [];
          let code = [];
          let person = [];
          let addr = [];
          if (res.initPtInfoList[index].initPt !== "") {
            dataItem.transferData = {}
            dataItem.transferData.name = res.initPtInfoList[index].initPt.LINKMAN
            dataItem.transferData.phone = res.initPtInfoList[index].initPt.LINKPHONE

            name = res.initPtInfoList[index].initPt.EN_NAME_YS.split('$');
            phone = res.initPtInfoList[index].initPt.ysdwlxrsj.split('$');
            code = res.initPtInfoList[index].initPt.ysdwdlyszh.split('$');
            person = res.initPtInfoList[index].initPt.ysdwlxr.split('$');
            addr = res.initPtInfoList[index].initPt.ysdwdz.split('$');

            dataItem.tptData = {}
            dataItem.tptData.compNameDetail = res.initPtInfoList[index].initPt.wfjsdwmc
            dataItem.tptData.licenceNoDetail = res.initPtInfoList[index].initPt.fwjsdwwxfwjyxkzh
            dataItem.tptData.addrDetail = res.initPtInfoList[index].initPt.wfjsdz
            dataItem.tptData.cardDetail = res.initPtInfoList[index].initPt.yrsxzqhdm
            dataItem.tptData.contactDetail = res.initPtInfoList[index].initPt.wfjsdwlxr
            dataItem.tptData.contactPhoneDetail = res.initPtInfoList[index].initPt.wfjsdwlxrsj

          }
          let ptArray = []
          for (let i = 0; i < name.length; i++) {
            let ptItem = {}
            ptItem.EN_NAME_YS = name[i]
            ptItem.ysdwlxrsj = phone[i]
            ptItem.ysdwdlyszh = code[i]
            ptItem.ysdwlxr = person[i]
            ptItem.ysdwdz = addr[i]
            ptArray.push(ptItem)
          }
          dataItem.formDataList = ptArray
          if (ptArray.length > 0) {
            dataItem.title1fromList = []
            for (let i in ptArray) {
              let item = {
                index: i + 1,
                itemList: [{
                  type: "input",
                  text: ptArray[i].EN_NAME_YS,
                  title: "单位名称",
                  limit: "100"
                }, {
                  type: "input",
                  text: ptArray[i].ysdwdlyszh,
                  title: "道路危险货物运输许可证",
                  limit: "100"
                }, {
                  type: "input",
                  text: ptArray[i].ysdwlxr,
                  title: "联系人",
                  limit: "100"
                }, {
                  type: "input",
                  text: ptArray[i].ysdwlxrsj,
                  title: "联系方式",
                  limit: "100"
                }, {
                  type: "input",
                  text: ptArray[i].ysdwdz,
                  title: "单位地址",
                  limit: "100"
                }]
              }
              dataItem.title1fromList.push(item)
            }
          } else {
            dataItem.title1fromList = [{
              index: 1,
              itemList: [{
                type: "input",
                text: "",
                title: "单位名称",
                limit: "100"
              }, {
                type: "input",
                text: "",
                title: "道路危险货物运输许可证",
                limit: "100"
              }, {
                type: "input",
                text: "",
                title: "联系人",
                limit: "100"
              }, {
                type: "input",
                text: "",
                title: "联系方式",
                limit: "100"
              }, {
                type: "input",
                text: "",
                title: "单位地址",
                limit: "100"
              }]
            }]
          }
          this.tptDataList.push(dataItem)
        }
			}
		} else {
			let emptyItem = {
        dialogTableVisible: false,
        searchGridData: [],
        licenceNo: "",
        compName: "",
        tptData: {
          compNameDetail: "",
          licenceNoDetail: "",
          addrDetail: "",
          cardDetail: "",
          contactDetail: "",
          contactPhoneDetail: ""
        },
        formStatus: 'card',
        transferData: {
          name: "",
          phone: ""
        },
        title1fromList: [{
          index: 1,
          itemList: [{
            type: "input",
            text: "",
            title: "单位名称",
            limit: "100"
          }, {
            type: "input",
            text: "",
            title: "道路危险货物运输许可证",
            limit: "100"
          }, {
            type: "input",
            text: "",
            title: "联系人",
            limit: "100"
          }, {
            type: "input",
            text: "",
            title: "联系方式",
            limit: "100"
          }, {
            type: "input",
            text: "",
            title: "单位地址",
            limit: "100"
          }]
        }],
        formDataListTitle: [{
          title: '单位名称',
          key: 'EN_NAME_YS'
        }, {
          title: '道路危险货物运输许可证',
          key: 'ysdwdlyszh'
        }, {
          title: '联系人',
          key: 'ysdwlxr'
        }, {
          title: '联系方式',
          key: 'ysdwlxrsj'
        }, {
          title: '单位地址',
          key: 'ysdwdz'
        }],
        formDataListTitle1: [{
          title: '废物名称',
          key: 'D_NAME'
        }, {
          title: '废物类别',
          key: 'BIG_CATEGORY_ID'
        }, {
          title: '废物代码',
          key: 'SAMLL_CATEGORY_ID'
        }, {
          title: '预计产量',
          key: 'UNIT_NUM'
        }, {
          title: '上年实际产量',
          key: 'LAST_NUM'
        }],
        formDataList: [],
        formDataList1: [],
        formList: [{
          "UNIT": "",
          "SAMLL_CATEGORY_ID": "",
          "SAMLL_CATEGORY_NAME": "",
          "ID": "",
          "D_NAME": "",
          "UNIT_NUM": "",
          "BIG_CATEGORY_ID": "",
          "BIG_CATEGORY_NAME": "",
          "LAST_NUM": ""
        }]
      }
      this.tptDataList = []
			this.tptDataList.push(emptyItem)
		}
    })
  },
  methods: {
    doSubmit () {
      if (!this.repeatClickFlag) {
        this.repeatClickFlag = true
        setTimeout(() => {
          this.repeatClickFlag = false
        }, this.repaetClickTime * 1000);
      } else {
        this.$notify.error({
          title: '警告',
          message: this.repaetClickTime + "秒内不得重复提交"
        });
        return;
			}
			
			let submitData = {}
      submitData.EP_ID = this.EP_ID
			submitData.TP_ID = this.TP_ID
			
			let checkFlag = false
			for (let i in this.tptDataList) {
        let formStr = 'form' + i
				this.$refs[formStr][0].validate((valid) => {
					if (valid) {
						checkFlag = true
					} else {
						checkFlag = false
					}
				});
			}
      if (!checkFlag) {
        return
      }
      let submitFail = false
      console.log(this.tptDataList)

      submitData.initPtInfoList = []
			for (let num in this.tptDataList) {
				if (this.tptDataList[num].tptData.compNameDetail === "" || this.tptDataList[num].tptData.licenceNoDetail === "") {
					this.$notify.error({
						title: '警告',
						message: "请填写单位名称或许可证编号，并确保存在"
					});
					return;
				}
				for (let i in this.tptDataList[num].title1fromList) {
					let item = this.tptDataList[num].title1fromList[i].itemList
					for (let j in item) {
						if (item[j].text === "") {
							this.$notify.error({
								title: '警告',
								message: "请填全[跨省运输单位信息]所有内容"
							});
							return
						}
						if (this.checkDorSign(item[j].text)) {
							this.$notify.error({
								title: '警告',
								message: "[跨省运输单位信息]数据中不可输入'$'符号"
							});
							return
						}
					}
				}
				for (let i in this.tptDataList[num].formList) {
					if (this.tptDataList[num].formList[i].D_NAME === "" || this.tptDataList[num].formList[i].UNIT_NUM === "" || this.tptDataList[num].formList[i].SAMLL_CATEGORY_ID === "" || this.tptDataList[num].formList[i].BIG_CATEGORY_ID === "" || this.tptDataList[num].formList[i].LAST_NUM === "") {
						this.$notify.error({
							title: '警告',
							message: "请填全[危险废物情况]所有内容"
						});
						return;
					}
				}
				if (this.nameRepeatCheck(this.tptDataList[num].formList, 'D_NAME')) {
					this.$notify.error({
						title: '错误',
						message: "废物名称不能重复，请修改后重新提交"
					});
					return;
				}

        let initPtData = {}
        initPtData.wfjsdwmc = this.tptDataList[num].tptData.compNameDetail
        initPtData.fwjsdwwxfwjyxkzh = this.tptDataList[num].tptData.licenceNoDetail
        initPtData.wfjsdz = this.tptDataList[num].tptData.addrDetail
        initPtData.yrsxzqhdm = this.tptDataList[num].tptData.cardDetail
        initPtData.wfjsdwlxr = this.tptDataList[num].tptData.contactDetail
        initPtData.wfjsdwlxrsj = this.tptDataList[num].tptData.contactPhoneDetail

        initPtData.LINKMAN = this.tptDataList[num].transferData.name
        initPtData.LINKTEL = this.tptDataList[num].transferData.phone

        initPtData.ysdwmc = ""
        initPtData.ysdwdz = ""
        initPtData.ysdwlxr = ""
        initPtData.ysdwlxrsj = ""
        initPtData.ysdwdlyszh = ""

				let repeatCheck = []
				for (let i in this.tptDataList[num].title1fromList) {
          
        
					let itemData = {}
					itemData.ysdwmc = this.tptDataList[num].title1fromList[i].itemList[0].text
					itemData.ysdwdz = this.tptDataList[num].title1fromList[i].itemList[4].text
					itemData.ysdwlxr = this.tptDataList[num].title1fromList[i].itemList[2].text
					itemData.ysdwlxrsj = this.tptDataList[num].title1fromList[i].itemList[3].text
					itemData.ysdwdlyszh = this.tptDataList[num].title1fromList[i].itemList[1].text
					repeatCheck.push(itemData)
					if (i == 0) {
						initPtData.ysdwmc = this.tptDataList[num].title1fromList[i].itemList[0].text
						initPtData.ysdwdz = this.tptDataList[num].title1fromList[i].itemList[4].text
						initPtData.ysdwlxr = this.tptDataList[num].title1fromList[i].itemList[2].text
						initPtData.ysdwlxrsj = this.tptDataList[num].title1fromList[i].itemList[3].text
						initPtData.ysdwdlyszh = this.tptDataList[num].title1fromList[i].itemList[1].text
					} else {
						initPtData.ysdwmc += "$" + this.tptDataList[num].title1fromList[i].itemList[0].text
						initPtData.ysdwdz += "$" + this.tptDataList[num].title1fromList[i].itemList[4].text
						initPtData.ysdwlxr += "$" + this.tptDataList[num].title1fromList[i].itemList[2].text
						initPtData.ysdwlxrsj += "$" + this.tptDataList[num].title1fromList[i].itemList[3].text
						initPtData.ysdwdlyszh += "$" + this.tptDataList[num].title1fromList[i].itemList[1].text
					}
				}

				if (this.nameRepeatCheck(repeatCheck, 'ysdwmc') || this.nameRepeatCheck(repeatCheck, 'ysdwdlyszh')) {
					this.$notify.error({
						title: '错误',
						message: "单位名称或许可证号不能重复，请修改后重新提交"
					});
					return;
				}
				initPtData.PT_LIST = []
				for (let i in this.tptDataList[num].formList) {
					initPtData.PT_LIST.push(this.tptDataList[num].formList[i])
				}
				submitData.initPtInfoList.push(initPtData)
				
			}
      for (let key in this.queryJson) {
				submitData[key] = this.queryJson[key]
			}
			const loading = this.$loading({
				lock: true,
				text: 'Loading',
				spinner: 'el-icon-loading',
				background: 'rgba(0, 0, 0, 0.3)'
			});
      
      fetch({
        url: '/plan/savePt',
        method: 'POST',
        data: 'params=' + JSON.stringify(submitData)
      }).then(res => {
        if (res.resFlag == '0') {
          this.$notify({
            title: '成功',
            message: '保存成功',
            type: 'success'
          });
        } else {
          this.$notify.error({
            title: '失败',
            message: res.resMsg
          });
        }
        loading.close();
      })
    },
    doResetUnitInfo (i) {
      this.tptDataList[i].title1fromList = [{
        index: 1,
        itemList: [{
          type: "input",
          text: "",
          title: "单位名称",
          limit: "100"
        }, {
          type: "input",
          text: "",
          title: "道路危险货物运输许可证",
          limit: "100"
        }, {
          type: "input",
          text: "",
          title: "联系人",
          limit: "100"
        }, {
          type: "input",
          text: "",
          title: "联系方式",
          limit: "100"
        }, {
          type: "input",
          text: "",
          title: "单位地址",
          limit: "100"
        },]
      }]
    },
    doResetSituation (index) {
      this.tptDataList[index].formList = [{
        "UNIT": "",
        "SAMLL_CATEGORY_ID": "",
        "SAMLL_CATEGORY_NAME": "",
        "ID": "",
        "D_NAME": "",
        "UNIT_NUM": "",
        "BIG_CATEGORY_ID": "",
        "BIG_CATEGORY_NAME": "",
        "LAST_NUM": ""
      }]
    },
    addSign (i) {
      let item = {
        "UNIT": "",
        "SAMLL_CATEGORY_ID": "",
        "SAMLL_CATEGORY_NAME": "",
        "ID": "",
        "D_NAME": "",
        "UNIT_NUM": "",
        "BIG_CATEGORY_ID": "",
        "BIG_CATEGORY_NAME": "",
        "LAST_NUM": ""
      }
      this.tptDataList[i].formList.push(item)
    },
    nameRepeatCheck (arr, key) {
      for (let i = 0; i < arr.length; i++) {
        let name1 = arr[i][key]
        for (let j = i + 1; j < arr.length; j++) {
          let name2 = arr[j][key]
          if (name1 === name2) {
            return true;
          }
        }
      }
      return false
    },
    reduceSign (param) {
      if (this.tptDataList[param.tptIndex].formList.length === 1) {
        this.tptDataList[param.tptIndex].formList = []
        let item = {
          "UNIT": "",
          "SAMLL_CATEGORY_ID": "",
          "SAMLL_CATEGORY_NAME": "",
          "ID": "",
          "D_NAME": "",
          "UNIT_NUM": "",
          "BIG_CATEGORY_ID": "",
          "BIG_CATEGORY_NAME": "",
          "LAST_NUM": ""
        }
        this.tptDataList[param.tptIndex].formList.push(item)
      } else {
        this.tptDataList[param.tptIndex].formList.splice(param.index, 1)
      }
    },
    formStatusChange (item) {
      this.tptDataList[item.tptIndex].formStatus = item.formStatus
    },
    doSearch (index) {
      this.nowSearchIndex = index
      let param = {}
      param.dwmc = this.tptDataList[index].compName
      param.xkzh = this.tptDataList[index].licenceNo
      if (param.dwmc !== "" || param.xkzh !== "") {
        fetchPt({
          url: '/syncUpload/getXkz',
          method: 'POST',
          data: 'version=2&jsonParam=' + JSON.stringify(param)
        }).then(res => {
          // let res = [{
          // 	dwmc: "121",
          // 	xkzbh: "1212",
          // 	dwdz: "12121",
          // 	xzqhdm: "1111",
          // 	lxrxm: "asdas",
          // 	lxrdh: "12121"
          // },{
          // 	dwmc: "121",
          // 	xkzbh: "1212",
          // 	dwdz: "12121",
          // 	xzqhdm: "1111",
          // 	lxrxm: "asdas",
          // 	lxrdh: "12121"
          // },{
          // 	dwmc: "121",
          // 	xkzbh: "1212",
          // 	dwdz: "12121",
          // 	xzqhdm: "1111",
          // 	lxrxm: "asdas",
          // 	lxrdh: "12121"
          // }]
          this.tptDataList[index].searchGridData = [];
          if (res.length == 1) {
            this.tptDataList[index].tptData.compNameDetail = res[0].dwmc;
            this.tptDataList[index].tptData.licenceNoDetail = res[0].xkzbh;
            this.tptDataList[index].tptData.addrDetail = res[0].dwdz;
            this.tptDataList[index].tptData.cardDetail = res[0].xzqhdm;
            this.tptDataList[index].tptData.contactDetail = res[0].lxrxm;
            this.tptDataList[index].tptData.contactPhoneDetail = res[0].lxrdh;
          } else {
            // this.tptData.compNameDetail = ""
            // this.tptData.licenceNoDetail = ""
            // this.tptData.addrDetail = ""
            // this.tptData.cardDetail = ""
            // this.tptData.contactDetail = ""
            // this.tptData.contactPhoneDetail = ""
            // if(res.length > 1){
            // 	this.$notify.error({
            // 		title: '警告',
            // 		message: "系统已查询出多条，请输入更精确的关键词"
            // 	});
            // }
            this.tptDataList[index].dialogTableVisible = true;
            this.tptDataList[index].searchGridData = res;
          }
        })
      }
    },
    checkDorSign (str) {
      var r = /[$"']+/;
      var m = r.exec(str);
      return m;
    },
    handleSelectionChange (val) {
      if (val && this.nowSearchIndex !== '') {
        this.tptDataList[this.nowSearchIndex].tptData.compNameDetail = val.dwmc;
        this.tptDataList[this.nowSearchIndex].tptData.licenceNoDetail = val.xkzbh;
        this.tptDataList[this.nowSearchIndex].tptData.addrDetail = val.dwdz;
        this.tptDataList[this.nowSearchIndex].tptData.cardDetail = val.xzqhdm;
        this.tptDataList[this.nowSearchIndex].tptData.contactDetail = val.lxrxm;
        this.tptDataList[this.nowSearchIndex].tptData.contactPhoneDetail = val.lxrdh;
        this.tptDataList[this.nowSearchIndex].dialogTableVisible = false;
      }
    },
    delFromByIndex (index) {
      this.tptDataList.splice(index,1)
      if(this.tptDataList.length === 0) {
        let item = {
          dialogTableVisible: false,
          searchGridData: [],
          licenceNo: "",
          compName: "",
          tptData: {
            compNameDetail: "",
            licenceNoDetail: "",
            addrDetail: "",
            cardDetail: "",
            contactDetail: "",
            contactPhoneDetail: ""
          },
          formStatus: 'card',
          transferData: {
            name: "",
            phone: ""
          },
          title1fromList: [{
            index: 1,
            itemList: [{
              type: "input",
              text: "",
              title: "单位名称",
              limit: "100"
            }, {
              type: "input",
              text: "",
              title: "道路危险货物运输许可证",
              limit: "100"
            }, {
              type: "input",
              text: "",
              title: "联系人",
              limit: "100"
            }, {
              type: "input",
              text: "",
              title: "联系方式",
              limit: "100"
            }, {
              type: "input",
              text: "",
              title: "单位地址",
              limit: "100"
            }]
          }],
          formDataListTitle: [{
            title: '单位名称',
            key: 'EN_NAME_YS'
          }, {
            title: '道路危险货物运输许可证',
            key: 'ysdwdlyszh'
          }, {
            title: '联系人',
            key: 'ysdwlxr'
          }, {
            title: '联系方式',
            key: 'ysdwlxrsj'
          }, {
            title: '单位地址',
            key: 'ysdwdz'
          }],
          formDataListTitle1: [{
            title: '废物名称',
            key: 'D_NAME'
          }, {
            title: '废物类别',
            key: 'BIG_CATEGORY_ID'
          }, {
            title: '废物代码',
            key: 'SAMLL_CATEGORY_ID'
          }, {
            title: '预计产量',
            key: 'UNIT_NUM'
          }, {
            title: '上年实际产量',
            key: 'LAST_NUM'
          }],
          formDataList: [],
          formDataList1: [],
          formList: [{
            "UNIT": "",
            "SAMLL_CATEGORY_ID": "",
            "SAMLL_CATEGORY_NAME": "",
            "ID": "",
            "D_NAME": "",
            "UNIT_NUM": "",
            "BIG_CATEGORY_ID": "",
            "BIG_CATEGORY_NAME": "",
            "LAST_NUM": ""
          }]
        }
        this.tptDataList.push(item)
      }
    },
    addFromByIndex() {
      let item = {
        dialogTableVisible: false,
        searchGridData: [],
        licenceNo: "",
        compName: "",
        tptData: {
          compNameDetail: "",
          licenceNoDetail: "",
          addrDetail: "",
          cardDetail: "",
          contactDetail: "",
          contactPhoneDetail: ""
        },
        formStatus: 'card',
        transferData: {
          name: "",
          phone: ""
        },
        title1fromList: [{
          index: 1,
          itemList: [{
            type: "input",
            text: "",
            title: "单位名称",
            limit: "100"
          }, {
            type: "input",
            text: "",
            title: "道路危险货物运输许可证",
            limit: "100"
          }, {
            type: "input",
            text: "",
            title: "联系人",
            limit: "100"
          }, {
            type: "input",
            text: "",
            title: "联系方式",
            limit: "100"
          }, {
            type: "input",
            text: "",
            title: "单位地址",
            limit: "100"
          }]
        }],
        formDataListTitle: [{
          title: '单位名称',
          key: 'EN_NAME_YS'
        }, {
          title: '道路危险货物运输许可证',
          key: 'ysdwdlyszh'
        }, {
          title: '联系人',
          key: 'ysdwlxr'
        }, {
          title: '联系方式',
          key: 'ysdwlxrsj'
        }, {
          title: '单位地址',
          key: 'ysdwdz'
        }],
        formDataListTitle1: [{
          title: '废物名称',
          key: 'D_NAME'
        }, {
          title: '废物类别',
          key: 'BIG_CATEGORY_ID'
        }, {
          title: '废物代码',
          key: 'SAMLL_CATEGORY_ID'
        }, {
          title: '预计产量',
          key: 'UNIT_NUM'
        }, {
          title: '上年实际产量',
          key: 'LAST_NUM'
        }],
        formDataList: [],
        formDataList1: [],
        formList: [{
          "UNIT": "",
          "SAMLL_CATEGORY_ID": "",
          "SAMLL_CATEGORY_NAME": "",
          "ID": "",
          "D_NAME": "",
          "UNIT_NUM": "",
          "BIG_CATEGORY_ID": "",
          "BIG_CATEGORY_NAME": "",
          "LAST_NUM": ""
        }]
      }
      this.tptDataList.push(item)
    }
  }
}
</script>
<style>
#transProvincialTransfer {
  display: -webkit-flex; /* Safari */
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  /*align-items:center;*/
  align-content: center;
  overflow-y: hidden;
}
#transProvincialTransferBg {
  flex: 1;
  width: 100%;
  padding: 40px 5%;
  height: 100%;
  box-sizing: border-box;
  overflow-y: scroll;
}
.footerSign {
  width: 100%;
  height: 50px;
  float: left;
}
.productCompSwitchBg {
  width: 100%;
  float: left;
}
.productCompSwitch_title {
  font-size: 18px;
  padding: 6px 0 12px;
  float: left;
}
.productCompSwitch_switch {
  float: left;
  margin: 8px 0 0 15px;
}
.productCompSwitch_switch .el-switch__label.is-active {
  color: #13ce66;
}
.cardDetail > label {
  width: 155px !important;
}
.tptFormTitle{
  width: 100%;
  height: 100%;
  float: left;
  color: #000;
  font-weight: 700;
  line-height: 44px;
  font-size: 22px;
}
.tptElForm {
  float: left;
}
.tptFormTitle_delText{
  font-size: 14px;
  color: red;
  float: right;
  height: 100%;
  line-height: 44px;
  margin-left: 10px;
  cursor: pointer;
}
.tptFormTitle_newText{
  font-size: 14px;
  color: #13ce66;
  float: right;
  height: 100%;
  line-height: 44px;
  margin-left: 10px;
  cursor: pointer;
}
.tptFormBg{
  width: 100%;
  box-sizing: border-box;
  padding: 0 10px;
  float: left;
  box-shadow: 1px 1px 5px #989898;
  border-radius: 5px;
}
</style>