<template>
	<div id='environmentalMonitoring'>
		<my-aside :userRole="userRole" class="my-aside" :titleInfo="myTitleInfo" @doSubmit="doSubmit"></my-aside>
		<div id="environmentalMonitoringContent">
			<assTitle :userRole="userRole" :titleInfo="title1" titleType="single"></assTitle>
			<assTitle :userRole="userRole" :titleInfo="title2" titleType="textarea"></assTitle>
			<assTitle :userRole="userRole" :titleInfo="title3" titleType="textarea"></assTitle>
			<assTitle :userRole="userRole" :titleInfo="title4" titleType="textarea"></assTitle>
			<assTitle :userRole="userRole" :titleInfo="title5" titleType="textarea"></assTitle>
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
	name: 'environmentalMonitoring',
	data () {
		return {
			repaetClickTime: 2,
			repeatClickFlag: false,
			myTitleInfo: {
				title: "环境监测情况",
				textInfoList: [
					"利用处置运行设施监测：利用处置设施如危险废物焚烧设施运行的工艺参数、焚烧残渣热灼减率、活性炭和燃料油等主要原辅材料消耗情况等；",
					"污染物监测指标及频次：废水、废气的特征污染物和主要污染物，噪声以及监测频率、时间安排等；",
					"自行监测情况：相应的环境监测仪器、设备，制定监测仪器的维护和标定方案，检测人员应当具备相应的资质；",
					"委托检测情况：与有检测资质（通过计量认证）的单位签订的委托监测合同，监测时间，监测项目等。"
				]
			},
			userRole: '',
			title1: {
				title: "危险废物利用/处置设施运行过程相关参数的检测",
			},
			title2: {
				title: "",
				subTitle: "利用处置设施运行参数监测情况",
				placeholder: "必填",
				text: ""
			},
			title3: {
				title: "",
				subTitle: "污染物监测指标及频次",
				placeholder: "必填",
				text: ""
			},
			title4: {
				title: "",
				subTitle: "自行监测情况",
				placeholder: "必填",
				text: ""
			},
			title5: {
				title: "",
				subTitle: "委托监测情况",
				placeholder: "必填",
				text: ""
			},
		}
	},
	components: {
		'my-aside': Aside,
		'assTitle': assTitle,
		'assForm': assForm
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
		this.repeatClickFlag = false
		this.queryJson = getQueryString()

		fetch({
			url: '/plan/initEnv',
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
			// 	"userType": "CSEP",
			// 	"newGuideFlag": "",
			// 	"belongQ": "",
			// 	"belongSepa": "JNQ",
			// 	"userPortrait": "",
			// 	"initEnv": {
			// 		"ENV_2": "测试2",
			// 		"ENV_3": "测试3",
			// 		"sysdate": 1538517015030,
			// 		"ENV_4": "测试4",
			// 		"TP_ID": "TP201810020531260014",
			// 		"STATUS": "00",
			// 		"ENV_1": "测试1"
			// 	},
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
			this.userRole = res.userType
			if (res.initEnv && res.initEnv !== '') {
				this.title2.text = res.initEnv.ENV_1
				this.title3.text = res.initEnv.ENV_2
				this.title4.text = res.initEnv.ENV_3
				this.title5.text = res.initEnv.ENV_4
			}

		})

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

			if (this.title2.text === '') {
				this.$notify.error({
					title: '警告',
					message: "请填写利用处置设施运行参数监测情况"
				});
				return
			}
			if (this.title3.text === '') {
				this.$notify.error({
					title: '警告',
					message: "请填写污染物监测指标及频次"
				});
				return
			}
			if (this.title4.text === '') {
				this.$notify.error({
					title: '警告',
					message: "请填写自行监测情况"
				});
				return
			}
			if (this.title5.text === '') {
				this.$notify.error({
					title: '警告',
					message: "请填写委托监测情况"
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

			submitData.ENV_1 = this.title2.text
			submitData.ENV_2 = this.title3.text
			submitData.ENV_3 = this.title4.text
			submitData.ENV_4 = this.title5.text

			for (let key in this.queryJson) {
				submitData[key] = this.queryJson[key]
			}
			fetch({
				url: '/plan/saveEnv',
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
#environmentalMonitoring {
  display: -webkit-flex; /* Safari */
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  /*align-items:center;*/
  align-content: center;
  overflow-y: hidden;
}
#environmentalMonitoringContent {
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