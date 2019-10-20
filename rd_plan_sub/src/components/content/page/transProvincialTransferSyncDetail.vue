<template>
  <div id='transProvincialTransferSyncDetail'>
    <my-aside
      :userRole="userRole"
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
                  <!-- <el-input
                    v-model="tptItem.transferData.name"
                    placeholder="必填"
                  ></el-input> -->
                  <el-row>{{ tptItem.transferData.name }}</el-row>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item
                  label="产生单位联系电话"
                >
                  <!-- <el-input
                    v-model="tptItem.transferData.phone"
                    placeholder="手机号或区号-座机号码"
                  ></el-input> -->
                  <el-row>{{ tptItem.transferData.phone }}</el-row>
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

    let dataList = this.$route.query.data
    let listIndex = this.$route.query.dataIndex
    this.tptDataList = []
    this.tptDataList.push(dataList[listIndex])

    this.userRole = this.$route.query.userRole

  },
  methods: {
    doSubmit () {
      // if (!this.repeatClickFlag) {
      //   this.repeatClickFlag = true
      //   setTimeout(() => {
      //     this.repeatClickFlag = false
      //   }, this.repaetClickTime * 1000);
      // } else {
      //   this.$notify.error({
      //     title: '警告',
      //     message: this.repaetClickTime + "秒内不得重复提交"
      //   });
      //   return;
			// }
			
			// let submitData = {}
      // submitData.EP_ID = this.EP_ID
			// submitData.TP_ID = this.TP_ID
			
			// let checkFlag = false
			// for (let i in this.tptDataList) {
      //   let formStr = 'form' + i
			// 	this.$refs[formStr][0].validate((valid) => {
			// 		if (valid) {
			// 			checkFlag = true
			// 		} else {
			// 			checkFlag = false
			// 		}
			// 	});
			// }
      // if (!checkFlag) {
      //   return
      // }
      // let submitFail = false
      // console.log(this.tptDataList)

      // submitData.initPtInfoList = []
			// for (let num in this.tptDataList) {
			// 	if (this.tptDataList[num].tptData.compNameDetail === "" || this.tptDataList[num].tptData.licenceNoDetail === "") {
			// 		this.$notify.error({
			// 			title: '警告',
			// 			message: "请填写单位名称或许可证编号，并确保存在"
			// 		});
			// 		return;
			// 	}
			// 	for (let i in this.tptDataList[num].title1fromList) {
			// 		let item = this.tptDataList[num].title1fromList[i].itemList
			// 		for (let j in item) {
			// 			if (item[j].text === "") {
			// 				this.$notify.error({
			// 					title: '警告',
			// 					message: "请填全[跨省运输单位信息]所有内容"
			// 				});
			// 				return
			// 			}
			// 			if (this.checkDorSign(item[j].text)) {
			// 				this.$notify.error({
			// 					title: '警告',
			// 					message: "[跨省运输单位信息]数据中不可输入'$'符号"
			// 				});
			// 				return
			// 			}
			// 		}
			// 	}
			// 	for (let i in this.tptDataList[num].formList) {
			// 		if (this.tptDataList[num].formList[i].D_NAME === "" || this.tptDataList[num].formList[i].UNIT_NUM === "" || this.tptDataList[num].formList[i].SAMLL_CATEGORY_ID === "" || this.tptDataList[num].formList[i].BIG_CATEGORY_ID === "" || this.tptDataList[num].formList[i].LAST_NUM === "") {
			// 			this.$notify.error({
			// 				title: '警告',
			// 				message: "请填全[危险废物情况]所有内容"
			// 			});
			// 			return;
			// 		}
			// 	}
			// 	if (this.nameRepeatCheck(this.tptDataList[num].formList, 'D_NAME')) {
			// 		this.$notify.error({
			// 			title: '错误',
			// 			message: "废物名称不能重复，请修改后重新提交"
			// 		});
			// 		return;
			// 	}

      //   let initPtData = {}
      //   initPtData.wfjsdwmc = this.tptDataList[num].tptData.compNameDetail
      //   initPtData.fwjsdwwxfwjyxkzh = this.tptDataList[num].tptData.licenceNoDetail
      //   initPtData.wfjsdz = this.tptDataList[num].tptData.addrDetail
      //   initPtData.yrsxzqhdm = this.tptDataList[num].tptData.cardDetail
      //   initPtData.wfjsdwlxr = this.tptDataList[num].tptData.contactDetail
      //   initPtData.wfjsdwlxrsj = this.tptDataList[num].tptData.contactPhoneDetail

      //   initPtData.LINKMAN = this.tptDataList[num].transferData.name
      //   initPtData.LINKTEL = this.tptDataList[num].transferData.phone

      //   initPtData.ysdwmc = ""
      //   initPtData.ysdwdz = ""
      //   initPtData.ysdwlxr = ""
      //   initPtData.ysdwlxrsj = ""
      //   initPtData.ysdwdlyszh = ""

			// 	let repeatCheck = []
			// 	for (let i in this.tptDataList[num].title1fromList) {
          
        
			// 		let itemData = {}
			// 		itemData.ysdwmc = this.tptDataList[num].title1fromList[i].itemList[0].text
			// 		itemData.ysdwdz = this.tptDataList[num].title1fromList[i].itemList[4].text
			// 		itemData.ysdwlxr = this.tptDataList[num].title1fromList[i].itemList[2].text
			// 		itemData.ysdwlxrsj = this.tptDataList[num].title1fromList[i].itemList[3].text
			// 		itemData.ysdwdlyszh = this.tptDataList[num].title1fromList[i].itemList[1].text
			// 		repeatCheck.push(itemData)
			// 		if (i == 0) {
			// 			initPtData.ysdwmc = this.tptDataList[num].title1fromList[i].itemList[0].text
			// 			initPtData.ysdwdz = this.tptDataList[num].title1fromList[i].itemList[4].text
			// 			initPtData.ysdwlxr = this.tptDataList[num].title1fromList[i].itemList[2].text
			// 			initPtData.ysdwlxrsj = this.tptDataList[num].title1fromList[i].itemList[3].text
			// 			initPtData.ysdwdlyszh = this.tptDataList[num].title1fromList[i].itemList[1].text
			// 		} else {
			// 			initPtData.ysdwmc += "$" + this.tptDataList[num].title1fromList[i].itemList[0].text
			// 			initPtData.ysdwdz += "$" + this.tptDataList[num].title1fromList[i].itemList[4].text
			// 			initPtData.ysdwlxr += "$" + this.tptDataList[num].title1fromList[i].itemList[2].text
			// 			initPtData.ysdwlxrsj += "$" + this.tptDataList[num].title1fromList[i].itemList[3].text
			// 			initPtData.ysdwdlyszh += "$" + this.tptDataList[num].title1fromList[i].itemList[1].text
			// 		}
			// 	}

			// 	if (this.nameRepeatCheck(repeatCheck, 'ysdwmc') || this.nameRepeatCheck(repeatCheck, 'ysdwdlyszh')) {
			// 		this.$notify.error({
			// 			title: '错误',
			// 			message: "单位名称或许可证号不能重复，请修改后重新提交"
			// 		});
			// 		return;
			// 	}
			// 	initPtData.PT_LIST = []
			// 	for (let i in this.tptDataList[num].formList) {
			// 		initPtData.PT_LIST.push(this.tptDataList[num].formList[i])
			// 	}
			// 	submitData.initPtInfoList.push(initPtData)
				
			// }
      // for (let key in this.queryJson) {
			// 	submitData[key] = this.queryJson[key]
			// }
			// const loading = this.$loading({
			// 	lock: true,
			// 	text: 'Loading',
			// 	spinner: 'el-icon-loading',
			// 	background: 'rgba(0, 0, 0, 0.3)'
			// });
      
      // fetch({
      //   url: '/plan/savePt',
      //   method: 'POST',
      //   data: 'params=' + JSON.stringify(submitData)
      // }).then(res => {
      //   if (res.resFlag == '0') {
      //     this.$notify({
      //       title: '成功',
      //       message: '保存成功',
      //       type: 'success'
      //     });
      //   } else {
      //     this.$notify.error({
      //       title: '失败',
      //       message: res.resMsg
      //     });
      //   }
      //   loading.close();
      // })

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