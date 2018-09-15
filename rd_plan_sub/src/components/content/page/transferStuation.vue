<template>
	<div id='transferStuation'>
		<my-aside :userRole="userRole" class="my-aside" :titleInfo="myTitleInfo" @doSubmit="doSubmit"></my-aside>
		<div id="transFerStiationArea">
			<assSwitch :userRole="userRole" title="贮存措施" :switchInfo="switchInfo1"></assSwitch>
			<assTitle :userRole="userRole" :titleInfo="title1" titleType="reset" @doReset="resetInfo"></assTitle>
			<assForm :formList="title1fromList" :type="userRole === 'CSEP' ? '' : 'label'"></assForm>
			<assTitle :userRole="userRole" :titleInfo="title2" titleType="reset" @doReset="resetInfo"></assTitle>
			<assForm :formList="title2fromList" :type="userRole === 'CSEP' ? '' : 'label'"></assForm>
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
	import { checkBrowser } from '../../utils/browserCheck.js'
	export default {
		name:'transferStuation',
		data(){
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
					},{
						type: "select",
						text: "",
						title: "单位"
					},{
						type: "input",
						text: "",
						title: "数量"
					},{
						type: "input",
						text: "",
						title: "类型"
					},{
						type: "inputWithUnit",
						text: "",
						title: "面积",
						unit: "M"
					},{
						type: "input",
						text: "",
						title: "贮存能力"
					}]
				}],
				title2fromList: [{
					index: 1,
					itemList: [{
						type: "input",
						text: "",
						title: "名称"
					},{
						type: "input",
						text: "",
						title: "类别"
					},{
						type: "inputWithUnit",
						text: "",
						title: "拟贮存量",
						unit: "吨"
					},{
						type: "inputWithUnit",
						text: "",
						title: "上年度贮存量",
						unit: "吨"
					},{
						type: "inputWithUnit",
						text: "",
						title: "截止上年度年底累计贮存量",
						unit: "吨"
					},{
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
				}
			}
		},
		components:{
			'my-aside':Aside,
			'assTitle':assTitle,
			'assForm':assForm,
			'assSwitch':assSwitch
		},
		watch: {
			title2: function (n, o) {
				console.log(n);
				console.log(o);
			}, 
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
			},
			resetInfo() {
				console.log("重置");
			}
		}
	}
</script>
<style scoped>
#transferStuation{
	display: -webkit-flex; /* Safari */
	display: flex;
	flex:1;
	flex-direction: row;
	justify-content:space-between;
	/*align-items:center;*/
	align-content:center;
	overflow-y: hidden;
}
#transFerStiationArea{
	flex:1;
	width: 100%;
	padding: 40px 5%;
	height: 100%;
	box-sizing: border-box;
	overflow-y: scroll;
}
.transferStuationFrom{
	width: 100%;
	float: left;
}
.footerSign{
	width: 100%;
	height: 50px;
	float: left;
}
</style>