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
			<assSwitch :userRole="userRole" title="运输措施" :switchInfo="switchInfo2"></assSwitch>
			<el-form ref="form" :model="compInfo" label-width="80px" class="transferStuationFrom">
				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item label="单位名称">
							<el-input v-if="userRole=== 'CSEP'" v-model="compInfo.compName" placeholder="必填"></el-input>
							<el-row v-else>{{compInfo.compName}}</el-row>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="运输资质">
							<el-input v-if="userRole=== 'CSEP'" v-model="compInfo.compVal" placeholder="必填"></el-input>
							<el-row v-else>{{compInfo.compVal}}</el-row>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
			<assTitle :userRole="userRole" :titleInfo="title4" titleType="textarea"></assTitle>
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
					"转移计划：危险废物数量、种类；拟接收危险废物的经营单位的资质和经营范围等。"
				]
			},
			userRole: 'CSEP',
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
				subTitle: "运输过程中采取的污染防治措施（如自行运输危险废物的，还应包括工具种类、载重量、使用年限等）",
				placeholder: "必填",
				text: ""
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
			switchInfo2: [{
				id: "1",
				name: "运输过程中是否遵守危险货物运输管理的规定",
				value: ""
			}, {
				id: "2",
				name: "是否按危险废物特性分类运输",
				value: ""
			}, {
				id: "3",
				name: "是否委托运输",
				value: ""
			}],
			compInfo: {
				compName: "",
				compVal: ""
			},
			levelOneData: []
		}
	},
	components: {
		'my-aside': Aside,
		'assTitle': assTitle,
		'assForm': assForm,
		'assSwitch': assSwitch
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
							type: "select",
							text: res.initProductFacility[i].UNIT,
							title: "单位"
						}, {
							type: "input",
							text: res.initProductFacility[i].NUM,
							title: "数量"
						}, {
							type: "input",
							text: res.initProductFacility[i].TYPE,
							title: "类型"
						}, {
							type: "inputWithUnit",
							text: res.initProductFacility[i].AREA,
							title: "面积",
							unit: "平方米"
						}, {
							type: "input",
							text: res.initProductFacility[i].STORE,
							title: "贮存能力"
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
				this.switchInfo2[0].value = res.initProductYs[0].YS_1 ? res.initProductYs[0].YS_1 + "" : "0"
				this.switchInfo2[1].value = res.initProductYs[0].YS_2 ? res.initProductYs[0].YS_2 + "" : "0"
				this.switchInfo2[2].value = res.initProductYs[0].YS_3 ? res.initProductYs[0].YS_3 + "" : "0"
				this.compInfo.compName = res.initProductYs[0].EN_NAME_YS
				this.compInfo.compVal = res.initProductYs[0].YS_ZZ
				this.title4.text = res.initProductYs[0].YS_PROCESS
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
			let transItem = {}
			transItem.YS_1 = this.switchInfo2[0].value
			transItem.YS_2 = this.switchInfo2[1].value
			transItem.YS_3 = this.switchInfo2[2].value
			transItem.EN_NAME_YS = this.compInfo.compName
			transItem.YS_ZZ = this.compInfo.compVal
			transItem.YS_PROCESS = this.title4.text
			submitData.TRANSFER_YS.push(transItem)

			submitData.TRANSFER_FACILITY = []
			for (let i in this.title1fromList) {
				let item = {}
				item.NAME = this.title1fromList[i].itemList[0].text
				item.UNIT = this.title1fromList[i].itemList[1].text
				item.NUM = this.title1fromList[i].itemList[2].text
				item.TYPE = this.title1fromList[i].itemList[3].text
				item.AREA = this.title1fromList[i].itemList[4].text
				item.AREA_UNIT = "平方米"
				item.STORE = this.title1fromList[i].itemList[5].text

				submitData.TRANSFER_FACILITY.push(item)
			}

			submitData.TRANSFER_CC = []
			for (let i in this.title1fromList) {
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