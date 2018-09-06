<template>
	<div id='baseInfo'>
		<my-aside class="my-aside" :titleInfo="myTitleInfo" @doSubmit="doSubmit"></my-aside>
		<div id="baseInfoArea">
			<el-form ref="form" :model="baseInfoData" label-width="80px">
				<el-form-item label="计划期限">
					<el-row>{{baseInfoData.planDate}}</el-row>
				</el-form-item>
				<el-form-item label="单位名称">
					<el-row>{{baseInfoData.compName}}</el-row>
				</el-form-item>
				<el-form-item label="单位注册地址">
					<el-input v-model="baseInfoData.compAddr" placeholder="必填"></el-input>
				</el-form-item>
				<el-form-item label="设施厂房地址">
					<el-input v-model="baseInfoData.factoryAddr" placeholder="必填"></el-input>
				</el-form-item>
				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item label="法人">
							<el-row>{{baseInfoData.legalPerson}}</el-row>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="邮编">
							<el-input v-model="baseInfoData.postNo" placeholder="选填"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-form-item label="行业类别/代码">
					<el-row>{{baseInfoData.category}}</el-row>
				</el-form-item>
				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item label="总投资">
							<el-input v-model="baseInfoData.totalInvestment" placeholder="必填"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="总产值">
							<el-input v-model="baseInfoData.totalOutputValue" placeholder="必填"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item label="占地面积">
							<el-input v-model="baseInfoData.areaCovered" placeholder="必填"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="职工人数">
							<el-input v-model="baseInfoData.personNum" placeholder="必填"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item label="环保部门负责人">
							<el-input v-model="baseInfoData.chargeMan" placeholder="必填"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="联系人">
							<el-input v-model="baseInfoData.person" placeholder="必填"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item label="联系电话">
							<el-input v-model="baseInfoData.phone" placeholder="必填"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="传真电话">
							<el-input v-model="baseInfoData.tel" placeholder="必填"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item label="电子邮箱">
							<el-input v-model="baseInfoData.mail" placeholder="必填"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="单位网站">
							<el-input v-model="baseInfoData.webside" placeholder="选填"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<assTitle :titleInfo="bigTitle" titleType="single"></assTitle>
				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item label="管理部门">
							<el-input v-model="baseInfoData.department" placeholder="必填"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item label="部门负责人">
							<el-input v-model="baseInfoData.departmentChargeMan" placeholder="必填"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item label="废物管理负责人">
							<el-input v-model="baseInfoData.trashChargeMan" placeholder="必填"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
			<assDoubleInput @doReset="doReset" type="input" title="废物污染防治设施" itemTitleLeft="技术负责人" itemTitleRight="文化程度" :formList="managerList"></assDoubleInput>
			<assDoubleInput type="switch" title="规章制度" :formList="switchList"></assDoubleInput>
			<assTitle :titleInfo="manageDes" titleType="textarea"></assTitle>
			<div class="footerSign"></div>
		</div>
	</div>
</template>
<script>
	import Aside from '../Aside.vue';
	import assTitle from '../../common/assTitle.vue'
	import assForm from '../../common/assForm.vue'
	import assDoubleInput from '../../common/assDoubleInput.vue'
	export default {
		name:'baseInfo',
		data(){
			return {
				myTitleInfo: {
					title: "基本信息",
					textInfoList: [
						"单位注册地址：法人登记或者工商行政主管部门注册的办公地址；",
						"生产设施地址：产生危险废物的生产设施所在的地址；",
						"总产值：计划期限上一年度生产的货物和服务的价值总和；",
						"行业类别与代码：国民经济行业分类与代码（GB/T4754-2011）",
						"环保部门负责人：主管环保工作的部门负责人姓名",
						"联系人：主管环保工作的部门负责危险废物管理的人员姓名；",
						"电子邮箱：危险废物管理人员的电子邮箱；",
						"单位网址：本单位用于对外宣传和联系的网页网址",
						"管理部门：负责危险废物管理的部门名称；",
						"部门负责人：负责危险废物管理的部门的负责人姓名；",
						"废物管理负责人：负责危险废物具体管理工作的负责人；",
						"废物污染防治设施技术负责人及文化程度：负责危险废物贮存、运输、处置等污染防治设施运行管理的负责人姓名，及其文化程度；",
						"管理组织图：危险废物管理部门及人员构成的组织管理框架图。"
					]
				},
				bigTitle: {
					title: "管理部门及人员",
				},
				baseInfoData: {
					planDate: "2018年03月-2018年9月",
					compName: "天津丹阳车圈有限集团",
					compAddr: "",
					factoryAddr: "",
					legalPerson: "woody",
					postNo: "300333",
					category: "自行车制造",
					totalInvestment: "",
					totalOutputValue: "",
					areaCovered: "",
					personNum: "",
					chargeMan: "",
					person: "",
					phone: "",
					tel: "",
					mail: "",
					webside: "",
					department: "",
					departmentChargeMan: "",
					trashChargeMan: ""
				},
				managerList: [{
					index: "0",
					text1: "",
					text2: ""
				}],
				switchList: [{
					id1: "1",
					id2: "2",
					title1: "管理制度",
					text1: "",
					title2: "岗位职位制度",
					text2: ""
				},{
					id1: "1",
					id2: "2",
					title1: "安全操作规程",
					text1: "",
					title2: "管理台账",
					text2: ""
				},{
					id1: "1",
					id2: "2",
					title1: "培训制度",
					text1: "",
					title2: "意外事故防范措施和应急预案",
					text2: ""
				}],
				manageDes: {
					title: "管理组织描述",
					placeholder: "必填",
					text: ""
				},
			}
		},
		components:{
			'my-aside':Aside,
			'assTitle':assTitle,
			'assForm':assForm,
			'assDoubleInput':assDoubleInput
		},
		watch: {
			title2: function (n, o) {
				console.log(n);
				console.log(o);
			}, 
		},
		methods: {
			doSubmit() {
				console.log("保存save");
				console.log(this.title2.text);
			},
			resetRawMaterial() {
				console.log("原辅材料及消耗量");
			},
			doReset (){

			}
		}
	}
</script>
<style>
#baseInfo{
	display: -webkit-flex; /* Safari */
	display: flex;
	flex:1;
	flex-direction: row;
	justify-content:space-between;
	/*align-items:center;*/
	align-content:center;
	overflow-y: hidden;
}
#baseInfo >#MyAside{
	overflow-y: scroll
}
#baseInfoArea{
	flex:1;
	width: 100%;
	padding: 40px 5%;
	height: 100%;
	box-sizing: border-box;
	overflow-y: scroll;
}	
#baseInfoArea .el-form-item__label{
	text-align: left;
	font-size: 16px;
	width: 140px!important;
}
#baseInfoArea .el-form-item__content{
	font-size: 16px;
	color:#666;
	margin-left: 140px!important;
}
#baseInfoArea .el-form-item{
	margin-bottom: 10px;
}
.footerSign{
	width: 100%;
	height: 50px;
	float: left;
}
</style>