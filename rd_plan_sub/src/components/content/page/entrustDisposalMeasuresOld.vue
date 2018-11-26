<template>
	<div id='entrustDisposalMeasures'>
		<my-aside :userRole="userRole" class="my-aside" :titleInfo="myTitleInfo" @doSubmit="doSubmit"></my-aside>
		<div id="entrustDisposalMeasuresPlan">
			<assTitle :userRole="userRole" :titleInfo="title1" titleType="reset" :formStatus="formStatus === 'card' ? '0' : '1'" @doReset="doReset" :numTitle="numTitle" @formStatusChange="formStatusChange"></assTitle>
			<assFormCascade v-if="formStatus === 'card'" :formList="title1fromList" :type="userRole !== 'CSEP' ? 'label' : ''" :levelOneData="cateList" :levelTwoData="cateList2" :cateList="cateList3"></assFormCascade>
			<assTable v-else-if="formStatus === 'table'" :tableList="formDataList" :tableTitleList="formDataListTitle"></assTable>
			<div class="footerSign"></div>
		</div>
	</div>
</template>
<script>
import Aside from '../Aside.vue';
import assTitle from '../../common/assTitle.vue'
import assTable from '../../common/assTable.vue'
import assFormCascade from '../../common/assFormCascade.vue'
import { checkBrowser, getQueryString } from '../../utils/browserCheck.js'
import fetch from '../../utils/fetch.js'
export default {
	name: 'entrustDisposalMeasures',
	data () {
		return {
			myTitleInfo: {
				title: "危废委托利用/处置措施", //表七
				textInfoList: [
					'凡计划期限上一年已委托或计划期限内拟委托外单位利用处置危险废物(包括自行利用处置过程中产生的废渣)的，需填写表7。委托利用的，在表头的利用下划√;委托处置的，在表头的处置下划√。同时将相应利用处置单位的危险废物经营许可证复印件作为本管理计划表的附件一并装订成册;',
					'利用处置单位名称、许可证编号:与利用处置单位危险废物经营许可证上的名称、许可证编号一致;',
					'利用处置废物名称:与表3中相应的废物名称一致;',
					'利用处置方式:外单位利用处置该种废物的方式，包括“焚烧”“填埋”“综合利用”等;',
					'本年度计划委托利用处置量:计划期限内委托利用处置危险废物的数量;',
					'上年度委托利用处置量:计划期限上一年委托利用处置该种',
					'危险废物的数量，如为计划期限内新更换的委托利用处置单位，即上一年未委托该单位利用处置废物时，则相应委托利用处置量填写“0”。'
				]
			},
			userRole: '',
			title1: {
				title: " "
			},
			numTitle: [],
			title1fromList: [{
				index: 1,
				itemList: [{
					type: "selectLevelText",
					text1: "",
					title1: "委托利用处置单位名称",
					text2: "",
					title2: "许可证编号",
					isSingle: true
				}, {
					type: "selectLevelTwoText",
					title1: "废物名称",
					text1: "",
					title2: "废物类别",
					text2: "",
					title3: "废物代码",
					text3: "",
					isSingle: true,
					unit: "1"
				}, {
					type: "selectDIY",
					text: "",
					title: "利用处置方式"
				}, 
				// {
				// 	type: "select",
				// 	text: "",
				// 	title: "单位"
				// }, 
				{
					type: "inputWithUnitSelect",
					text: "",
					title: "本年度计划委托利用处置量",
					isSingle: true,
					unit: ""
				}, {
					type: "inputWithUnitSelect",
					text: "",
					title: "上年度实际委托利用处置量",
					isSingle: true,
					unit: ""
				}]
			}],
			formDataListTitle: [{
				title: '委托利用处置单位名称',
				key: 'EN_NAME_CZ'
			},{
				title: '许可证编号',
				key: 'LICENSE_NO'
			},{
				title: '废物名称',
				key: 'D_NAME'
			},{
				title: '废物类别',
				key: 'BIG_CATEGORY_ID'
			},{
				title: '废物代码',
				key: 'SAMLL_CATEGORY_ID'
			},{
				title: '利用处置方式',
				key: 'HANDLE_TYPE'
			},{
				title: '本年度计划委托利用处置量',
				key: 'YEAR_NUM'
			},{
				title: '上年度实际委托利用处置量',
				key: 'LAST_NUM'
			},{
				title: '单位',
				key: 'UNIT'
			},],
			formDataList: [],
			cateList: [],
			cateList2: [],
			cateList3: [],
			formStatus: 'card'
		}
	},
	components: {
		'my-aside': Aside,
		'assTitle': assTitle,
		'assFormCascade': assFormCascade,
		'assTable': assTable
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

		this.formStatus = "card"

		// fetch({
		// 	url: '/plan/initHandle',
		// 	method: 'POST',
		// 	data: 'params=' + JSON.stringify(this.queryJson)
		// }).then(res => {
		let res = {
			"WJWT": "czlEcjhPMjRXelI5LzQrVE5JS1hiY0lYVit5TXR5YnVlT1VSdytZeEN3WT0=",
			"sumHandleList": [{
				"last_num_sum": "33.00吨",
				"year_num_sum": "22.00吨"
			}, {
				"last_num_sum": "22.00个",
				"year_num_sum": "11.00个"
			}],
			"operatorId": "",
			"empId": "",
			"initEpCzList": [{
				"EN_NAME_CZ": "中海油能源发展股份有限公司安全环保分公司碧海环保服务公司",
				"LICENSE_NO": "TJHW011",
				"EN_ID_CZ": "EP201410280908450011"
			}, {
				"EN_NAME_CZ": "天津合佳威立雅环境服务有限公司",
				"LICENSE_NO": "TJHW004",
				"EN_ID_CZ": "EP201410280910450012"
			}, {
				"EN_NAME_CZ": "天津昱隆泰再生资源环保处理有限公司",
				"LICENSE_NO": "TJHW003",
				"EN_ID_CZ": "EP201410280946090018"
			}, {
				"EN_NAME_CZ": "天津东邦铅资源再生有限公司",
				"LICENSE_NO": "TJHW017",
				"EN_ID_CZ": "EP201410281131110030"
			}, {
				"EN_NAME_CZ": "天津市海丰化工有限公司",
				"LICENSE_NO": "TJHW014",
				"EN_ID_CZ": "EP201410281233290032"
			}, {
				"EN_NAME_CZ": "天津江源环保科技有限公司",
				"LICENSE_NO": "TJHW006",
				"EN_ID_CZ": "EP201410281429170043"
			}, {
				"EN_NAME_CZ": "天津市环通金属制品有限公司",
				"LICENSE_NO": "TJHW002",
				"EN_ID_CZ": "EP201410281648190057"
			}, {
				"EN_NAME_CZ": "泰鼎(天津）环保科技有限公司",
				"LICENSE_NO": "TJHW021",
				"EN_ID_CZ": "EP201410291352330074"
			}, {
				"EN_NAME_CZ": "天津仁新玻璃材料有限公司",
				"LICENSE_NO": "TJHW020",
				"EN_ID_CZ": "EP201410291732000084"
			}, {
				"EN_NAME_CZ": "天津滨海合佳威立雅环境服务有限公司",
				"LICENSE_NO": "TJHW010",
				"EN_ID_CZ": "EP201411031103580169"
			}, {
				"EN_NAME_CZ": "天津友信材料科技有限公司",
				"LICENSE_NO": "TJHW012",
				"EN_ID_CZ": "EP201501071338330387"
			}, {
				"EN_NAME_CZ": "天津市益康环保服务公司",
				"LICENSE_NO": "TJHW009",
				"EN_ID_CZ": "EP201504091955520499"
			}, {
				"EN_NAME_CZ": "天津瀚洋汇和环保科技有限公司",
				"LICENSE_NO": "TJHW005",
				"EN_ID_CZ": "EP201505291554270613"
			}, {
				"EN_NAME_CZ": "天津市雅环再生资源回收利用有限公司",
				"LICENSE_NO": "TJHW013",
				"EN_ID_CZ": "EP201508141009471304"
			}, {
				"EN_NAME_CZ": "中能（天津）环保再生资源利用有限公司",
				"LICENSE_NO": "TJHW015",
				"EN_ID_CZ": "EP201512021411072294"
			}, {
				"EN_NAME_CZ": "天津华庆百胜能源有限公司（试点）",
				"LICENSE_NO": "TJHW016",
				"EN_ID_CZ": "EP201602251339212631"
			}, {
				"EN_NAME_CZ": "天津市腾源环保科技有限公司",
				"LICENSE_NO": "TJHW018",
				"EN_ID_CZ": "EP201606031641393014"
			}, {
				"EN_NAME_CZ": "天津壹鸣环境污染治理有限公司",
				"LICENSE_NO": "TJHW008",
				"EN_ID_CZ": "EP201607110955513122"
			}, {
				"EN_NAME_CZ": "德鸿泰（天津）环保科技有限公司",
				"LICENSE_NO": "TJHW019",
				"EN_ID_CZ": "EP201611221430103497"
			}, {
				"EN_NAME_CZ": "天津莱奥西斯环保科技有限公司",
				"LICENSE_NO": "TJHW001",
				"EN_ID_CZ": "EP201707251144524521"
			}],
			"userType": "CSEP",
			"newGuideFlag": "",
			"belongQ": "",
			"belongS": "",
			"nickName": "天津合佳威立雅环境服务有限公司",
			"orgCode": "",
			"userId": "EP201410280910450012",
			"userName": "",
			"sepaName": "津南区",
			"status": "",
			"ifLogin": "0",
			"ROLEID": "CSEP",
			"epName": "天津合佳威立雅环境服务有限公司",
			"epId": "EP201410280910450012",
			"belongSepa": "JNQ",
			"userPortrait": "",
			"initOverviewList": [{
				"BIG_CATEGORY_NAME": "123",
				"UNIT": "吨",
				"W_NAME": "11",
				"SOURCE_PROCESS": "11",
				"SAMLL_CATEGORY_ID": "831-003-01",
				"TP_ID": "TP201810020531260014",
				"YEAR_NUM": "22",
				"BIG_CATEGORY_ID": "HW01",
				"W_SHAPE": "11",
				"LAST_NUM": "11",
				"SAMLL_CATEGORY_NAME": null,
				"ID": "1",
				"D_NAME": "11",
				"CHARACTER": "11"
			}, {
				"BIG_CATEGORY_NAME": null,
				"UNIT": "个",
				"W_NAME": "11",
				"SOURCE_PROCESS": "22",
				"SAMLL_CATEGORY_ID": "266-003-05",
				"TP_ID": "TP201810020531260014",
				"YEAR_NUM": "22",
				"BIG_CATEGORY_ID": "HW05",
				"W_SHAPE": "22",
				"LAST_NUM": "22",
				"SAMLL_CATEGORY_NAME": null,
				"ID": "2",
				"D_NAME": "22",
				"CHARACTER": "11"
			}],
			"initHandleList": [{
				"UNIT": "个",
				"EN_NAME_CZ": "中海油能源发展股份有限公司安全环保分公司（碧海环保）",
				"LAST_NUM": "33",
				"HANDLE_TYPE": "11",
				"LICENSE_NO": "111",
				"SAMLL_CATEGORY_ID": null,
				"ID": "1",
				"D_NAME": "22",
				"TP_ID": "TP201810020531260014",
				"EN_ID_CZ": "EP201410280908450011",
				"YEAR_NUM": "22",
				"BIG_CATEGORY_ID": null
			}, {
				"UNIT": "吨",
				"EN_NAME_CZ": "天津江源环保科技有限公司",
				"LAST_NUM": "22",
				"HANDLE_TYPE": "11",
				"LICENSE_NO": "11",
				"SAMLL_CATEGORY_ID": null,
				"ID": "2",
				"D_NAME": "11",
				"TP_ID": "TP201810020531260014",
				"EN_ID_CZ": "EP201410281429170043",
				"YEAR_NUM": "11",
				"BIG_CATEGORY_ID": null
			}],
			"IWBSESSION": "BROWSER-20181007062257",
			"HANDLE_TYPE_LIST": ["R1", "R2", "R3", "R4", "R5", "R7", "R8", "R9", "R10", "R11", "R12", "R13", "R14", "R15", "D1", "D9", "D10", "D16", "C1", "C2", "C3", "Y10", "Y11", "Y12", "Y13", "Y16", "G21", "G22", "G23", "G24", "G29"],
			"realName": "",
			"contextPath": "",
			"orgSeq": ""
		}
		this.userRole = res.userType
		// let lastNum = ""
		// let yearNum = ""
		// for (let i in res.sumHandleList) {
		// 	if (i === 0) {
		// 		lastNum = res.sumHandleList[i].last_num_sum
		// 		yearNum = res.sumHandleList[i].year_num_sum
		// 	} else {
		// 		lastNum += ' ' + res.sumHandleList[i].last_num_sum
		// 		yearNum += ' ' + res.sumHandleList[i].year_num_sum
		// 	}
		// }
		// if (res.sumHandleList.length === 0) {
		// 	lastNum = "0"
		// 	yearNum = "0"
		// }
		// this.numTitle = "本年度计划委托利用处置量：" + yearNum + "   上年度实际委托利用处置量：" + lastNum
		// this.numTitle = res.sumHandleList
		this.cateList = []
		for (let i in res.initEpCzList) {
			let item = {}
			item.value = res.initEpCzList[i].EN_ID_CZ
			item.label = res.initEpCzList[i].EN_NAME_CZ
			item.category = res.initEpCzList[i].LICENSE_NO
			this.cateList.push(item)
		}
		this.cateList2 = []
		for (let i in res.initOverviewList) {
			let item = {}
			item.value = res.initOverviewList[i].D_NAME
			item.label = res.initOverviewList[i].D_NAME
			item.big_name = res.initOverviewList[i].BIG_CATEGORY_ID
			item.small_name = res.initOverviewList[i].SAMLL_CATEGORY_ID
			item.UNIT = res.initOverviewList[i].UNIT
			this.cateList2.push(item)
		}
		this.cateList3 = []
		for (let i in res.HANDLE_TYPE_LIST) {
			let item = {}
			item.value = res.HANDLE_TYPE_LIST[i]
			item.label = res.HANDLE_TYPE_LIST[i]
			this.cateList3.push(item)
		}

		this.formDataList = res.initHandleList
		if (res.initHandleList.length > 0) {
			this.title1fromList = []
			for (let i in res.initHandleList) {
				let item = {
					index: parseInt(i) + 1,
					itemList: [{
						type: "selectLevelText",
						text1: res.initHandleList[i].EN_ID_CZ,
						title1: "委托利用处置单位名称",
						text2: res.initHandleList[i].LICENSE_NO,
						title2: "许可证编号",
						isSingle: true
					}, {
						type: "selectLevelTwoText",
						title1: "废物名称",
						text1: res.initHandleList[i].D_NAME,
						title2: "废物类别",
						text2: res.initHandleList[i].BIG_CATEGORY_ID,
						title3: "废物代码",
						text3: res.initHandleList[i].SAMLL_CATEGORY_ID,
						isSingle: true,
						unit: "1"
					}, {
						type: "selectDIY",
						text: res.initHandleList[i].HANDLE_TYPE,
						title: "利用处置方式"
					},
					// {
					// 	type: "select",
					// 	text: res.initHandleList[i].UNIT,
					// 	title: "单位"
					// },
					{
						type: "inputWithUnitSelect",
						text: res.initHandleList[i].YEAR_NUM,
						title: "本年度计划委托利用处置量",
						isSingle: true,
						unit: res.initHandleList[i].UNIT
					}, {
						type: "inputWithUnitSelect",
						text: res.initHandleList[i].LAST_NUM,
						title: "上年度实际委托利用处置量",
						isSingle: true,
						unit: res.initHandleList[i].UNIT
					}]
				}
				this.title1fromList.push(item)
			}
		} else {
			this.title1fromList = [{
				index: 1,
				itemList: [{
					type: "selectLevelText",
					text1: '',
					title1: "委托利用处置单位名称",
					text2: '',
					title2: "许可证编号",
					isSingle: true
				}, {
					type: "selectLevelTwoText",
					title1: "废物名称",
					text1: "",
					title2: "废物类别",
					text2: "",
					title3: "废物代码",
					text3: "",
					isSingle: true,
					unit: "1"
				}, {
					type: "selectDIY",
					text: "",
					title: "利用处置方式"
				}, 
				// {
				// 	type: "select",
				// 	text: "",
				// 	title: "单位"
				// }, 
				{
					type: "inputWithUnitSelect",
					text: "",
					title: "本年度计划委托利用处置量",
					isSingle: true,
					unit: ""
				}, {
					type: "inputWithUnitSelect",
					text: "",
					title: "上年度实际委托利用处置量",
					isSingle: true,
					unit: ""
				}]
			}]
		}
		// })
	},
	methods: {
		doSubmit () {
			let checkFlag = true
			for (let i in this.title1fromList) {
				if (this.title1fromList[i].itemList[0].text1 === '' || this.title1fromList[i].itemList[1].text1 === '' || this.title1fromList[i].itemList[2].text === '' || this.title1fromList[i].itemList[3].text === '' || this.title1fromList[i].itemList[4].text === '') {
					checkFlag = false
					break
				}
			}
			if (!checkFlag) {
				this.$notify.error({
					title: '警告',
					message: "请填全卡片所有内容"
				});
				return
			}
			let submitData = {}
			submitData.TP_ID = this.queryJson.TP_ID

			submitData.LIST = []

			for (let i in this.title1fromList) {
				let item = {}
				item.EN_ID_CZ = this.title1fromList[i].itemList[0].text1
				item.LICENSE_NO = this.title1fromList[i].itemList[0].text2
				item.D_NAME = this.title1fromList[i].itemList[1].text1
				item.BIG_CATEGORY_ID = this.title1fromList[i].itemList[1].text2
				item.SMALL_CATEGORY_ID = this.title1fromList[i].itemList[1].text3
				item.HANDLE_TYPE = this.title1fromList[i].itemList[2].text
				item.UNIT = this.title1fromList[i].itemList[3].unit
				item.YEAR_NUM = this.title1fromList[i].itemList[3].text
				item.LAST_NUM = this.title1fromList[i].itemList[4].text

				submitData.LIST.push(item)
			}
			var trimArr = this.unique(submitData.LIST,"LICENSE_NO","D_NAME");
			var trimArrLength = 0;
			for(var key in trimArr){
				trimArrLength++
			}
			if(submitData.LIST.length > 1 && trimArrLength < submitData.LIST.length ) {
				this.$notify.error({
					title: '警告',
					message: "同一单位下废物名称不能重复"
				});
				return
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
				url: '/plan/saveHandle',
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
		doReset () {
			this.title1fromList = [{
				index: 1,
				itemList: [{
					type: "selectLevelText",
					text1: "",
					title1: "委托利用处置单位名称",
					text2: "",
					title2: "许可证编号",
					isSingle: true
				}, {
					type: "selectLevelTwoText",
					title1: "废物名称",
					text1: "",
					title2: "废物类别",
					text2: "",
					title3: "废物代码",
					text3: "",
					isSingle: true,
					unit: "1"
				}, {
					type: "selectDIY",
					text: "",
					title: "利用处置方式"
				}, 
				// {
				// 	type: "select",
				// 	text: "",
				// 	title: "单位"
				// }, 
				{
					type: "inputWithUnitSelect",
					text: "",
					title: "本年度计划委托利用处置量",
					isSingle: true,
					unit: ""
				}, {
					type: "inputWithUnitSelect",
					text: "",
					title: "上年度实际委托利用处置量",
					isSingle: true,
					unit: ""
				}]
			}]
		},
		formStatusChange(status){
			this.formStatus = status
		},
		unique(arr,mkey,nkey){
			var arrJson = {}
			for(var i in arr){
				arrJson[arr[i][mkey] + arr[i][nkey]] = arr[i][mkey] + arr[i][nkey]			
			}
			return arrJson;
		}
	},
	watch: {
		title1fromList: {
　　　　handler(newValue, oldValue) {
					this.numTitle = [];
					var itemGe = {
						"last_num_sum": 0,
						"year_num_sum": 0
					}
					var itemDun = {
						"last_num_sum": 0,
						"year_num_sum": 0
					}
					for(var i in newValue){
						var ysi = newValue[i].itemList[3].text == "" ? "0" : newValue[i].itemList[3].text
						if(newValue[i].itemList[3].unit === "个"){
							itemGe.year_num_sum = parseFloat((parseFloat(itemGe.year_num_sum) + parseFloat(ysi)).toFixed(6))
						}else if(newValue[i].itemList[3].unit === "吨"){
							itemDun.year_num_sum = parseFloat((parseFloat(itemDun.year_num_sum) + parseFloat(ysi)).toFixed(6))
						}
						var lsi = newValue[i].itemList[4].text == "" ? "0" : newValue[i].itemList[4].text
						if(newValue[i].itemList[4].unit === "个"){
							itemGe.last_num_sum = parseFloat((parseFloat(itemGe.last_num_sum) + parseFloat(lsi)).toFixed(6))
						}else if(newValue[i].itemList[4].unit === "吨"){
							itemDun.last_num_sum = parseFloat((parseFloat(itemDun.last_num_sum) + parseFloat(lsi)).toFixed(6))
						}
						if(i == newValue.length - 1){
							itemGe.last_num_sum = itemGe.last_num_sum != 0 ? itemGe.last_num_sum + "个" : itemGe.last_num_sum
							itemGe.year_num_sum = itemGe.year_num_sum != 0 ? itemGe.year_num_sum + "个" : itemGe.year_num_sum

							if(itemGe.last_num_sum != 0 || itemGe.year_num_sum != 0){
								this.numTitle.push(itemGe)
							}

							itemDun.last_num_sum = itemDun.last_num_sum != 0 ? itemDun.last_num_sum + "吨" : itemDun.last_num_sum
							itemDun.year_num_sum = itemDun.year_num_sum != 0 ? itemDun.year_num_sum + "吨" : itemDun.year_num_sum
							
							if(itemDun.last_num_sum != 0 || itemDun.year_num_sum != 0){
								this.numTitle.push(itemDun)
							}
						}
					}
　　　　},
　　　　deep: true
　　}
	}
}
</script>
<style scoped>
#entrustDisposalMeasures {
  display: -webkit-flex; /* Safari */
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  /*align-items:center;*/
  align-content: center;
  overflow-y: hidden;
}
#entrustDisposalMeasures > #MyAside {
  overflow-y: scroll;
}
#entrustDisposalMeasuresPlan {
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