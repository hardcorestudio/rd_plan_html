<template>
  <div id='transProvincialTransferSyncDetail'>
    <my-aside
      :userRole="userRole"
      needSave="1" 
      class="my-aside"
      :titleInfo="myTitleInfo"
      @doSubmit="doSubmit"
    ></my-aside>
    <div id="transProvincialTransferSyncDetailBg">
			<div v-for="(tptItem,tptIndex) in tptDataList" :key="tptIndex">
        <div class="tptFormTitle">危险废物跨省转移(表{{tptIndex + 1}})</div>
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
          >
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item
                  label="产生单位联系人"
                >
                  <el-input
                    v-if="allowFormStatus === 'OUT_ADD'"
                    v-model="tptItem.transferData.name"
                    placeholder="必填"
                  ></el-input>
                  <el-row v-else>{{ tptItem.transferData.name }}</el-row>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item
                  label="产生单位联系电话"
                >
                  <el-input
                    v-if="allowFormStatus === 'OUT_ADD'"
                    v-model="tptItem.transferData.phone"
                    placeholder="手机号或区号-座机号码"
                  ></el-input>
                  <el-row v-else>{{ tptItem.transferData.phone }}</el-row>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <assTptTitle
            :userRole="userRole"
            titleSize="small"
            formStatus="0"
            :titleInfo="title3"
            :tptIndex="tptIndex"
            @formStatusChange="formStatusChange"
          ></assTptTitle>
          <assForm
            :formList="tptItem.title1fromList"
            type="label"
          ></assForm>
          <assTptTitle
            :userRole="userRole"
            titleSize="small"
            :titleInfo="title4"
            :tptIndex="tptIndex"
          ></assTptTitle>
          <assFormTptItem
            type="label"
            v-for="(item,index) in tptItem.formList"
            :key="index"
            :formItem="item"
            :index="index"
            :listLength="tptItem.formList.length"
            :tptIndex="tptIndex"
            :nameList="nameList"
          ></assFormTptItem>
        </div>
      </div>
      <div v-if="allowFormStatus === 'OUT'" style="float: left;width: 100%;margin-top: 20px;">
        <el-form
          class="tptElForm"
          ref="allowToForm"
          :model="allowToFormInfo"
          label-width="90px"
        >
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="审批日期">
                <el-date-picker
                  v-model="allowToFormInfo.date"
                  type="datetime"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  placeholder="请选择审批日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="审批结果">
                <el-select v-model="allowToFormInfo.result" placeholder="请选择">
                  <el-option
                    v-for="item in resultEnum"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div v-else-if="allowFormStatus === 'IN'" style="float: left;width: 100%;margin-top: 20px;">
        <el-form
          class="tptElForm"
          ref="allowToForm"
          :model="allowToFormInfo"
          label-width="90px"
        >
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="回复日期">
                <!-- <el-row>{{allowToFormInfo.date}}</el-row> -->
                <el-date-picker
                  v-model="allowToFormInfo.date"
                  type="datetime"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  placeholder="请选择回复日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="商请结果">
                <!-- <el-row>{{allowToFormInfo.result}}</el-row> -->
                <el-select v-model="allowToFormInfo.result" placeholder="请选择">
                  <el-option
                    v-for="item in resultEnum"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div v-else-if="allowFormStatus === 'OUT_ADD'" style="float: left;width: 100%;margin-top: 20px;">
        <el-form
          class="tptElForm"
          ref="allowToForm"
          :model="allowToFormInfo"
          label-width="90px"
        >
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="商请日期">
                <!-- <el-row>{{allowToFormInfo.date}}</el-row> -->
                <el-date-picker
                  v-model="allowToFormInfo.date"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  type="datetime"
                  placeholder="请选择回复日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
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
  name: 'transProvincialTransferSyncDetail',
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
      syncUrl: "http://gfxt.mepscc.cn/edpgf_ws_test/servicesx/KSTranService?wsdl",
      allowFormStatus: "",
      resultEnum: [{
        value: "同意",
        label: "同意"
      },{
        value: "拒绝",
        label: "拒绝"
      }],
      allowToFormInfo: {
        date: "",
        result: ""
      },
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
      window.location.href = "pageIncompatible.html";
    })
    
    this.repeatClickFlag = false
    this.queryJson = getQueryString()
    this.myTitleInfo.epName = this.queryJson.epName
    this.EP_ID = this.queryJson.EP_ID
    this.TP_ID = this.queryJson.TP_ID

    let dataList = JSON.parse(localStorage.getItem("tptsWholeData")) 
    let listIndex = this.queryJson.dataIndex
    this.tptDataList = []
    this.tptDataList.push(dataList[listIndex])

    this.userRole = this.queryJson.userRole
    this.allowFormStatus = this.queryJson.SYNC_TYPE
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
      submitData.EP_ID = this.tptDataList[this.queryJson.dataIndex].tptData.EN_ID_CS
      submitData.TP_ID = this.tptDataList[this.queryJson.dataIndex].tptData.TP_ID
      submitData.method = "saveKsldSq"
      submitData.url = this.syncUrl
      
      let jsonParam = {}
      jsonParam.ycsxzqhdm = this.tptDataList[this.queryJson.dataIndex].tptData.ycsxzqhdm
      jsonParam.wfycdwmc = this.tptDataList[this.queryJson.dataIndex].tptData.wfycdwmc
      jsonParam.wfycdwdz = this.tptDataList[this.queryJson.dataIndex].tptData.wfycdwdz

      jsonParam.ksrq = this.tptDataList[this.queryJson.dataIndex].tptData.ksrq
      jsonParam.jsrq = this.tptDataList[this.queryJson.dataIndex].tptData.jsrq
      jsonParam.wfycdwlxr = this.tptDataList[this.queryJson.dataIndex].transferData.name
      jsonParam.fwycdwlxrsj = this.tptDataList[this.queryJson.dataIndex].transferData.phone
      
      jsonParam.ysdwsz = []
      for (let i in this.tptDataList[this.queryJson.dataIndex].title1fromList) {
        let itemData = {}
        itemData.ysdwmc = this.tptDataList[this.queryJson.dataIndex].title1fromList[i].itemList[0].text
        itemData.ysdwdz = this.tptDataList[this.queryJson.dataIndex].title1fromList[i].itemList[4].text
        itemData.ysdwlxr = this.tptDataList[this.queryJson.dataIndex].title1fromList[i].itemList[2].text
        itemData.ysdwlxrsj = this.tptDataList[this.queryJson.dataIndex].title1fromList[i].itemList[3].text
        itemData.ysdwdlyszh = this.tptDataList[this.queryJson.dataIndex].title1fromList[i].itemList[1].text
        jsonParam.ysdwsz.push(itemData)
      }
      
      jsonParam.wfjsdwmc = this.tptDataList[this.queryJson.dataIndex].tptData.compNameDetail
      jsonParam.jsdwxkzbh = this.tptDataList[this.queryJson.dataIndex].tptData.licenceNoDetail
      jsonParam.wfjsdz = this.tptDataList[this.queryJson.dataIndex].tptData.addrDetail
      jsonParam.yrsxzqhdm = this.tptDataList[this.queryJson.dataIndex].tptData.cardDetail
      jsonParam.wfjsdwlxr = this.tptDataList[this.queryJson.dataIndex].tptData.contactDetail
      jsonParam.wfjsdwlxrsj = this.tptDataList[this.queryJson.dataIndex].tptData.contactPhoneDetail

      jsonParam.fwsz = []
      for (let i in this.tptDataList[this.queryJson.dataIndex].formList) {
        let formItem = {}
        formItem.fwmc = this.tptDataList[this.queryJson.dataIndex].formList[i].wxfwmc
        formItem.fwlb = this.tptDataList[this.queryJson.dataIndex].formList[i].BIG_CATEGORY_ID.substring(2)
        formItem.fwdm = this.tptDataList[this.queryJson.dataIndex].formList[i].wxfwdm
        formItem.zysl = this.tptDataList[this.queryJson.dataIndex].formList[i].zysl
        formItem.jldw = this.tptDataList[this.queryJson.dataIndex].formList[i].jldw
        jsonParam.fwsz.push(formItem)
      }
      jsonParam.sqrq = this.allowToFormInfo.date
      submitData.jsonParam = JSON.stringify(jsonParam)

      fetchPt({
        url: '/syncUpload/indexForCors',
        method: 'POST',
        data: 'params=' + JSON.stringify(submitData)
      }).then(res => {
        if (res.length > 5) {
          this.$notify({
            title: '成功',
            message: res,
            type: 'success'
          });
        } else {
          this.$notify.error({
            title: '失败',
            message: res
          });
        }
        loading.close();
      })

      localStorage.setItem("sVal", this.$route.query.searchValue)
      this.$router.back(-1)
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
#transProvincialTransferSyncDetail {
  display: -webkit-flex; /* Safari */
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  /*align-items:center;*/
  align-content: center;
  overflow-y: hidden;
}
#transProvincialTransferSyncDetailBg {
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
  width: 100%;
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