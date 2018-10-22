<template>
	<div id='productionSituation'>
		<my-aside :userRole="userRole" class="my-aside" :titleInfo="myTitleInfo" @doSubmit="doSubmit"></my-aside>
		<div id="dangerRubbishManagerPlan">
			<div v-if="userRole === 'CSEP'"  class="productCompSwitchBg">
				<div class="productCompSwitch_title">是否为生产型企业</div>
				<el-switch
					class="productCompSwitch_switch" 
					v-model="ifsave" 
					@change="ifsaveCheck" 
					active-color="#13ce66"
					active-text="是"
					inactive-text="否"
					active-value="1"
					inactive-value="0">
				</el-switch>
			</div>
			<assTitle :userRole="ifsaveUserRole" :titleInfo="title1" titleType="reset" :formStatus="formStatus1" @doReset="resetRawMaterial1" @formStatusChange="formStatusChange1"></assTitle>
			<assForm v-if="formStatus1 === 'card'" :formList="title1fromList" :type="ifsaveUserRole === 'CSEP' ? '' : 'label'"></assForm>
			<assTable v-else-if="formStatus1 === 'table'" :tableList="formDataList1" :tableTitleList="formDataListTitle1"></assTable>
			<assTitle :userRole="ifsaveUserRole" :titleInfo="title2" titleType="reset" :formStatus="formStatus2" @doReset="resetRawMaterial2" @formStatusChange="formStatusChange2"></assTitle>
			<assForm v-if="formStatus2 === 'card'" :formList="title2fromList" :type="ifsaveUserRole === 'CSEP' ? '' : 'label'"></assForm>
			<assTable v-else-if="formStatus2 === 'table'" :tableList="formDataList2" :tableTitleList="formDataListTitle2"></assTable>
			<assTitle :userRole="ifsaveUserRole" :titleInfo="title3" titleType="reset" :formStatus="formStatus3" @doReset="resetRawMaterial3" @formStatusChange="formStatusChange3"></assTitle>
			<assForm v-if="formStatus3 === 'card'" :formList="title3fromList" :type="ifsaveUserRole === 'CSEP' ? '' : 'label'"></assForm>
			<assTable v-else-if="formStatus3 === 'table'" :tableList="formDataList3" :tableTitleList="formDataListTitle3"></assTable>
			<assTitle :userRole="ifsaveUserRole" :titleInfo="title4" titleType="textarea"></assTitle>
			<div class="footerSign"></div>
		</div>
	</div>
