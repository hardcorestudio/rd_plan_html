<template>
	<div id='decrementPlan'>
		<my-aside :userRole="userRole" class="my-aside" :titleInfo="myTitleInfo" @doSubmit="doSubmit"></my-aside>
		<div id="decrementPlanContent">
			<assTitle :userRole="userRole" :titleInfo="title1" titleType="textarea"></assTitle>
			<assTitle :userRole="userRole" :titleInfo="title2" titleType="textarea"></assTitle>
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
		name:'decrementPlan',
		data(){
			return {
				myTitleInfo: {
					title: "危废减量化计划和措施",
					textInfoList: []
				},
				userRole: 'CSEP',
				queryJson: {},
				EP_ID: "",
				decrementInfo: {},
				title1: {
					title: "减少危险废物危害性的计划",
					placeholder: "必填",
					text: ""
				},
				title2: {
					title: "减少危险废物生产量和危害性的措施",
					placeholder: "可以包括以下几个方面：改进设计、采用先进的工艺技术和设备、使用清洁的能源和原料、改善管理、危险废物综合利用、提高污染防治水平等。",
					text: ""
				}
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
			this.queryJson = getQueryString()

			// fetch({
			// 	url: '',
			// 	method: 'POST',
			// 	data: 'params='+JSON.stringify(this.queryJson)
			// }).then(res => {
				let res = {
					"sepaName":"津南区",
					"WJWT":"czlEcjhPMjRXelI5LzQrVE5JS1hiV2dWUlExSHIvanVGWUdybTh0N0ZFOD0=",
					"operatorId":"",
					"status":"",
					"ROLEID":"CSEP",
					"empId":"",
					"ifLogin":"0",
					"epName":"天津合佳威立雅环境服务有限公司",
					"epId":"EP201410280910450012",
					"userType":"CSEP",
					"newGuideFlag":"",
					"belongQ":"",
					"belongSepa":"JNQ",
					"userPortrait":"",
					"belongS":"",
					"nickName":"天津合佳威立雅环境服务有限公司",
					"orgCode":"",
					"IWBSESSION":"BROWSER-20180915141153",
					"userId":"EP201410280910450012",
					"userName":"",
					"initReduction":{
							"MEASURES_REDUCTION":"aaadfsafdasfafda1111111",
							"PLAN_REDUCTION":"fdasfdasfdas",
							"sysdate":1537036831470,
							"TP_ID":"TP201809120707190010",
							"STATUS":"00"
					},
					"contextPath":"",
					"realName":"",
					"orgSeq":""
				}	
				this.decrementInfo = res.initReduction
				this.title2.text = this.decrementInfo.MEASURES_REDUCTION
				this.title1.text = this.decrementInfo.PLAN_REDUCTION
				this.EP_ID = res.epId
			// })
			

		},
		methods: {
			doSubmit() {
				let submitData = {}
				submitData.EP_ID = this.EP_ID
				submitData.TP_ID = this.decrementInfo.TP_ID
				submitData.MEASURES_REDUCTION = this.title2.text
				submitData.PLAN_REDUCTION = this.title1.text
				for (let key in this.queryJson) {
					submitData[key] = this.queryJson[key]
				}
				// fetch({
				// 	url: '',
				// 	method: 'POST',
				// 	data: 'params='+JSON.stringify(submitData)
				// }).then(res => {
				// 	this.$notify({
				// 		title: '成功',
				// 		message: '保存成功',
				// 		type: 'success'
				// 	});
				// })
			}
		}
	}
</script>
<style scoped>
#decrementPlan{
	display: -webkit-flex; /* Safari */
	display: flex;
	flex:1;
	flex-direction: row;
	justify-content:space-between;
	/*align-items:center;*/
	align-content:center;
	overflow-y: hidden;
}
#decrementPlanContent{
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