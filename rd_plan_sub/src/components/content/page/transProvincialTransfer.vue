<template>
	<div id='transProvincialTransfer'>
		<my-aside :userRole="userRole" class="my-aside" :titleInfo="myTitleInfo" @doSubmit="doSubmit"></my-aside>
		<div id="transProvincialTransferBg">
			<assTitle :userRole="userRole" :titleInfo="title1"></assTitle>
			<el-form ref="form" :model="tptData" label-width="90px">
				<el-row :gutter="20">
					<el-col :span="10">
						<el-form-item label="单位名称">
							<el-input v-model="compName" placeholder="必填"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="10">
						<el-form-item label="许可证编号">
							<el-input v-model="licenceNo" placeholder="必填"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="4">
						<el-button type="success" plain @click="doSearch">查询</el-button>
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item label="单位名称">
							<el-row>{{tptData.compNameDetail}}</el-row>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="许可证编号">
							<el-row>{{tptData.licenceNoDetail}}</el-row>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item label="产品地址">
							<el-row>{{tptData.addrDetail}}</el-row>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="处置单位市级行政代码" class="cardDetail">
							<el-row>{{tptData.cardDetail}}</el-row>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item label="联系人">
							<el-row>{{tptData.contactDetail}}</el-row>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="联系人电话">
							<el-row>{{tptData.contactPhoneDetail}}</el-row>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
			<assTitle :userRole="userRole" :titleInfo="title2"></assTitle>
				<el-form ref="form1" :model="transferData" label-width="125px" :rules="rules">
					<el-row :gutter="20">
						<el-col :span="12">
							<el-form-item label="产生单位联系人" prop="name">
								<el-input v-model="transferData.name" placeholder="必填"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="产生单位联系电话" prop="phone">
								<el-input v-model="transferData.phone" placeholder="必填"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
				</el-form>
			<assTitle :userRole="userRole" titleSize="small" :titleInfo="title3" titleType="reset" @doReset="doResetUnitInfo"></assTitle>
			<assForm v-if="formStatus === 'card'" :formList="title1fromList" :type="userRole === 'CSEP' ? '' : 'label'"></assForm>
			<assTable v-else-if="formStatus === 'table'" :tableList="formDataList" :tableTitleList="formDataListTitle"></assTable>
			<assTitle :userRole="userRole" titleSize="small" :titleInfo="title4" titleType="reset" @doReset="doResetSituation"></assTitle>
			<assFormTptItem v-if="formStatus === 'card'" :type="userRole !== 'CSEP' ? 'label' : ''" v-for="(item,index) in formList" :key="index" :formItem="item" :index="index" :listLength="formList.length" :nameList="nameList" @addSign="addSign" @reduceSign="reduceSign"></assFormTptItem>
			<assTable v-if="formStatus === 'table'" :tableList="formDataList1" :tableTitleList="formDataListTitle1"></assTable>
			<div class="footerSign"></div>
		</div>
	</div>
