<template>
	<div id='productionSituation'>
		<my-aside :userRole="userRole" class="my-aside" :titleInfo="myTitleInfo" @doSubmit="doSubmit"></my-aside>
		<div id="dangerRubbishManagerPlan">
			<assTitle :userRole="userRole" :titleInfo="title1" titleType="reset" @doReset="resetRawMaterial"></assTitle>
			<assForm :formList="title1fromList" :type="userRole === 'CSEP' ? '' : 'label'"></assForm>
			<assTitle :userRole="userRole" :titleInfo="title2" titleType="reset" @doReset="resetRawMaterial"></assTitle>
			<assForm :formList="title2fromList" :type="userRole === 'CSEP' ? '' : 'label'"></assForm>
			<assTitle :userRole="userRole" :titleInfo="title3" titleType="reset" @doReset="resetRawMaterial"></assTitle>
			<assForm :formList="title3fromList" :type="userRole === 'CSEP' ? '' : 'label'"></assForm>
			<assTitle :userRole="userRole" :titleInfo="title4" titleType="textarea"></assTitle>
			<div class="footerSign"></div>
		</div>
	</div>
</template>
<script>
import Aside from '../Aside.vue';
import assTitle from '../../common/assTitle.vue'
import assForm from '../../common/assForm.vue'
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
					title: "原辅材料名称"
				}, {
					type: "select",
					text: "",
					title: "单位"
				}, {
					type: "input",
					text: "",
					title: "上年度消耗量"
				}, {
					type: "input",
					text: "",
					title: "本年度计划消耗量"
				}]
			}],
			title2fromList: [{
				index: 1,
				itemList: [{
					type: "input",
					text: "",
					title: "设备名称",
					isSingle: "1"
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
					title: "产品名称"
				}, {
					type: "select",
					text: "",
					title: "单位"
				}, {
					type: "input",
					text: "",
					title: "上年度产量"
				}, {
					type: "input",
					text: "",
					title: "本年度计划产量"
				}]
			}],
		}
	},
	components: {
		'my-aside': Aside,
		'assTitle': assTitle,
		'assForm': assForm
	},
	watch: {
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

		fetch({
			url: '/plan/initProductInfo',
			method: 'POST',
			data: 'params='+JSON.stringify(this.queryJson)
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
		// 	"orgSeq": ""
		// }
		this.userRole = res.userType
		this.EP_ID = this.queryJson.EP_ID
		this.TP_ID = this.queryJson.TP_ID

		if (res.initProductOri.length > 0) {
			this.title1fromList = []
			for (let i in res.initProductOri) {
				let item = {
					index: i + 1,
					itemList: [{
						type: "input",
						text: res.initProductOri[i].NAME,
						title: "原辅材料名称"
					}, {
						type: "select",
						text: res.initProductOri[i].UNIT,
						title: "单位"
					}, {
						type: "input",
						text: res.initProductOri[i].LAST_NUM,
						title: "上年度消耗量"
					}, {
						type: "input",
						text: res.initProductOri[i].YEAR_NUM,
						title: "本年度计划消耗量"
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
					title: "原辅材料名称"
				}, {
					type: "select",
					text: "",
					title: "单位"
				}, {
					type: "input",
					text: "",
					title: "上年度消耗量"
				}, {
					type: "input",
					text: "",
					title: "本年度计划消耗量"
				}]
			}]
		}

		if (res.initProductEqu.length > 0) {
			this.title2fromList = []
			for (let i in res.initProductEqu) {
				let item = {
					index: i + 1,
					itemList: [{
						type: "input",
						isSingle: "1",
						text: res.initProductEqu[i].NAME,
						title: "设备名称"
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
					title: "设备名称"
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

		if (res.initProductOutput.length > 0) {
			this.title3fromList = []
			for (let i in res.initProductOutput) {
				let item = {
					index: i + 1,
					itemList: [{
						type: "input",
						text: res.initProductOutput[i].NAME,
						title: "产品名称"
					}, {
						type: "select",
						text: res.initProductOutput[i].UNIT,
						title: "单位"
					}, {
						type: "input",
						text: res.initProductOutput[i].LAST_NUM,
						title: "上年度产量"
					}, {
						type: "input",
						text: res.initProductOutput[i].YEAR_NUM,
						title: "本年度计划产量"
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
					title: "产品名称"
				}, {
					type: "select",
					text: "",
					title: "单位"
				}, {
					type: "input",
					text: "",
					title: "上年度产量"
				}, {
					type: "input",
					text: "",
					title: "本年度计划产量"
				}]
			}]
		}
		this.title4.text = res.initProductInfo.PRODUCT_DESC
		})
	},
	methods: {
		doSubmit () {
			const loading = this.$loading({
				lock: true,
				text: 'Loading',
				spinner: 'el-icon-loading',
				background: 'rgba(0, 0, 0, 0.3)'
			});

			let submitData = {}
			submitData.EP_ID = this.EP_ID
			submitData.TP_ID = this.TP_ID
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

			for (let key in this.queryJson) {
				submitData[key] = this.queryJson[key]
			}
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
		resetRawMaterial () {
			console.log("原辅材料及消耗量");
		}
	}
}
</script>
<style scoped>
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
</style>