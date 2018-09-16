<template>
	<div id='selfDisposalMeasures'>
		<my-aside :userRole="userRole" class="my-aside" :titleInfo="myTitleInfo" @doSubmit="doSubmit"></my-aside>
		<div id="selfDisposalMeasuresArea">
			<el-form ref="form" :model="selfDisposalMeasuresData" label-width="80px">
				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item label="设施名称">
							<el-input v-if="userRole=== 'CSEP'" v-model="selfDisposalMeasuresData.coequipmentNamempAddr" placeholder="利用处置方式"></el-input>
							<el-row v-else>{{selfDisposalMeasuresData.equipmentName}}</el-row>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="设施类别">
							<el-input v-if="userRole=== 'CSEP'" v-model="selfDisposalMeasuresData.category" placeholder="利用处置方式"></el-input>
							<el-row v-else>{{selfDisposalMeasuresData.category}}</el-row>
						</el-form-item>
					</el-col>
				</el-row>
				<el-form-item label="设施地址">
					<el-input v-if="userRole=== 'CSEP'" v-model="selfDisposalMeasuresData.addr" placeholder="必填"></el-input>
					<el-row v-else>{{selfDisposalMeasuresData.addr}}</el-row>
				</el-form-item>
				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item label="总投资">
							<el-input v-if="userRole=== 'CSEP'" v-model="selfDisposalMeasuresData.amount" placeholder="必填"></el-input>
							<el-row v-else>{{selfDisposalMeasuresData.amount}}</el-row>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="设计能力">
							<el-input v-if="userRole=== 'CSEP'" v-model="selfDisposalMeasuresData.placeholder" placeholder="必填"></el-input>
							<el-row v-else>{{selfDisposalMeasuresData.placeholder}}</el-row>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item label="设计使用年限">
							<el-input v-if="userRole=== 'CSEP'" v-model="selfDisposalMeasuresData.years" placeholder="必填"></el-input>
							<el-row v-else>{{selfDisposalMeasuresData.years}}</el-row>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="投入运行时间">
							<el-input v-if="userRole=== 'CSEP'" v-model="selfDisposalMeasuresData.startDate" placeholder="必填"></el-input>
							<el-row v-else>{{selfDisposalMeasuresData.startDate}}</el-row>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item label="运行费用">
							<el-input v-if="userRole=== 'CSEP'" v-model="selfDisposalMeasuresData.price" placeholder="必填"></el-input>
							<el-row v-else>{{selfDisposalMeasuresData.price}}</el-row>
						</el-form-item>
					</el-col>
				</el-row>
				<el-form-item label="主要设备及数量">
					<el-input v-if="userRole=== 'CSEP'" v-model="selfDisposalMeasuresData.mainEquAndNum" placeholder="必填"></el-input>
					<el-row v-else>{{selfDisposalMeasuresData.mainEquAndNum}}</el-row>
				</el-form-item>
				<el-form-item label="危险废物利用处置效果">
					<el-input v-if="userRole=== 'CSEP'" v-model="selfDisposalMeasuresData.how" placeholder="必填"></el-input>
					<el-row v-else>{{selfDisposalMeasuresData.how}}</el-row>
				</el-form-item>
			</el-form>
			<assSwitch :userRole="userRole" :switchInfo="switchInfo"></assSwitch>
			<assTitle :userRole="userRole" :titleInfo="title1" titleType="reset" @doReset="doReset" numTitle="本年度计划利用处置量：0   上年度实际利用处置量：0"></assTitle>
			<assForm :formList="title1fromList" :type="userRole === 'CSEP' ? '' : 'label'"></assForm>
			<assTitle :userRole="userRole" :titleInfo="textareaInfo1" titleType="textarea"></assTitle>
			<assTitle :userRole="userRole" :titleInfo="textareaInfo2" titleType="textarea"></assTitle>
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
		name:'selfDisposalMeasures',
		data(){
			return {
				myTitleInfo: {
					title: "自行利用/处置措施",
					textInfoList: [
						'建有危险废物自行利用处置设施的均需填写本表，每座设施分别填写一份。设有自行利用设施的，在表头的利用下划√;设有处置设施的，在表头的处置下划√;',
						'自行利用危险废物产生相应副产品的，应将相应副产品的质量检验检测报告复印件作为本管理计划表的附件一并装订成册，该检测报告必须由质监部门认定的产品质量检测单位出具;',
						'设施名称:利用处置危险废物的设施名称，如“采油泥沙焚烧设施”“废溶剂回收设施”“废酸处理设施”“贵金属回收设 施”“包装容器处理设施”等;',
						'设施类别:该设施利用处置废物的方式，如“焚烧”“蒸馏”,“酸碱中和”“电解”等;',
						'总投资:该设施(包括配套设施)的投资总金额，计量单位 为“万元”;',
						'设计能力:该设施每年能够利用处置危险废物的最大数量，计量单位为“吨/年”;',
						'设计使用年限:该设施设计使用的年限; 投入运行时间:该设施正式投入运行的年份; 运行费用:该设施年度运行费用，计量单位为“元/年”; 主要设备及数量:该设施中所包括的主要设备名称及其数量;',
						'利用处置效果:自行利用处置废物后，危险废物数量、体积的减量化情况和有害物质、组分的减少情况，以及废物经利用后能否达到国家相应产品质量标准等情况，达到相应标准的应注明标准名称及标准编号;',
						'废物自行利用处置情况:采用该设施利用处置危险废物的名称(与表3中的废物名称一致)，以计划期限上一年自行利用处置该种危险废物的数量;',
						'自行利用处置工艺流程图及工艺说明:该设施的工艺流程示意图及其文字说明;',
						'二次环境污染控制和事故预防措施:包括污染控制措施、事故预防措施、以及设备和制度等方面的内容。'
					]
				},
				userRole: 'CSEP',
				switchInfo: [{
					id: "1",
					name: "是否定期监测污染物排放情况",
					value: ""
				}, {
					id: "2",
					name: "污染物排放达标情况",
					value: "",
					type: 'reach'
				}],
				title1: {
					title: "危险废物自行利用处置情况",
				},
				title1fromList: [{
					index: 1,
					itemList: [{
						type: "input",
						text: "",
						title: "自行利用处置废物名称",
						isSingle: true,
					},{
						type: "inputWithUnit",
						text: "",
						title: "本年度计划利用处置量",
						unit: "吨",
						isSingle: true,
					},{
						type: "inputWithUnit",
						text: "",
						title: "上年度实际利用处置量",
						unit: "吨",
						isSingle: true,
					}]
				}],
				selfDisposalMeasuresData: {
					equipmentName: "",
					category: "",
					addr: "",
					amount: "",
					can: "",
					years: "",
					startDate: "",
					price: "",
					mainEquAndNum: "",
					how: "",
				},
				textareaInfo1: {
					title: "危险废物自行利用处置工艺说明",
					placeholder: "必填",
					text: ""
				},
				textareaInfo2: {
					title: "二次环境污染控制和事故预防措施",
					placeholder: "必填",
					text: ""
				},
			}
		},
		components:{
			'my-aside':Aside,
			'assTitle':assTitle,
			'assForm':assForm,
			'assSwitch':assSwitch
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
				this.$router.push({path: '/pageIncompatible'})
			})
		},
		methods: {
			doSubmit() {
				console.log("保存save");
			},
			doReset (){

			}
		}
	}
</script>
<style>
#selfDisposalMeasures{
	display: -webkit-flex; /* Safari */
	display: flex;
	flex:1;
	flex-direction: row;
	justify-content:space-between;
	/*align-items:center;*/
	align-content:center;
	overflow-y: hidden;
}
#selfDisposalMeasures >#MyAside{
	overflow-y: scroll;
}
#selfDisposalMeasuresArea{
	flex:1;
	width: 100%;
	padding: 40px 5%;
	height: 100%;
	box-sizing: border-box;
	overflow-y: scroll;
}	
#selfDisposalMeasuresArea .el-form-item__label{
	text-align: left;
	font-size: 16px;
	width: 140px!important;
}
#selfDisposalMeasuresArea .el-form-item__content{
	font-size: 16px;
	color:#666;
	margin-left: 140px!important;
}
#selfDisposalMeasuresArea .el-form-item{
	margin-bottom: 10px;
}
.footerSign{
	width: 100%;
	height: 50px;
	float: left;
}
</style>