</template>
<script>
import Aside from '../Aside.vue';
import assTitle from '../../common/assTitle.vue'
import assForm from '../../common/assForm.vue'
import assTable from '../../common/assTable.vue'
import assFormTptItem from '../../common/assFormTptItem.vue'
import { checkBrowser, getQueryString } from '../../utils/browserCheck.js'
import fetch from '../../utils/fetch.js'
export default {
	name: 'transProvincialTransfer',
	data () {
		return {
			repaetClickTime: 2,
			repeatClickFlag: false,
			myTitleInfo: {
				title: "危险废物跨省转移",
				textInfoList: []
			},
			formStatus: 'card',
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
				title: "贮存危险废物情况",
			},
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
				},{
					type: "input",
					text: "",
					title: "道路危险货物运输许可证",
					limit: "100"
				},{
					type: "input",
					text: "",
					title: "联系人",
					limit: "100"
				},{
					type: "input",
					text: "",
					title: "联系方式",
					limit: "100"
				},{
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
				title: '预计产生量',
				key: 'UNIT_NUM'
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
				"BIG_CATEGORY_NAME": ""
			}],
			nameList: [],
			rules: {
				name: [
					{ required: true, message: '请输入', trigger: 'blur' }
				],
				phone: [
					{ required: true, message: '请输入', trigger: 'blur' }
				]
			},
		}
	},
	components: {
		'my-aside': Aside,
		'assTitle': assTitle,
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
		
		// fetch({
		// 	url: '/plan/initProductInfo',
		// 	method: 'POST',
		// 	data: 'params=' + JSON.stringify(this.queryJson)
		// }).then(res => {
			let res = {
				"WJWT": "czlEcjhPMjRXelI5LzQrVE5JS1hiU3FJK2M5U0Z2VWhKYlB0SmppYktlND0=",
				"operatorId": "",
				"empId": "",
				"userType": "CSEP",
				"newGuideFlag": "",
				"belongQ": "",
				"belongS": "",
				"nickName": "天津市昱隆泰再生资源环保处理有限公司",
				"orgCode": "",
				"userId": "EP201410280946090018",
				"userName": "",
				"sepaName": "西青区",
				"status": "",
				"ifLogin": "0",
				"ROLEID": "CSEP",
				"epName": "天津市昱隆泰再生资源环保处理有限公司",
				"epId": "EP201410280946090018",
				"initPtList": [{
					"SAMLL_CATEGORY_ID": "100-200-300",
					"CAPACITY": null,
					"SHAPE": null,
					"wxfwmc": "bbb",
					"jldw": "吨",
					"UNIT_NUM": "100",
					"BIG_CATEGORY_COMMENT": null,
					"UNIT_NUM_YC": null,
					"SAMLL_CATEGORY_NAME": "bbb",
					"SAMLL_CATEGORY_COMMENT": null,
					"ID": "1",
					"BIG_CATEGORY_NAME": "aaa",
					"UNIT_NUM_WC": null,
					"UNIT": "吨",
					"CONTAINER": null,
					"TP_ID": "TP201810091008460015",
					"BIG_CATEGORY_ID": "HW01",
					"METERIAL": null,
					"D_FROM": null,
					"CONTAINER_NUM_YC": null,
					"D_NAME": "bbb",
					"wxfwdm": "100-200-300",
					"CONTAINER_NUM": null,
					"CONTAINER_NUM_WC": null,
					"zysl": "100"
				}, {
					"SAMLL_CATEGORY_ID": "100-200-300",
					"CAPACITY": null,
					"SHAPE": null,
					"wxfwmc": "bbb",
					"jldw": "吨",
					"UNIT_NUM": "100",
					"BIG_CATEGORY_COMMENT": null,
					"UNIT_NUM_YC": null,
					"SAMLL_CATEGORY_NAME": "bbb",
					"SAMLL_CATEGORY_COMMENT": null,
					"ID": "2",
					"BIG_CATEGORY_NAME": "aaa",
					"UNIT_NUM_WC": null,
					"UNIT": "吨",
					"CONTAINER": null,
					"TP_ID": "TP201810091008460015",
					"BIG_CATEGORY_ID": "HW01",
					"METERIAL": null,
					"D_FROM": null,
					"CONTAINER_NUM_YC": null,
					"D_NAME": "bbb",
					"wxfwdm": "100-200-300",
					"CONTAINER_NUM": null,
					"CONTAINER_NUM_WC": null,
					"zysl": "100"
				}],
				"initPt": {
					"ysdwlxrsj": "手机号1$手机号2",
					"EN_NAME_YS": "名称1$名称2",
					"EN_NAME_CZ": "处置单位名称",
					"BTO_ID_CS": "XQQ",
					"IF_ADDITIONAL": "0",
					"BTO_ID_CZ": null,
					"wfjsdz": "处置地址",
					"ysdwdlyszh": "道路许可证号1$道路许可证号2",
					"CHECK_DATE": null,
					"wfjsdwlxrsj": "处置联系方式",
					"fwycdwlxrsj": "23991989",
					"wfycdwmc": "天津市昱隆泰再生资源环保处理有限公司",
					"STATUS": "0",
					"ysdwlxr": "联系人1$联系人2",
					"ysdwdz": "地址1$地址2",
					"jhqrr": null,
					"LINKTEL": null,
					"CHECK_RESULT": null,
					"IF_TP_ADDITIONAL": "0",
					"EN_ID_YS": null,
					"wfycdwbm": "EP201410280946090018",
					"jhqrrq": null,
					"EN_NAME_CS": "天津市昱隆泰再生资源环保处理有限公司",
					"EN_ID_CZ": null,
					"LINKPHONE": "bb",
					"wfycdwdz": "天津市西青区天津西青高端金属制品工业区19号",
					"wfjsdwlxr": "处置联系人",
					"ysdwmc": "名称1$名称2",
					"jhqryj": null,
					"wfjsdwmc": "处置单位名称",
					"ACTIONDATE": 1544384454420,
					"ycsxzqhdm": "120111",
					"TP_ID": "TP201810091008460015",
					"jhqrjg": null,
					"jsrq": 1546185600000,
					"ksrq": 1514736000000,
					"MAIN_ID": null,
					"CHECK_ADVICE": null,
					"fwjsdwwxfwjyxkzh": "处置许可证号",
					"yrsxzqhdm": "处置行政区划",
					"wfycdwlxr": "王富庆",
					"sysdate": 1544384454430,
					"LINKMAN": "aa",
					"jhqrsxzqh": "120000",
					"BEGINTIME": 1514736000000,
					"ENDTIME": 1546185600000,
					"EN_ID_CS": "EP201410280946090018",
					"bcsfcg": null
				},
				"belongSepa": "XQQ",
				"userPortrait": "",
				"IWBSESSION": "BROWSER-20181210055815",
				"initOverviewList": [{
					"BIG_CATEGORY_NAME": "医疗废物",
					"UNIT": "个",
					"W_NAME": "发f",
					"SOURCE_PROCESS": "21",
					"SAMLL_CATEGORY_ID": "831-001-01",
					"TP_ID": "TP201810091008460015",
					"YEAR_NUM": "11",
					"BIG_CATEGORY_ID": "HW01",
					"W_SHAPE": "大",
					"LAST_NUM": "22",
					"SAMLL_CATEGORY_NAME": "感染性废物",
					"ID": "1",
					"D_NAME": "测试",
					"CHARACTER": "T,I"
				}, {
					"BIG_CATEGORY_NAME": "医药废物",
					"UNIT": "吨",
					"W_NAME": "发大水",
					"SOURCE_PROCESS": "发达",
					"SAMLL_CATEGORY_ID": "271-002-02",
					"TP_ID": "TP201810091008460015",
					"YEAR_NUM": "11",
					"BIG_CATEGORY_ID": "HW02",
					"W_SHAPE": "12",
					"LAST_NUM": "22",
					"SAMLL_CATEGORY_NAME": "化学合成原料药生产产生的废母液及反应基废物",
					"ID": "2",
					"D_NAME": "发撒",
					"CHARACTER": "T,I"
				}, {
					"BIG_CATEGORY_NAME": "废有机溶剂与含有机溶剂废物",
					"UNIT": "吨",
					"W_NAME": "测试33有害物质",
					"SOURCE_PROCESS": "测试33来源",
					"SAMLL_CATEGORY_ID": "900-406-06",
					"TP_ID": "TP201810091008460015",
					"YEAR_NUM": "100",
					"BIG_CATEGORY_ID": "HW06",
					"W_SHAPE": "测试",
					"LAST_NUM": "50",
					"SAMLL_CATEGORY_NAME": "900-402-06和900-404-06中所列废物再生处理产生的废活性炭及其他过滤吸附介质",
					"ID": "3",
					"D_NAME": "测试33",
					"CHARACTER": "C"
				}],
				"realName": "",
				"contextPath": "",
				"orgSeq": ""
			}
			this.userRole = res.userType
			this.ifsave = res.ifsave
			this.EP_ID = this.queryJson.EP_ID
			this.TP_ID = this.queryJson.TP_ID

			this.nameList = res.initOverviewList
			this.formDataList1 = res.initPtList
			if (res.initPtList.length > 0) {
				this.formList = res.initPtList;
				console.log(this.formList);
			} else {
				this.formList = [{
					"UNIT": "",
					"SAMLL_CATEGORY_ID": "",
					"SAMLL_CATEGORY_NAME": "",
					"ID": "",
					"D_NAME": "",
					"UNIT_NUM": "",
					"BIG_CATEGORY_ID": "",
					"BIG_CATEGORY_NAME": ""
				}]
			}

			let name = res.initPt.EN_NAME_YS.split('$');
			let phone = res.initPt.ysdwlxrsj.split('$');
			let code = res.initPt.ysdwdlyszh.split('$');
			let person = res.initPt.ysdwlxr.split('$');
			let addr = res.initPt.ysdwdz.split('$');
			let ptArray = []
			for(let i = 0; i < name.length; i++){
				let ptItem = {}
				ptItem.EN_NAME_YS = name[i]
				ptItem.ysdwlxrsj = phone[i]
				ptItem.ysdwdlyszh = code[i]
				ptItem.ysdwlxr = person[i]
				ptItem.ysdwdz = addr[i]
				ptArray.push(ptItem)
			}
			this.formDataList = ptArray
			if (ptArray.length > 0) {
				this.title1fromList = []
				for (let i in ptArray) {
					let item = {
						index: i + 1,
						itemList: [{
							type: "input",
							text: ptArray[i].EN_NAME_YS,
							title: "单位名称",
							limit: "100"
						},{
							type: "input",
							text: ptArray[i].ysdwdlyszh,
							title: "道路危险货物运输许可证",
							limit: "100"
						},{
							type: "input",
							text: ptArray[i].ysdwlxr,
							title: "联系人",
							limit: "100"
						},{
							type: "input",
							text: ptArray[i].ysdwlxrsj,
							title: "联系方式",
							limit: "100"
						},{
							type: "input",
							text: ptArray[i].ysdwdz,
							title: "单位地址",
							limit: "100"
						}]
					}
					this.title1fromList.push(item)
				}
			} else {
				this.title1fromList = [{
					index: 1,
					itemList: [{
						type: "input",
						text: "",
						title: "单位名称",
						limit: "100"
					},{
						type: "input",
						text: "",
						title: "道路危险货物运输许可证",
						limit: "100"
					},{
						type: "input",
						text: "",
						title: "联系人",
						limit: "100"
					},{
						type: "input",
						text: "",
						title: "联系方式",
						limit: "100"
					},{
						type: "input",
						text: "",
						title: "单位地址",
						limit: "100"
					}]
				}]
			}
		// })
	},
	methods: {
		doSubmit () {
			if(!this.repeatClickFlag){
				this.repeatClickFlag = true
				setTimeout(() => {
					this.repeatClickFlag = false
				}, this.repaetClickTime * 1000 );
			}else{
				this.$notify.error({
					title: '警告',
					message: this.repaetClickTime + "秒内不得重复提交"
				});
				return;
			}

			if(this.tptData.compNameDetail === "" || this.tptData.licenceNoDetail === ""){
				this.$notify.error({
					title: '警告',
					message: "请填写单位名称或许可证编号，并确保存在"
				});
				return;
			}
			for (let i in this.title1fromList) {
				let item = this.title1fromList[i].itemList
				for (let j in item) {
					if (item[j].text === "") {
						this.$notify.error({
							title: '警告',
							message: "请填全[跨省运输单位信息]所有内容"
						});
						return
					}
					if(this.checkDorSign(item[j].text)){
						this.$notify.error({
							title: '警告',
							message: "[跨省运输单位信息]数据中不可输入'$'符号"
						});
						return
					}
				}
			}
			for(let i in this.formList){
				if(this.formList[i].D_NAME === "" || this.formList[i].UNIT_NUM === "" || this.formList[i].SAMLL_CATEGORY_ID === "" || this.formList[i].BIG_CATEGORY_ID === ""){
					this.$notify.error({
						title: '警告',
						message: "请填全[贮存危险废物情况]所有内容"
					});
					return;
				}
			}

			let submitData = {}
			submitData.EP_ID = this.EP_ID
			submitData.TP_ID = this.TP_ID
			
			submitData.wfjsdwmc = this.tptData.compNameDetail
			submitData.fwjsdwwxfwjyxkzh = this.tptData.licenceNoDetail
			submitData.wfjsdz = this.tptData.addrDetail
			submitData.yrsxzqhdm = this.tptData.cardDetail
			submitData.wfjsdwlxr = this.tptData.contactDetail
			submitData.wfjsdwlxrsj = this.tptData.contactPhoneDetail
			
			submitData.LINKMAN = this.transferData.name
			submitData.LINKTEL = this.transferData.phone

			submitData.ysdwmc = ""
			submitData.ysdwdz = ""
			submitData.ysdwlxr = ""
			submitData.ysdwlxrsj = ""
			submitData.ysdwdlyszh = ""
			for (let i in this.title1fromList) {
				if(i == 0){
					submitData.ysdwmc = this.title1fromList[i].itemList[0].text
					submitData.ysdwdz = this.title1fromList[i].itemList[4].text
					submitData.ysdwlxr = this.title1fromList[i].itemList[2].text
					submitData.ysdwlxrsj = this.title1fromList[i].itemList[3].text
					submitData.ysdwdlyszh = this.title1fromList[i].itemList[1].text
				}else{
					submitData.ysdwmc += "$" + this.title1fromList[i].itemList[0].text
					submitData.ysdwdz += "$" + this.title1fromList[i].itemList[4].text
					submitData.ysdwlxr += "$" + this.title1fromList[i].itemList[2].text
					submitData.ysdwlxrsj += "$" + this.title1fromList[i].itemList[3].text
					submitData.ysdwdlyszh += "$" + this.title1fromList[i].itemList[1].text
				}
			}
			
			submitData.PT_LIST = []
			for(let i in this.formList){
				submitData.PT_LIST.push(this.formList[i])
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
				url: '/plan/saveProductInfo',
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
		doResetUnitInfo () {
			this.title1fromList = [{
				index: 1,
				itemList: [{
					type: "input",
					text: "",
					title: "单位名称",
					limit: "100"
				},{
					type: "input",
					text: "",
					title: "道路危险货物运输许可证",
					limit: "100"
				},{
					type: "input",
					text: "",
					title: "联系人",
					limit: "100"
				},{
					type: "input",
					text: "",
					title: "联系方式",
					limit: "100"
				},{
					type: "input",
					text: "",
					title: "单位地址",
					limit: "100"
				}, ]
			}]
		},
		doResetSituation () {
			this.formList = [{
				"UNIT": "",
				"SAMLL_CATEGORY_ID": "",
				"SAMLL_CATEGORY_NAME": "",
				"ID": "",
				"D_NAME": "",
				"UNIT_NUM": "",
				"BIG_CATEGORY_ID": "",
				"BIG_CATEGORY_NAME": ""
			}]
		},
		addSign(){
			let item = {
				"UNIT": "",
				"SAMLL_CATEGORY_ID": "",
				"SAMLL_CATEGORY_NAME": "",
				"ID": "",
				"D_NAME": "",
				"UNIT_NUM": "",
				"BIG_CATEGORY_ID": "",
				"BIG_CATEGORY_NAME": ""
			}
			this.formList.push(item)
		},
		reduceSign(index){
			if(this.formList.length === 1){
				this.formList = []
				let item = {
					"UNIT": "",
					"SAMLL_CATEGORY_ID": "",
					"SAMLL_CATEGORY_NAME": "",
					"ID": "",
					"D_NAME": "",
					"UNIT_NUM": "",
					"BIG_CATEGORY_ID": "",
					"BIG_CATEGORY_NAME": ""
				}
				this.formList.push(item)
			}else{
				this.formList.splice(index, 1)
			}
		},
		doSearch(){
			console.log(this.licenceNo);
			console.log(this.compName);
			this.tptData.compNameDetail = "123";
			this.tptData.licenceNoDetail = "111";
			this.tptData.addrDetail = "222";
			this.tptData.cardDetail = "333";
			this.tptData.contactDetail = "444";
			this.tptData.contactPhoneDetail = "555";
		},
		checkDorSign (str){
			var r = /[$"']+/;
			var m = r.exec(str);
			return m;
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
.productCompSwitchBg{
	width: 100%;
	float: left;
}
.productCompSwitch_title{
	font-size: 18px;
	padding: 6px 0 12px;
	float: left;
}
.productCompSwitch_switch{
	float: left;
	margin: 8px 0 0 15px;
}
.productCompSwitch_switch .el-switch__label.is-active{ 
	color:#13ce66;
}
.cardDetail >label{
	width: 155px!important;
}
</style>