</template>
<script>
import Aside from '../Aside.vue';
import assTitle from '../../common/assTitle.vue'
import assForm from '../../common/assForm.vue'
import assTable from '../../common/assTable.vue'
import { checkBrowser, getQueryString } from '../../utils/browserCheck.js'
import fetch from '../../utils/fetch.js'
export default {
	name: 'productionSituation',
	data () {
		return {
			myTitleInfo: {
				title: "产品生产情况",
				textInfoList: [
					"主要原辅材料及消耗量：计划期限上一年度及本年度计划用于生产的主要原辅材料的商品名称或化学名称，及其实际与计划年消耗量；",
					"主要生产设备及数量：用于生产的主要设备名称及其数量；",
					"主要产品及产量：主要产品的商品名称或化学名称，及其年生产量；",
					"生产工艺说明：文字说明所有危险废物的生产环节。"
				]
			},
			userRole: '',
			ifsave: "0",
			ifsaveUserRole: '',
			EP_ID: "",
			TP_ID: "",
			queryJson: {},
			title1: {
				title: "原辅材料及消耗量",
			},
			title2: {
				title: "生产设备及数量",
			},
			title3: {
				title: "产品及产量",
			},
			title4: {
				title: "生产工艺说明",
				placeholder: "必填",
				text: ""
			},
			title1fromList: [{
				index: 1,
				itemList: [{
					type: "input",
					text: "",
					title: "原辅材料名称",
					limit: "32"
				}, {
					type: "selectThree",
					text: "",
					title: "单位"
				}, {
					type: "inputWithUnitSelect",
					text: "",
					title: "上年度消耗量",
					unit: ""
				}, {
					type: "inputWithUnitSelect",
					text: "",
					title: "本年度计划消耗量",
					unit: ""
				}]
			}],
			title2fromList: [{
				index: 1,
				itemList: [{
					type: "input",
					text: "",
					title: "设备名称",
					isSingle: "1",
					limit: "32"
				}, {
					type: "inputWithUnit",
					text: "",
					unit: "台",
					title: "上年度数量"
				}, {
					type: "inputWithUnit",
					text: "",
					unit: "台",
					title: "本年度数量"
				}]
			}],
			title3fromList: [{
				index: 1,
				itemList: [{
					type: "input",
					text: "",
					title: "产品名称",
					limit: "32"
				}, {
					type: "select",
					text: "",
					title: "单位"
				}, {
					type: "inputWithUnitSelect",
					text: "",
					title: "上年度产量",
					unit: ""
				}, {
					type: "inputWithUnitSelect",
					text: "",
					title: "本年度计划产量",
					unit: ""
				}]
			}],
			formStatus1: 'card',
			formStatus2: 'card',
			formStatus3: 'card',          
			formDataListTitle1: [{
				title: '原辅材料名称',
				key: 'NAME'
			},{
				title: '上年度消耗量',
				key: 'LAST_NUM'
			},{
				title: '本年度计划消耗量',
				key: 'YEAR_NUM'
			},{
				title: '单位',
				key: 'UNIT'
			}],
			formDataListTitle2: [{
				title: '设备名称',
				key: 'NAME'
			},{
				title: '上年度数量(台)',
				key: 'LAST_NUM'
			},{
				title: '本年度数量(台)',
				key: 'YEAR_NUM'
			}],
			formDataListTitle3: [{
				title: '产品名称',
				key: 'NAME'
			},{
				title: '上年度产量',
				key: 'LAST_NUM'
			},{
				title: '本年度计划产量',
				key: 'YEAR_NUM'
			},{
				title: '单位',
				key: 'UNIT'
			}],
			formDataList1: [],
			formDataList2: [],
			formDataList3: [],
		}
	},
	components: {
		'my-aside': Aside,
		'assTitle': assTitle,
		'assForm': assForm,
		'assTable': assTable
	},
	mounted () {
		checkBrowser(() => {
			// this.$message({
			// 	showClose: true,
			// 	message: '您当前使用的浏览器不支持本模块功能，建议使用Chrome浏览器',
			// 	type: 'warning'
			// });
			this.$router.push({ path: '/pageIncompatible' })
		})
		this.queryJson = getQueryString()

		this.formStatus1 = 'card'
		this.formStatus2 = 'card'
		this.formStatus3 = 'card'
		
		fetch({
			url: '/plan/initProductInfo',
			method: 'POST',
			data: 'params=' + JSON.stringify(this.queryJson)
		}).then(res => {
			// let res = {
			// 	"initProductOutput": [
			// 		{
			// 			"UNIT": "aaa",
			// 			"NAME": "111",
			// 			"LAST_NUM": "100.00",
			// 			"ID": "1",
			// 			"TP_ID": "TP201809120707190010",
			// 			"YEAR_NUM": "1000.00"
			// 		},
			// 		{
			// 			"UNIT": "aaa",
			// 			"NAME": "111",
			// 			"LAST_NUM": "100.00",
			// 			"ID": "2",
			// 			"TP_ID": "TP201809120707190010",
			// 			"YEAR_NUM": "1000.00"
			// 		}
			// 	],
			// 	"WJWT": "czlEcjhPMjRXelI5LzQrVE5JS1hiY0phWnd2KzhIdkFaa0JCSFNUWk1xQT0=",
			// 	"operatorId": "",
			// 	"empId": "",
			// 	"userType": "CSEP",
			// 	"initProductOri": [
			// 		{
			// 			"UNIT": "吨",
			// 			"NAME": "111",
			// 			"LAST_NUM": "100.00",
			// 			"Id": "1",
			// 			"TP_ID": "TP201809120707190010",
			// 			"YEAR_NUM": "1000.00"
			// 		},
			// 		{
			// 			"UNIT": "年",
			// 			"NAME": "111",
			// 			"LAST_NUM": "100.00",
			// 			"Id": "2",
			// 			"TP_ID": "TP201809120707190010",
			// 			"YEAR_NUM": "1000.00"
			// 		}
			// 	],
			// 	"newGuideFlag": "",
			// 	"initProductEqu": [
			// 		{
			// 			"UNIT": "aaa",
			// 			"NAME": "111",
			// 			"LAST_NUM": "100.00",
			// 			"Id": "1",
			// 			"TP_ID": "TP201809120707190010",
			// 			"YEAR_NUM": "1000.00"
			// 		},
			// 		{
			// 			"UNIT": "aaa",
			// 			"NAME": "111",
			// 			"LAST_NUM": "100.00",
			// 			"Id": "2",
			// 			"TP_ID": "TP201809120707190010",
			// 			"YEAR_NUM": "1000.00"
			// 		}
			// 	],
			// 	"belongQ": "",
			// 	"belongS": "",
			// 	"nickName": "天津合佳威立雅环境服务有限公司",
			// 	"orgCode": "",
			// 	"userId": "EP201410280910450012",
			// 	"userName": "",
			// 	"sepaName": "津南区",
			// 	"status": "",
			// 	"ifLogin": "0",
			// 	"ROLEID": "CSEP",
			// 	"epName": "天津合佳威立雅环境服务有限公司",
			// 	"epId": "EP201410280910450012",
			// 	"belongSepa": "JNQ",
			// 	"userPortrait": "",
			// 	"IWBSESSION": "BROWSER-20180916033650",
			// 	"realName": "",
			// 	"contextPath": "",
			// 	"initProductInfo": {
			// 		"PRODUCT_DESC": "aaa",
			// 		"sysdate": 1536974048557,
			// 		"TP_ID": "TP201809120707190010",
			// 		"STATUS": "00",
			// 		"EP_ID": "EP201410280910450012"
			// 	},
			// 	"orgSeq": "",
			// 	"ifsave" : "0"
			// }
			this.userRole = res.userType
			this.ifsave = res.ifsave
			this.ifsaveUserRole = this.ifsave === '1' ?  this.userRole : 'ifsave'
			this.EP_ID = this.queryJson.EP_ID
			this.TP_ID = this.queryJson.TP_ID

			this.formDataList1 = res.initProductOri
			if (res.initProductOri.length > 0) {
				this.title1fromList = []
				for (let i in res.initProductOri) {
					let item = {
						index: i + 1,
						itemList: [{
							type: "input",
							text: res.initProductOri[i].NAME,
							title: "原辅材料名称",
							limit: "32"
						}, {
							type: "selectThree",
							text: res.initProductOri[i].UNIT,
							title: "单位"
						}, {
							type: "inputWithUnitSelect",
							text: res.initProductOri[i].LAST_NUM,
							title: "上年度消耗量",
							unit: res.initProductOri[i].UNIT
						}, {
							type: "inputWithUnitSelect",
							text: res.initProductOri[i].YEAR_NUM,
							title: "本年度计划消耗量",
							unit: res.initProductOri[i].UNIT
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
						title: "原辅材料名称",
						limit: "32"
					}, {
						type: "selectThree",
						text: "",
						title: "单位"
					}, {
						type: "inputWithUnitSelect",
						text: "",
						title: "上年度消耗量",
						unit: ""
					}, {
						type: "inputWithUnitSelect",
						text: "",
						title: "本年度计划消耗量",
						unit: ""
					}]
				}]
			}

			this.formDataList2 = res.initProductEqu
			if (res.initProductEqu.length > 0) {
				this.title2fromList = []
				for (let i in res.initProductEqu) {
					let item = {
						index: i + 1,
						itemList: [{
							type: "input",
							isSingle: "1",
							text: res.initProductEqu[i].NAME,
							title: "设备名称",
							limit: "32"
						}, {
							type: "inputWithUnit",
							unit: "台",
							text: res.initProductEqu[i].LAST_NUM,
							title: "上年度数量"
						}, {
							type: "inputWithUnit",
							unit: "台",
							text: res.initProductEqu[i].YEAR_NUM,
							title: "本年度数量"
						}]
					}
					this.title2fromList.push(item)
				}
			} else {
				this.title2fromList = [{
					index: 1,
					itemList: [{
						type: "input",
						text: "",
						isSingle: "1",
						title: "设备名称",
						limit: "32"
					}, {
						type: "inputWithUnit",
						unit: "台",
						text: "",
						title: "上年度数量"
					}, {
						type: "inputWithUnit",
						unit: "台",
						text: "",
						title: "本年度数量"
					}]
				}]
			}

			this.formDataList3 = res.initProductOutput
			if (res.initProductOutput.length > 0) {
				this.title3fromList = []
				for (let i in res.initProductOutput) {
					let item = {
						index: i + 1,
						itemList: [{
							type: "input",
							text: res.initProductOutput[i].NAME,
							title: "产品名称",
							limit: "32"
						}, {
							type: "select",
							text: res.initProductOutput[i].UNIT,
							title: "单位"
						}, {
							type: "inputWithUnitSelect",
							text: res.initProductOutput[i].LAST_NUM,
							title: "上年度产量",
							unit: res.initProductOutput[i].UNIT
						}, {
							type: "inputWithUnitSelect",
							text: res.initProductOutput[i].YEAR_NUM,
							title: "本年度计划产量",
							unit: res.initProductOutput[i].UNIT
						}] 
					}
					this.title3fromList.push(item)
				}
			} else {
				this.title3fromList = [{
					index: 1,
					itemList: [{
						type: "input",
						text: "",
						title: "产品名称",
						limit: "32"
					}, {
						type: "select",
						text: "",
						title: "单位"
					}, {
						type: "inputWithUnitSelect",
						text: "",
						title: "上年度产量",
						unit: ""
					}, {
						type: "inputWithUnitSelect",
						text: "",
						title: "本年度计划产量",
						unit: ""
					}]
				}]
			}
			this.title4.text = res.initProductInfo && res.initProductInfo.PRODUCT_DESC ? res.initProductInfo.PRODUCT_DESC : ""
		})
	},
	methods: {
		doSubmit () {
			let submitData = {}
			submitData.EP_ID = this.EP_ID
			submitData.TP_ID = this.TP_ID
			if(this.ifsave === '1'){
				submitData.PRODUCT_DESC = this.title4.text
				submitData.PRODUCT_ORI = []
				submitData.PRODUCT_EQU = []
				submitData.PRODUCT_OUTPUT = []

				for (let i in this.title1fromList) {
					let item = {}
					item.NAME = this.title1fromList[i].itemList[0].text
					item.UNIT = this.title1fromList[i].itemList[1].text
					item.LAST_NUM = this.title1fromList[i].itemList[2].text
					item.YEAR_NUM = this.title1fromList[i].itemList[3].text

					submitData.PRODUCT_ORI.push(item)
				}
				for (let i in this.title2fromList) {
					let item = {}
					item.NAME = this.title2fromList[i].itemList[0].text
					item.UNIT = "台"
					item.LAST_NUM = this.title2fromList[i].itemList[1].text
					item.YEAR_NUM = this.title2fromList[i].itemList[2].text

					submitData.PRODUCT_EQU.push(item)
				}
				for (let i in this.title3fromList) {
					let item = {}
					item.NAME = this.title3fromList[i].itemList[0].text
					item.UNIT = this.title3fromList[i].itemList[1].text
					item.LAST_NUM = this.title3fromList[i].itemList[2].text
					item.YEAR_NUM = this.title3fromList[i].itemList[3].text

					submitData.PRODUCT_OUTPUT.push(item)
				}
				for (let i in submitData.PRODUCT_ORI) {
					for (let key in submitData.PRODUCT_ORI[i]) {
						if (submitData.PRODUCT_ORI[i][key] === "") {
							this.$notify.error({
								title: '警告',
								message: "请填全[原辅材料及消耗量]所有内容"
							});
							return
						}
					}
				}
				for (let i in submitData.PRODUCT_EQU) {
					for (let key in submitData.PRODUCT_EQU[i]) {
						if (submitData.PRODUCT_EQU[i][key] === "") {
							this.$notify.error({
								title: '警告',
								message: "请填全[生产设备及数量]所有内容"
							});
							return
						}
					}
				}
				for (let i in submitData.PRODUCT_OUTPUT) {
					for (let key in submitData.PRODUCT_OUTPUT[i]) {
						if (submitData.PRODUCT_OUTPUT[i][key] === "") {
							this.$notify.error({
								title: '警告',
								message: "请填全[产品及产量]所有内容"
							});
							return
						}
					}
				}
				if (submitData.PRODUCT_DESC === "") {
					this.$notify.error({
						title: '警告',
						message: "请填写生产工艺说明"
					});
					return
				}
			}		
			submitData.ifsave = this.ifsave
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
		resetRawMaterial1 () {
			this.title1fromList = [{
				index: 1,
				itemList: [{
					type: "input",
					text: "",
					title: "原辅材料名称",
					limit: "32"
				}, {
					type: "selectThree",
					text: "",
					title: "单位"
				}, {
					type: "inputWithUnitSelect",
					text: "",
					title: "上年度消耗量",
					unit: ""
				}, {
					type: "inputWithUnitSelect",
					text: "",
					title: "本年度计划消耗量",
					unit: ""
				}]
			}]
		},
		resetRawMaterial2 () {
			this.title2fromList = [{
				index: 1,
				itemList: [{
					type: "input",
					text: "",
					isSingle: "1",
					title: "设备名称",
					limit: "32"
				}, {
					type: "inputWithUnit",
					unit: "台",
					text: "",
					title: "上年度数量"
				}, {
					type: "inputWithUnit",
					unit: "台",
					text: "",
					title: "本年度数量"
				}]
			}]
		},
		resetRawMaterial3 () {
			this.title3fromList = [{
				index: 1,
				itemList: [{
					type: "input",
					text: "",
					title: "产品名称",
					limit: "32"
				}, {
					type: "select",
					text: "",
					title: "单位"
				}, {
					type: "inputWithUnitSelect",
					text: "",
					title: "上年度产量",
					unit: ""
				}, {
					type: "inputWithUnitSelect",
					text: "",
					title: "本年度计划产量",
					unit: ""
				}]
			}]
		},
		formStatusChange1(status){
			this.formStatus1 = status
		},
		formStatusChange2(status){
			this.formStatus2 = status
		},
		formStatusChange3(status){
			this.formStatus3 = status
		},
		ifsaveCheck(val) {
			if (val === '1') {
				this.ifsaveUserRole = this.userRole
			}else {
				this.$confirm('切换后数据将会被清空，是否确定?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.resetRawMaterial1()
					this.resetRawMaterial2()
					this.resetRawMaterial3()
					this.title4.text = ""
					this.ifsaveUserRole = "ifsave"
				}).catch(() => {
					if(val === '1'){
						this.ifsave = "0"
					}else{
						this.ifsave = "1"
					}    
				});
				
			}
			
		}
	}
}
</script>
<style>
#productionSituation {
  display: -webkit-flex; /* Safari */
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  /*align-items:center;*/
  align-content: center;
  overflow-y: hidden;
}
#dangerRubbishManagerPlan {
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
</style>