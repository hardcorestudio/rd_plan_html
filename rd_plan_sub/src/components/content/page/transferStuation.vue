<template>
	<div id='transferStuation'>
		<my-aside :userRole="userRole" class="my-aside" :titleInfo="myTitleInfo" @doSubmit="doSubmit"></my-aside>
		<div id="transFerStiationArea">
			<assSwitch :userRole="userRole" title="贮存措施" :switchInfo="switchInfo1"></assSwitch>
			<assTitle :userRole="userRole" :titleInfo="title1" titleType="reset" @doReset="resetInfo1"></assTitle>
			<assForm :formList="title1fromList" :type="userRole === 'CSEP' ? '' : 'label'"></assForm>
			<assTitle :userRole="userRole" :titleInfo="title2" titleType="reset" @doReset="resetInfo2"></assTitle>
			<assForm :formList="title2fromList" :type="userRole === 'CSEP' ? '' : 'label'" :levelOneData="levelOneData"></assForm>
			<assTitle :userRole="userRole" :titleInfo="title3" titleType="textarea"></assTitle>
			<!-- <assSwitch :userRole="userRole" title="运输措施" :switchInfo="switchInfo2"></assSwitch>
			<el-form ref="form" :model="compInfo" :rules="rules" label-width="80px" class="transferStuationFrom">
				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item label="单位名称" prop="compName">
							<el-input v-if="userRole=== 'CSEP'" v-model="compInfo.compName" placeholder="必填"></el-input>
							<el-row v-else>{{compInfo.compName}}</el-row>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="运输资质" prop="compVal">
							<el-input v-if="userRole=== 'CSEP'" v-model="compInfo.compVal" placeholder="必填"></el-input>
							<el-row v-else>{{compInfo.compVal}}</el-row>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
			<assTitle :userRole="userRole" :titleInfo="title4" titleType="textarea"></assTitle> -->
			<assTitle :userRole="userRole" :titleInfo="title4" titleType="reset" @doReset="resetInfo3"></assTitle>
			<assTransferFrom :userRole="userRole" :formList="transferFromList"></assTransferFrom>
			<assTitle :userRole="userRole" :titleInfo="title5" titleType="hint"></assTitle>
			<div class="footerSign"></div>
		</div>
	</div>
