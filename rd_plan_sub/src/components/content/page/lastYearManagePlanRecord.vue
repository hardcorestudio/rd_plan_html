<template>
	<div id='lastYearManagePlanRecord'>
		<my-aside :userRole="userRole" class="my-aside" :titleInfo="myTitleInfo" @doSubmit="doSubmit"></my-aside>
		<div id="lastYearManagePlanRecordContent">
			<assTitle :userRole="userRole" :titleInfo="title1" titleType="textarea"></assTitle>
			<assTitle :userRole="userRole" :titleInfo="title2" titleType="textarea"></assTitle>
			<assTitle :userRole="userRole" :titleInfo="title3" titleType="single"></assTitle>
			<assSwitch :userRole="userRole" title="危险废物经营许可证制度" :switchInfo="switchInfo1"></assSwitch>
			<assSwitch :userRole="userRole" title="危险废物转移审批制度" :switchInfo="switchInfo2"></assSwitch>
			<assSwitch :userRole="userRole" title="危险废物识别标志制度" :switchInfo="switchInfo3"></assSwitch>
			<assSwitch :userRole="userRole" title="危险废物建立台账登记制度" :switchInfo="switchInfo4"></assSwitch>
			<assSwitch :userRole="userRole" title="建设项目固废污染防治设施环境影响评价及验收制度" :switchInfo="switchInfo5"></assSwitch>
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
	name: 'lastYearManagePlanRecord',
	data () {
		return {
			myTitleInfo: {
				title: "上年度管理计划回顾",
				textInfoList: [
					"上年度各级环保部门检查、环境监测、信息公开情况：如实记录各级环保部门对其检查情况，包括时间、存在的问题、下一步措施；环境监测是否都达标，原因分析；是否公开信息，公开内容等；",
					"危险废物比较分析：上年度危险废物实际产生数量、种类、贮存、利用处置等情况，并与上年度管理计划中预期结果进行比较分析；",
					"管理制度执行情况：对是否执行危险废物经营许可证制度、转移审批及联单制度、识别标志标签制度等进行勾选。"
				]
			},
			userRole: 'CSEP',
			title1: {
				title: "检查、监测和公开",
				subTitle: "上年度各级环保部门检查、环境监测、信息公开情况",
				placeholder: "包括检查时间、存在的问题、下一步措施；环境监测达标情况和原因分析；信息公开内容",
				text: ""
			},
			title2: {
				title: "危险废物比较分析",
				subTitle: "上年度实际产生的危险废物数量、种类、转移、贮存、利用处置情况，并与上年度管理计划对比分析",
				placeholder: "必填",
				text: ""
			},
			title3: {
				title: "管理制度执行情况",
			},
			switchInfo1: [{
				id: "1",
				name: "是否将危险废物委托给有资质的单位收集、贮存、利用、处置",
				value: ""
			}, {
				id: "2",
				name: "是否与有资质的单位签订危险废物利用处置合同/协议",
				value: ""
			}, {
				id: "3",
				name: "是否对危险废物许可证进行审查确认",
				value: ""
			}],
			switchInfo2: [{
				id: "1",
				name: "转移危险废物是否经过环保部门批准",
				value: ""
			}],
			switchInfo3: [{
				id: "1",
				name: "危险废物收集、贮存、处置设施场所是否设置危险废物识别标志",
				value: ""
			}, {
				id: "2",
				name: "危险废物的容器和包装物是否设置危险废物标签",
				value: ""
			}],
			switchInfo4: [{
				id: "1",
				name: "是否按照国家规定建立危险废物台账",
				value: ""
			}],
			switchInfo5: [{
				id: "1",
				name: "危险废物收集、贮存、处置等污染防治设施是否通过环评审批",
				value: ""
			}, {
				id: "2",
				name: "上述危险废物相关污染防治设施是否与主体工程同时通过环保验收",
				value: ""
			}]
		}
	},
	components: {
		'my-aside': Aside,
		'assTitle': assTitle,
		'assForm': assForm,
		'assSwitch': assSwitch
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
			url: '/plan/initHandle',
			method: 'POST',
			data: 'params=' + JSON.stringify(this.queryJson)
		}).then(res => {
			// let res = {
			// 	"sepaName": "津南区",
			// 	"WJWT": "czlEcjhPMjRXelI5LzQrVE5JS1hiZjJyRkliYW50UFYrS0lPaXd3aFBsbz0=",
			// 	"operatorId": "",
			// 	"status": "",
			// 	"ROLEID": "CSEP",
			// 	"empId": "",
			// 	"ifLogin": "0",
			// 	"epName": "天津合佳威立雅环境服务有限公司",
			// 	"epId": "EP201410280910450012",
			// 	"initLastInfo": {
			// 		"LI_2": "测试2",
			// 		"TP_ID": "TP201810020531260014",
			// 		"STATUS": "00",
			// 		"C_8": 0,
			// 		"C_9": 0,
			// 		"C_4": 0,
			// 		"C_5": 1,
			// 		"sysdate": 1538517544507,
			// 		"C_6": 0,
			// 		"C_7": 1,
			// 		"C_1": 1,
			// 		"C_2": 0,
			// 		"C_3": 1,
			// 		"LI_1": "测试1"
			// 	},
			// 	"userType": "CSEP",
			// 	"newGuideFlag": "",
			// 	"belongQ": "",
			// 	"belongSepa": "JNQ",
			// 	"userPortrait": "",
			// 	"belongS": "",
			// 	"nickName": "天津合佳威立雅环境服务有限公司",
			// 	"orgCode": "",
			// 	"IWBSESSION": "BROWSER-20181002101520",
			// 	"userId": "EP201410280910450012",
			// 	"userName": "",
			// 	"contextPath": "",
			// 	"realName": "",
			// 	"orgSeq": ""
			// }
			if (res.initLastInfo && res.initLastInfo !== '') {
				this.title1.text = res.initLastInfo.LI_1
				this.title2.text = res.initLastInfo.LI_2

				this.switchInfo1[0].value = res.initLastInfo.C_1 ? res.initLastInfo.C_1 + "" : '0'
				this.switchInfo1[1].value = res.initLastInfo.C_2 ? res.initLastInfo.C_2 + "" : '0'
				this.switchInfo1[2].value = res.initLastInfo.C_3 ? res.initLastInfo.C_3 + "" : '0'

				this.switchInfo2[0].value = res.initLastInfo.C_4 ? res.initLastInfo.C_4 + "" : '0'

				this.switchInfo3[0].value = res.initLastInfo.C_5 ? res.initLastInfo.C_5 + "" : '0'
				this.switchInfo3[1].value = res.initLastInfo.C_6 ? res.initLastInfo.C_6 + "" : '0'

				this.switchInfo4[0].value = res.initLastInfo.C_7 ? res.initLastInfo.C_7 + "" : '0'

				this.switchInfo5[0].value = res.initLastInfo.C_8 ? res.initLastInfo.C_8 + "" : '0'
				this.switchInfo5[1].value = res.initLastInfo.C_9 ? res.initLastInfo.C_9 + "" : '0'
			}

		})

	},
	methods: {
		doSubmit () {
			if (this.title1.text === '') {
				this.$notify.error({
					title: '警告',
					message: "请填写上年度各级环保部门检查、环境监测、信息公开情况"
				});
				return
			}
			if (this.title2.text === '') {
				this.$notify.error({
					title: '警告',
					message: "请填写危险废物比较分析"
				});
				return
			}

			const loading = this.$loading({
				lock: true,
				text: 'Loading',
				spinner: 'el-icon-loading',
				background: 'rgba(0, 0, 0, 0.3)'
			});
			let submitData = {}
			submitData.TP_ID = this.queryJson.TP_ID

			submitData.LI_1 = this.title1.text
			submitData.LI_2 = this.title2.text

			submitData.C_1 = this.switchInfo1[0].value + ""
			submitData.C_2 = this.switchInfo1[1].value + ""
			submitData.C_3 = this.switchInfo1[2].value + ""
			submitData.C_4 = this.switchInfo2[0].value + ""
			submitData.C_5 = this.switchInfo3[0].value + ""
			submitData.C_6 = this.switchInfo3[1].value + ""
			submitData.C_7 = this.switchInfo4[0].value + ""
			submitData.C_8 = this.switchInfo5[0].value + ""
			submitData.C_9 = this.switchInfo5[1].value + ""

			for (let key in this.queryJson) {
				submitData[key] = this.queryJson[key]
			}
			fetch({
				url: '',
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
		}
	}
}
</script>
<style scoped>
#lastYearManagePlanRecord {
  display: -webkit-flex; /* Safari */
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  /*align-items:center;*/
  align-content: center;
  overflow-y: hidden;
}
#lastYearManagePlanRecordContent {
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