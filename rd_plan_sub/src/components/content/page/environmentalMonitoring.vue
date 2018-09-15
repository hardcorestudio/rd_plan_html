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
	import { checkBrowser } from '../../utils/browserCheck.js'
	export default {
		name:'environmentalMonitoring',
		data(){
			return {
				myTitleInfo: {
					title: "环境监测情况",
					textInfoList: [
						"利用处置运行设施监测：利用处置设施如危险废物焚烧设施运行的工艺参数、焚烧残渣热灼减率、活性炭和燃料油等主要原辅材料消耗情况等；",
						"污染物监测指标及频次：废水、废气的特征污染物和主要污染物，噪声以及监测频率、时间安排等；",
						"自行监测情况：相应的环境监测仪器、设备，制定监测仪器的维护和标定方案，检测人员应当具备相应的资质；",
						"委托检测情况：与有检测资质（通过计量认证）的单位签订的委托监测合同，监测时间，监测项目等。"
					]
				},
				userRole: 'CSEP',
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
		components:{
			'my-aside':Aside,
			'assTitle':assTitle,
			'assForm':assForm
		},
		mounted () {
			checkBrowser(() => {
				// this.$message({
				// 	showClose: true,
				// 	message: '您当前使用的浏览器不支持本模块功能，建议使用Chrome浏览器',
				// 	type: 'warning'
				// });
				this.$router.push({path: '/pageIncompatible'})
			})
		},
		methods: {
			doSubmit() {
				console.log("保存save");
				console.log(this.title2.text);
			}
		}
	}
</script>
<style scoped>
#environmentalMonitoring{
	display: -webkit-flex; /* Safari */
	display: flex;
	flex:1;
	flex-direction: row;
	justify-content:space-between;
	/*align-items:center;*/
	align-content:center;
	overflow-y: hidden;
}
#environmentalMonitoringContent{
	flex:1;
	width: 100%;
	padding: 40px 5%;
	height: 100%;
	box-sizing: border-box;
	overflow-y: scroll;
}
.footerSign{
	width: 100%;
	height: 50px;
	float: left;
}
</style>