</template>
<script>
import Aside from '../Aside.vue';
import assTitle from '../../common/assTitle.vue'
import assForm from '../../common/assForm.vue'
import assSwitch from '../../common/assSwitch.vue'
import assTransferFrom from '../../common/assTransferFrom.vue'
import { checkBrowser, getQueryString } from '../../utils/browserCheck.js'
import fetch from '../../utils/fetch.js'
export default {
	name: 'transferStuation',
	data () {
		return {
			myTitleInfo: {
				title: "危险废物转移情况",
				textInfoList: [
					"贮存措施：废物收集、贮存相关环保制度的执行情概况，根据实际情况勾选，同时填写废物的贮存设施现状及贮存情况，贮存方面的相关要求，如数量。面积以及采取的污染防治措施；",
					"运输措施：废物运输过程中相关环保制度的执行情况，根据实际情概况勾选，同时填写废物运输过程中采取的污染防治措施；",
					"转移计划：危险废物数量、种类；拟接收危险废物的经营单位的资质和经营范围等。",
					"拟贮存量: 待定",
					"上年度贮存量: 待定",
					"截止上年度年底累计贮存量: 待定"
				]
			},
			userRole: '',
			queryJson: {},
			title1: {
				title: "危险废物贮存设施现状",
			},
			title2: {
				title: "贮存危险废物情况",
			},
			title3: {
				title: "贮存过程中采取的污染防治和事故预防措施",
				placeholder: "必填",
				text: ""
			},
			title4: {
				title: "运输措施",
			},
			title5: {
				title: "转移计划",
				subTitle: "请填写危险废物委托利用/处置措施",
			},
			title1fromList: [{
				index: 1,
				itemList: [{
					type: "input",
					text: "",
					title: "设施名称"
				}, {
					type: "select",
					text: "",
					title: "单位"
				}, {
					type: "input",
					text: "",
					title: "数量"
				}, {
					type: "input",
					text: "",
					title: "类型"
				}, {
					type: "inputWithUnit",
					text: "",
					title: "面积",
					unit: "平方米"
				}, {
					type: "input",
					text: "",
					title: "贮存能力"
				}]
			}],
			title2fromList: [{
				index: 1,
				itemList: [{
					type: "selectLevelText",
					text1: "",
					title1: "名称",
					text2: "",
					title2: "类别"
				}, {
					type: "select",
					text: "",
					title: "单位",
				}, {
					type: "input",
					text: "",
					title: "拟贮存量",
				}, {
					type: "input",
					text: "",
					title: "上年度贮存量",
				}, {
					type: "input",
					text: "",
					title: "截止上年度年底累计贮存量",
				}, {
					type: "input",
					text: "",
					title: "贮存原因"
				}]
			}],
			switchInfo1: [{
				id: "1",
				name: "贮存场所是否符合《危险废物贮存污染控制标准》有关要求",
				value: ""
			}, {
				id: "2",
				name: "是否按危险废物特性分类收集、贮存",
				value: ""
			}, {
				id: "3",
				name: "是否混合贮存未经安全性处置且性质不相容的危险废物",
				value: ""
			}, {
				id: "4",
				name: "是否将危险废物混入非危险废物中贮存",
				value: ""
			}, {
				id: "5",
				name: "是否通过建设项目环境影响评价审批及竣工环境保护验收",
				value: ""
			}],
			// switchInfo2: [{
			// 	id: "1",
			// 	name: "运输过程中是否遵守危险货物运输管理的规定",
			// 	value: ""
			// }, {
			// 	id: "2",
			// 	name: "是否按危险废物特性分类运输",
			// 	value: ""
			// }, {
			// 	id: "3",
			// 	name: "是否委托运输",
			// 	value: ""
			// }],
			// compInfo: {
			// 	compName: "",
			// 	compVal: ""
			// },
			levelOneData: [],
			transferFromList:[{
				index: "1",
				itemList: [{
					switchValue1: "0",
					switchValue2: "0",
					switchValue3: "0",
					compName: "",
					compVal: "",
					textarea: ""
				}]
			}]
		}
	},
	components: {
		'my-aside': Aside,
		'assTitle': assTitle,
		'assForm': assForm,
		'assSwitch': assSwitch,
		'assTransferFrom': assTransferFrom
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
			url: '/plan/initTransfer',
			method: 'POST',
			data: 'params=' + JSON.stringify(this.queryJson)
		}).then(res => {

			// let res = {
			// 	"WJWT": "czlEcjhPMjRXelI5LzQrVE5JS1hiY25iUjlwN2tRVmdZb2xRRVl6WEl2QT0=",
			// 	"initProductFacility": [{
			// 		"UNIT": "吨",
			// 		"NAME": "111",
			// 		"AREA_UNIT": "平方米",
			// 		"AREA": "100",
			// 		"ID": "1",
			// 		"NUM_UNIT": "个",
			// 		"TP_ID": "TP201809120707190010",
			// 		"NUM": "100.00",
			// 		"STORE": "111111",
			// 		"TYPE": "bbb"
			// 	}, {
			// 		"UNIT": "吨",
			// 		"NAME": "111",
			// 		"AREA_UNIT": "平方米",
			// 		"AREA": "100",
			// 		"ID": "2",
			// 		"NUM_UNIT": "个",
			// 		"TP_ID": "TP201809120707190010",
			// 		"NUM": "100.00",
			// 		"STORE": "111111",
			// 		"TYPE": "bbb"
			// 	}],
			// 	"operatorId": "",
			// 	"initProductYs": [{
			// 		"EN_NAME_YS": "aaa",
			// 		"EN_ID_YS": "111",
			// 		"YS_PROCESS": "aaaaaaaaa",
			// 		"ID": "1",
			// 		"TP_ID": "TP201809120707190010",
			// 		"YS_2": 0,
			// 		"YS_ZZ": "bbb",
			// 		"YS_1": 1,
			// 		"YS_3": 1
			// 	}, {
			// 		"EN_NAME_YS": "bbb",
			// 		"EN_ID_YS": "222",
			// 		"YS_PROCESS": "bbbbbbbbbbb",
			// 		"ID": "2",
			// 		"TP_ID": "TP201809120707190010",
			// 		"YS_2": 0,
			// 		"YS_ZZ": "bbb",
			// 		"YS_1": 1,
			// 		"YS_3": 1
			// 	}, {
			// 		"EN_NAME_YS": "aaa",
			// 		"EN_ID_YS": "111",
			// 		"YS_PROCESS": "aaaaaaaaa",
			// 		"ID": "3",
			// 		"TP_ID": "TP201809120707190010",
			// 		"YS_2": 0,
			// 		"YS_ZZ": "bbb",
			// 		"YS_1": 1,
			// 		"YS_3": 1
			// 	}, {
			// 		"EN_NAME_YS": "bbb",
			// 		"EN_ID_YS": "222",
			// 		"YS_PROCESS": "bbbbbbbbbbb",
			// 		"ID": "4",
			// 		"TP_ID": "TP201809120707190010",
			// 		"YS_2": 0,
			// 		"YS_ZZ": "bbb",
			// 		"YS_1": 1,
			// 		"YS_3": 1
			// 	}, {
			// 		"EN_NAME_YS": "aaa",
			// 		"EN_ID_YS": "111",
			// 		"YS_PROCESS": "aaaaaaaaa",
			// 		"ID": "5",
			// 		"TP_ID": "TP201809120707190010",
			// 		"YS_2": 0,
			// 		"YS_ZZ": "bbb",
			// 		"YS_1": 1,
			// 		"YS_3": 1
			// 	}, {
			// 		"EN_NAME_YS": "bbb",
			// 		"EN_ID_YS": "222",
			// 		"YS_PROCESS": "bbbbbbbbbbb",
			// 		"ID": "6",
			// 		"TP_ID": "TP201809120707190010",
			// 		"YS_2": 0,
			// 		"YS_ZZ": "bbb",
			// 		"YS_1": 1,
			// 		"YS_3": 1
			// 	}],
			// 	"empId": "",
			// 	"userType": "CSEP",
			// 	"newGuideFlag": "",
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
			// 	"initTransfer": {
			// 		"CC_2": 1,
			// 		"CC_1": 0,
			// 		"CC_5": 0,
			// 		"sysdate": 1537051428310,
			// 		"CC_4": 1,
			// 		"CC_3": 0,
			// 		"TP_ID": "TP201809120707190010",
			// 		"STATUS": "00",
			// 		"CC_PROCESS": "aaa"
			// 	},
			// 	"epName": "天津合佳威立雅环境服务有限公司",
			// 	"epId": "EP201410280910450012",
			// 	"belongSepa": "JNQ",
			// 	"userPortrait": "",
			// 	"IWBSESSION": "BROWSER-20180917065100",
			// 	"initOverviewList": [{
			// 		"BIG_CATEGORY_NAME": "范德萨",
			// 		"UNIT": "吨",
			// 		"W_NAME": "范德萨",
			// 		"SOURCE_PROCESS": "afd",
			// 		"SAMLL_CATEGORY_ID": "1124325432",
			// 		"TP_ID": "TP201809120707190010",
			// 		"YEAR_NUM": "1000",
			// 		"BIG_CATEGORY_ID": "HW01",
			// 		"W_SHAPE": "范德萨",
			// 		"LAST_NUM": "100",
			// 		"SAMLL_CATEGORY_NAME": "范德萨发撒发撒的",
			// 		"ID": "1",
			// 		"D_NAME": "aa",
			// 		"CHARACTER": "啊啊啊"
			// 	}, {
			// 		"BIG_CATEGORY_NAME": "范德萨",
			// 		"UNIT": "吨",
			// 		"W_NAME": "范德萨",
			// 		"SOURCE_PROCESS": "afd",
			// 		"SAMLL_CATEGORY_ID": "1124325432",
			// 		"TP_ID": "TP201809120707190010",
			// 		"YEAR_NUM": "1000",
			// 		"BIG_CATEGORY_ID": "HW01",
			// 		"W_SHAPE": "范德萨",
			// 		"LAST_NUM": "100",
			// 		"SAMLL_CATEGORY_NAME": "范德萨发撒发撒的",
			// 		"ID": "2",
			// 		"D_NAME": "aa",
			// 		"CHARACTER": "啊啊啊"
			// 	}, {
			// 		"BIG_CATEGORY_NAME": "范德萨",
			// 		"UNIT": "吨",
			// 		"W_NAME": "范德萨",
			// 		"SOURCE_PROCESS": "afd",
			// 		"SAMLL_CATEGORY_ID": "1124325432",
			// 		"TP_ID": "TP201809120707190010",
			// 		"YEAR_NUM": "1000",
			// 		"BIG_CATEGORY_ID": "HW01",
			// 		"W_SHAPE": "范德萨",
			// 		"LAST_NUM": "100",
			// 		"SAMLL_CATEGORY_NAME": "范德萨发撒发撒的",
			// 		"ID": "3",
			// 		"D_NAME": "aa",
			// 		"CHARACTER": "啊啊啊"
			// 	}],
			// 	"realName": "",
			// 	"contextPath": "",
			// 	"initProductCc": [{
			// 		"STORE_LAST_UNIT": "个",
			// 		"BIG_CATEGORY_NAME": "放大睡觉了；房间打扫；",
			// 		"STORE_REASON": "啊啊啊",
			// 		"STORE_LAST": "1000.00",
			// 		"ID": "1",
			// 		"D_NAME": "111",
			// 		"STORE_LASTSUM": "吨",
			// 		"TP_ID": "TP201809120707190010",
			// 		"STORE_LASTSUM_UNIT": null,
			// 		"STORE_PLAN_UNIT": "吨",
			// 		"STORE_PLAN": "1000.00",
			// 		"BIG_CATEGORY_ID": "HW01"
			// 	}, {
			// 		"STORE_LAST_UNIT": "个",
			// 		"BIG_CATEGORY_NAME": "放大睡觉了；房间打扫；",
			// 		"STORE_REASON": "啊啊啊",
			// 		"STORE_LAST": "1000.00",
			// 		"ID": "2",
			// 		"D_NAME": "111",
			// 		"STORE_LASTSUM": "吨",
			// 		"TP_ID": "TP201809120707190010",
			// 		"STORE_LASTSUM_UNIT": null,
			// 		"STORE_PLAN_UNIT": "吨",
			// 		"STORE_PLAN": "1000.00",
			// 		"BIG_CATEGORY_ID": "HW01"
			// 	}, {
			// 		"STORE_LAST_UNIT": "个",
			// 		"BIG_CATEGORY_NAME": "放大睡觉了；房间打扫；",
			// 		"STORE_REASON": "啊啊啊",
			// 		"STORE_LAST": "1000.00",
			// 		"ID": "3",
			// 		"D_NAME": "111",
			// 		"STORE_LASTSUM": "吨",
			// 		"TP_ID": "TP201809120707190010",
			// 		"STORE_LASTSUM_UNIT": null,
			// 		"STORE_PLAN_UNIT": "吨",
			// 		"STORE_PLAN": "1000.00",
			// 		"BIG_CATEGORY_ID": "HW01"
			// 	}],
			// 	"orgSeq": ""
			// }

			this.userRole = res.userType
			this.switchInfo1[0].value = res.initTransfer.CC_1 ? res.initTransfer.CC_1 + "" : '0'
			this.switchInfo1[1].value = res.initTransfer.CC_2 ? res.initTransfer.CC_2 + "" : '0'
			this.switchInfo1[2].value = res.initTransfer.CC_3 ? res.initTransfer.CC_3 + "" : '0'
			this.switchInfo1[3].value = res.initTransfer.CC_4 ? res.initTransfer.CC_4 + "" : '0'
			this.switchInfo1[4].value = res.initTransfer.CC_5 ? res.initTransfer.CC_5 + "" : '0'

			if (res.initProductFacility.length > 0) {
				this.title1fromList = []
				for (let i in res.initProductFacility) {
					let item = {
						index: i + 1,
						itemList: [{
							type: "input",
							text: res.initProductFacility[i].NAME,
							title: "设施名称"
						}, {
							type: "inputWithUnit",
							text: res.initProductFacility[i].NUM,
							title: "数量",
							unit: "个"
						}, {
							type: "input",
							text: res.initProductFacility[i].STORE,
							title: "贮存能力"
						}, {
							type: "select",
							text: res.initProductFacility[i].UNIT,
							title: "单位"
						}, {
							type: "input",
							text: res.initProductFacility[i].TYPE,
							title: "类型"
						}, {
							type: "inputWithUnit",
							text: res.initProductFacility[i].AREA,
							title: "面积",
							unit: "平方米"
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
						title: "设施名称"
					}, {
						type: "inputWithUnit",
						text: "",
						title: "数量",
						unit: "个"
					}, {
						type: "input",
						text: "",
						title: "贮存能力"
					}, {
						type: "select",
						text: "",
						title: "单位"
					}, {
						type: "input",
						text: "",
						title: "类型"
					}, {
						type: "inputWithUnit",
						text: "",
						title: "面积",
						unit: "平方米"
					}]
				}]
			}
			this.levelOneData = []
			for (let i in res.initOverviewList) {
				let item = {}
				item.value = res.initOverviewList[i].D_NAME
				item.label = res.initOverviewList[i].D_NAME
				item.category = res.initOverviewList[i].BIG_CATEGORY_ID
				this.levelOneData.push(item)
			}
			if (res.initProductCc.length > 0) {
				this.title2fromList = []
				for (let i in res.initProductCc) {
					let item = {
						index: i + 1,
						itemList: [{
							type: "selectLevelText",
							text1: res.initProductCc[i].D_NAME,
							title1: "名称",
							text2: res.initProductCc[i].BIG_CATEGORY_ID,
							title2: "类别"
						}, {
							type: "select",
							text: res.initProductCc[i].STORE_PLAN_UNIT,
							title: "单位",
						}, {
							type: "input",
							text: res.initProductCc[i].STORE_PLAN,
							title: "拟贮存量",
						}, {
							type: "input",
							text: res.initProductCc[i].STORE_LAST,
							title: "上年度贮存量",
						}, {
							type: "input",
							text: res.initProductCc[i].STORE_LASTSUM,
							title: "截止上年度年底累计贮存量",
						}, {
							type: "input",
							text: res.initProductCc[i].STORE_REASON,
							title: "贮存原因"
						}]
					}
					this.title2fromList.push(item)
				}
			} else {
				this.title2fromList = [{
					index: 1,
					itemList: [{
						type: "selectLevelText",
						text1: "",
						title1: "名称",
						text2: "",
						title2: "类别"
					}, {
						type: "select",
						text: "",
						title: "单位",
					}, {
						type: "input",
						text: "",
						title: "拟贮存量",
					}, {
						type: "input",
						text: "",
						title: "上年度贮存量",
					}, {
						type: "input",
						text: "",
						title: "截止上年度年底累计贮存量",
					}, {
						type: "input",
						text: "",
						title: "贮存原因"
					}]
				}]
			}
			this.title3.text = res.initTransfer.CC_PROCESS

			if (res.initProductYs.length > 0) {
				this.transferFromList = []
				for (let i in res.initProductYs) {
					let item = {
						index: i + 1,
						switchValue1: res.initProductYs[i].YS_1 ? res.initProductYs[i].YS_1 + "" : "0",
						switchValue2: res.initProductYs[i].YS_2 ? res.initProductYs[i].YS_2 + "" : "0",
						switchValue3: res.initProductYs[i].YS_3 ? res.initProductYs[i].YS_3 + "" : "0",
						compName: res.initProductYs[i].EN_NAME_YS,
						compVal: res.initProductYs[i].YS_ZZ,
						textarea: res.initProductYs[i].YS_PROCESS
					}
					this.transferFromList.push(item)
				}
				// this.switchInfo2[0].value = res.initProductYs[0].YS_1 ? res.initProductYs[0].YS_1 + "" : "0"
				// this.switchInfo2[1].value = res.initProductYs[0].YS_2 ? res.initProductYs[0].YS_2 + "" : "0"
				// this.switchInfo2[2].value = res.initProductYs[0].YS_3 ? res.initProductYs[0].YS_3 + "" : "0"
				// this.compInfo.compName = res.initProductYs[0].EN_NAME_YS
				// this.compInfo.compVal = res.initProductYs[0].YS_ZZ
				// this.title4.text = res.initProductYs[0].YS_PROCESS
				
			}else{
				this.transferFromList = [{
					index: "1",
					switchValue1: "0",
					switchValue2: "0",
					switchValue3: "0",
					compName: "",
					compVal: "",
					textarea: ""
				}]
			}

		})

	},
	methods: {
		doSubmit () {
			let submitData = {}
			submitData.TP_ID = this.queryJson.TP_ID
			for (let key in this.queryJson) {
				submitData[key] = this.queryJson[key]
			}
			submitData.CC_1 = this.switchInfo1[0].value + ""
			submitData.CC_2 = this.switchInfo1[1].value + ""
			submitData.CC_3 = this.switchInfo1[2].value + ""
			submitData.CC_4 = this.switchInfo1[3].value + ""
			submitData.CC_5 = this.switchInfo1[4].value + ""
			submitData.CC_PROCESS = this.title3.text

			submitData.TRANSFER_YS = []
			for(let i in this.transferFromList){
				let transItem = {}
				transItem.YS_1 = this.transferFromList[i].switchValue1 + ""
				transItem.YS_2 = this.transferFromList[i].switchValue2 + ""
				transItem.YS_3 = this.transferFromList[i].switchValue3 + ""
				transItem.EN_NAME_YS = this.transferFromList[i].compName
				transItem.YS_ZZ = this.transferFromList[i].compVal
				transItem.YS_PROCESS = this.transferFromList[i].textarea
				submitData.TRANSFER_YS.push(transItem)
			}
			
			submitData.TRANSFER_FACILITY = []
			for (let i in this.title1fromList) {
				let item = {}
				item.NAME = this.title1fromList[i].itemList[0].text
				item.NUM = this.title1fromList[i].itemList[1].text
				item.NUM_UNIT = "个"
				item.STORE = this.title1fromList[i].itemList[2].text
				item.UNIT = this.title1fromList[i].itemList[3].text
				item.TYPE = this.title1fromList[i].itemList[4].text
				item.AREA = this.title1fromList[i].itemList[5].text
				item.AREA_UNIT = "平方米"


				submitData.TRANSFER_FACILITY.push(item)
			}

			submitData.TRANSFER_CC = []
			for (let i in this.title2fromList) {
				let item = {}
				item.D_NAME = this.title2fromList[i].itemList[0].text1
				item.BIG_CATEGORY_ID = this.title2fromList[i].itemList[0].text2
				item.STORE_PLAN_UNIT = this.title2fromList[i].itemList[1].text
				item.STORE_LAST_UNIT = this.title2fromList[i].itemList[1].text
				item.STORE_LASTSUM_UNIT = this.title2fromList[i].itemList[1].text
				item.STORE_PLAN = this.title2fromList[i].itemList[2].text
				item.STORE_LAST = this.title2fromList[i].itemList[3].text
				item.STORE_LASTSUM = this.title2fromList[i].itemList[4].text
				item.STORE_REASON = this.title2fromList[i].itemList[5].text

				submitData.TRANSFER_CC.push(item)
			}

			for (let i in submitData.TRANSFER_FACILITY) {
				for (let key in submitData.TRANSFER_FACILITY[i]) {
					if (submitData.TRANSFER_FACILITY[i][key] === "") {
						this.$notify.error({
							title: '警告',
							message: "请填全[危险废物贮存设施现状]所有内容"
						});
						return
					}
				}
			}
			for (let i in submitData.TRANSFER_CC) {
				for (let key in submitData.TRANSFER_CC[i]) {
					if (submitData.TRANSFER_CC[i][key] === "") {
						this.$notify.error({
							title: '警告',
							message: "请填全[贮存危险废物情况]所有内容"
						});
						return
					}
				}
			}
			// let checkFlag = false
			// this.$refs['form'].validate((valid) => {
			// 	if (valid) {
			// 		checkFlag = true
			// 	} else {
			// 		checkFlag = false
			// 	}
			// });
			// if (!checkFlag) {
			// 	return
			// }

			for(let i in submitData.TRANSFER_YS){
				if(submitData.TRANSFER_YS[i].EN_NAME_YS === '' || submitData.TRANSFER_YS[i].YS_ZZ === '' || submitData.TRANSFER_YS[i].YS_PROCESS === ''){
					this.$notify.error({
						title: '警告',
						message: "请填全[运输措施]所有内容"
					});
					return
				}
			}
			if (submitData.CC_PROCESS === '') {
				this.$notify.error({
					title: '警告',
					message: "请填写贮存过程中采取的污染防治和事故预防措施"
				});
				return
			}
			// if (this.title4.text === '') {
			// 	this.$notify.error({
			// 		title: '警告',
			// 		message: "请填写运输过程中采取的污染防治措施"
			// 	});
			// 	return
			// }

			const loading = this.$loading({
				lock: true,
				text: 'Loading',
				spinner: 'el-icon-loading',
				background: 'rgba(0, 0, 0, 0.3)'
			});
			fetch({
				url: '/plan/saveTransfer',
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
		resetInfo1 () {
			this.title1fromList = [{
				index: 1,
				itemList: [{
					type: "input",
					text: "",
					title: "设施名称"
				}, {
					type: "inputWithUnit",
					text: "",
					title: "数量",
					unit: "个"
				}, {
					type: "input",
					text: "",
					title: "贮存能力"
				}, {
					type: "select",
					text: "",
					title: "单位"
				}, {
					type: "input",
					text: "",
					title: "类型"
				}, {
					type: "inputWithUnit",
					text: "",
					title: "面积",
					unit: "平方米"
				}]
			}]
		},
		resetInfo2 () {
			this.title2fromList = [{
				index: 1,
				itemList: [{
					type: "selectLevelText",
					text1: "",
					title1: "名称",
					text2: "",
					title2: "类别"
				}, {
					type: "select",
					text: "",
					title: "单位",
				}, {
					type: "input",
					text: "",
					title: "拟贮存量",
				}, {
					type: "input",
					text: "",
					title: "上年度贮存量",
				}, {
					type: "input",
					text: "",
					title: "截止上年度年底累计贮存量",
				}, {
					type: "input",
					text: "",
					title: "贮存原因"
				}]
			}]
		},
		resetInfo3 () {
			this.transferFromList = [{
				index: "1",
				switchValue1: "0",
				switchValue2: "0",
				switchValue3: "0",
				compName: "",
				compVal: "",
				textarea: ""
			}]
		}
	}
}
</script>
<style scoped>
#transferStuation {
  display: -webkit-flex; /* Safari */
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  /*align-items:center;*/
  align-content: center;
  overflow-y: hidden;
}
#transFerStiationArea {
  flex: 1;
  width: 100%;
  padding: 40px 5%;
  height: 100%;
  box-sizing: border-box;
  overflow-y: scroll;
}
.transferStuationFrom {
  width: 100%;
  float: left;
}
.footerSign {
  width: 100%;
  height: 50px;
  float: left;
}
</style>