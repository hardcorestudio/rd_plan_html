<template>
	<div id='baseInfo'>
		<my-aside :userRole="userRole" class="my-aside" :titleInfo="myTitleInfo" @doSubmit="doSubmit"></my-aside>
		<div id="baseInfoArea">
			<el-form ref="form" :model="baseInfoData" label-width="80px">
				<el-form-item label="计划期限">
					<el-row>{{baseInfoData.planDate}}</el-row>
				</el-form-item>
				<el-form-item label="单位名称">
					<el-row>{{baseInfoData.compName}}</el-row>
				</el-form-item>
				<el-form-item label="单位注册地址">
					<el-row>{{baseInfoData.compAddr}}</el-row>
				</el-form-item>
				<el-form-item label="设施厂房地址">
					<el-row>{{baseInfoData.factoryAddr}}</el-row>
				</el-form-item>
				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item label="法人">
							<el-row>{{baseInfoData.legalPerson}}</el-row>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="邮编">
							<el-row>{{baseInfoData.postNo}}</el-row>
						</el-form-item>
					</el-col>
				</el-row>
				<el-form-item label="行业类别/代码">
					<el-row>{{baseInfoData.category}}</el-row>
				</el-form-item>
				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item label="总投资">
							<el-input v-if="userRole=== 'CSEP'" v-model="baseInfoData.totalInvestment" placeholder="必填">
								<template slot="append">{{baseInfoData.TOTAL_INVESTMENT_UNIT}}</template>
							</el-input>
							<el-row v-else>{{baseInfoData.totalInvestment}} {{baseInfoData.TOTAL_INVESTMENT_UNIT}}</el-row>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="总产值">
							<el-input v-if="userRole=== 'CSEP'" v-model="baseInfoData.totalOutputValue" placeholder="必填">
								<template slot="append">{{baseInfoData.TOTAL_OUTPUTVALUE_UNIT}}</template>
							</el-input>
							<el-row v-else>{{baseInfoData.totalOutputValue}} {{baseInfoData.TOTAL_OUTPUTVALUE_UNIT}}</el-row>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item label="占地面积">
							<el-input v-if="userRole=== 'CSEP'" v-model="baseInfoData.areaCovered" placeholder="必填">
								<template slot="append">{{baseInfoData.FLOOR_AREA_UNIT}}</template>
							</el-input>
							<el-row v-else>{{baseInfoData.areaCovered}} {{baseInfoData.FLOOR_AREA_UNIT}}</el-row>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="职工人数">
							<el-input v-if="userRole=== 'CSEP'" v-model="baseInfoData.personNum" placeholder="必填"></el-input>
							<el-row v-else>{{baseInfoData.personNum}}</el-row>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item label="环保部门负责人">
							<el-input v-if="userRole=== 'CSEP'" v-model="baseInfoData.chargeMan" placeholder="必填"></el-input>
							<el-row v-else>{{baseInfoData.chargeMan}}</el-row>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="联系人">
							<el-input v-if="userRole=== 'CSEP'" v-model="baseInfoData.person" placeholder="必填"></el-input>
							<el-row v-else>{{baseInfoData.person}}</el-row>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item label="联系电话">
							<el-input v-if="userRole=== 'CSEP'" v-model="baseInfoData.phone" placeholder="必填"></el-input>
							<el-row v-else>{{baseInfoData.phone}}</el-row>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="传真电话">
							<el-input v-if="userRole=== 'CSEP'" v-model="baseInfoData.tel" placeholder="必填"></el-input>
							<el-row v-else>{{baseInfoData.tel}}</el-row>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item label="电子邮箱">
							<el-input v-if="userRole=== 'CSEP'" v-model="baseInfoData.mail" placeholder="必填"></el-input>
							<el-row v-else>{{baseInfoData.mail}}</el-row>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="单位网站">
							<el-input v-if="userRole=== 'CSEP'" v-model="baseInfoData.webside" placeholder="选填"></el-input>
							<el-row v-else>{{baseInfoData.webside}}</el-row>
						</el-form-item>
					</el-col>
				</el-row>
				<assTitle :titleInfo="bigTitle" titleType="single"></assTitle>
				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item label="管理部门">
							<el-input v-if="userRole=== 'CSEP'" v-model="baseInfoData.department" placeholder="必填"></el-input>
							<el-row v-else>{{baseInfoData.department}}</el-row>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item label="部门负责人">
							<el-input v-if="userRole=== 'CSEP'" v-model="baseInfoData.departmentChargeMan" placeholder="必填"></el-input>
							<el-row v-else>{{baseInfoData.departmentChargeMan}}</el-row>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item label="废物管理负责人">
							<el-input v-if="userRole=== 'CSEP'" v-model="baseInfoData.trashChargeMan" placeholder="必填"></el-input>
							<el-row v-else>{{baseInfoData.trashChargeMan}}</el-row>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
			<assDoubleInput :userRole="userRole" type="input" title="废物污染防治设施" itemTitleLeft="技术负责人" itemTitleRight="文化程度" :formList="managerList"></assDoubleInput>
			<assDoubleInput :userRole="userRole" type="switch" title="规章制度" :formList="switchList"></assDoubleInput>
			<assTitle :userRole="userRole" :titleInfo="manageDes" titleType="textarea"></assTitle>
			<div class="footerSign"></div>
		</div>
	</div>
</template>
<script>
import Aside from '../Aside.vue';
import assTitle from '../../common/assTitle.vue'
import assForm from '../../common/assForm.vue'
import assDoubleInput from '../../common/assDoubleInput.vue'
import {
	checkBrowser,
	getQueryString
} from '../../utils/browserCheck.js'
import fetch from '../../utils/fetch.js'
export default {
	name: 'baseInfo',
	data () {
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
			queryJson: {},
			EP_ID: "",
			userRole: '',
			bigTitle: {
				title: "管理部门及人员",
			},
			baseInfoData: {
				planDate: "",
				compName: "",
				compAddr: "",
				factoryAddr: "",
				legalPerson: "",
				postNo: "",
				category: "",
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
				trashChargeMan: "",
				TOTAL_INVESTMENT_UNIT: "万元",
				TOTAL_OUTPUTVALUE_UNIT: "万元",
				FLOOR_AREA_UNIT: "平方米"
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
				title2: "岗位责任制度",
				text2: ""
			}, {
				id1: "1",
				id2: "2",
				title1: "安全操作规程",
				text1: "",
				title2: "管理台账",
				text2: ""
			}, {
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
	components: {
		'my-aside': Aside,
		'assTitle': assTitle,
		'assForm': assForm,
		'assDoubleInput': assDoubleInput
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
			this.$router.push({ path: '/pageIncompatible' })
		})
		this.queryJson = getQueryString()

		// let res = {
		// 	"WJWT": "czlEcjhPMjRXelI5LzQrVE5JS1hiV2Z4Z0RySVp5WUw3ZlUyVEZZRGc2Yz0=",
		// 	"sepaName": "津南区",
		// 	"operatorId": "",
		// 	"status": "",
		// 	"ROLEID": "CSEP",
		// 	"ifLogin": "0",
		// 	"initRes": {
		// 		"ISSUIETIME": null,
		// 		"ISSUIEVALID": null,
		// 		"FAX_NUM": "28569822",
		// 		"epAdress": "天津市津南区双桥河镇东",
		// 		"sbAdress": "天津市津南区双桥河镇东",
		// 		"EP_NAME": "天津合佳威立雅环境服务有限公司",
		// 		"STATUS": "2",
		// 		"IF_HANDLE": "1",
		// 		"LATITUDE": "117.35",
		// 		"IF_PRODUCE": "1",
		// 		"STEP": "1",
		// 		"planYear": "2018年",
		// 		"TEL": "28569833",
		// 		"OrgId": 3229,
		// 		"REGISTERCODE": "120000400075101",
		// 		"R_PERSON": "马宏民",
		// 		"LINKMAN": "周小华",
		// 		"EMAIL": "mahongmin1987@126.com",
		// 		"EP_ADRESS_J": "双桥河镇东",
		// 		"PROCESSINSTID": 5529,
		// 		"YSFZDATE": 1403452800000,
		// 		"epName": "天津合佳威立雅环境服务有限公司",
		// 		"EP_ADRESS_S": "022",
		// 		"EP_ADRESS_Q": "JNQ",
		// 		"EP_ID": "EP201410280910450012",
		// 		"SB_ADRESS_J": "北闸口镇二八公路69号",
		// 		"sysdate": 1448208000000,
		// 		"BELONG_SEPA": "JNQ",
		// 		"CARD_NUM": 0,
		// 		"COMMENT": null,
		// 		"INDUSTRY_CODE": "mid_772",
		// 		"dictname": "环境治理业",
		// 		"SB_ADRESS_S": "022",
		// 		"SB_ADRESS_Q": "JNQ",
		// 		"POSTAL_CODE": "300350",
		// 		"LONGITUDE": "38.96",
		// 		"R_DATE": 1448208000000,
		// 		"IF_TRANSPORT": "1"
		// 	},
		// 	"empId": "",
		// 	"epName": "天津合佳威立雅环境服务有限公司",
		// 	"initEpExtend": {
		// 		"LINK_NUM": "jj",
		// 		"TOTAL_INVESTMENT": "aa",
		// 		"SYS_ACCIDENT": 1,
		// 		"SYS_OPERATION": 0,
		// 		"TOTAL_OUTPUTVALUE_UNIT": "dd",
		// 		"STATUS": "00",
		// 		"TOTAL_OUTPUTVALUE": "cc",
		// 		"MANAGEMENT_ORG": "rr",
		// 		"MAIL": "mm",
		// 		"WEBSITE": "nn",
		// 		"EMPLOYEES_NUM": 10,
		// 		"MANAGER": "qq",
		// 		"SYS_MANAGER": 0,
		// 		"DEPARTMENT": "oo",
		// 		"SYS_LEDGER": 1,
		// 		"FLOOR_AREA": "ee",
		// 		"FAX_TEL": "ll",
		// 		"SYS_RESPONSIBILITY": 1,
		// 		"FLOOR_AREA_UNIT": "ff",
		// 		"EP_ID": "EP201410280910450012",
		// 		"PRINCIPAL": "hh",
		// 		"SYS_TRAINING": 0,
		// 		"DEPARTMENT_HEAD": "pp",
		// 		"TOTAL_INVESTMENT_UNIT": "bb",
		// 		"sons": [{
		// 			"TECHNICAL_DIRECTER": "111",
		// 			"EDU_LEVEL": "aaa",
		// 			"ID": "1",
		// 			"EP_ID": "EP201410280910450012"
		// 		}, {
		// 			"TECHNICAL_DIRECTER": "222",
		// 			"EDU_LEVEL": "bbb",
		// 			"ID": "2",
		// 			"EP_ID": "EP201410280910450012"
		// 		}],
		// 		"sysdate": 1536966393780,
		// 		"LINKMAN": "ii"
		// 	},
		// 	"epId": "EP201410280910450012",
		// 	"userType": "CSEP",
		// 	"newGuideFlag": "",
		// 	"belongSepa": "JNQ",
		// 	"belongQ": "",
		// 	"userPortrait": "",
		// 	"belongS": "",
		// 	"nickName": "天津合佳威立雅环境服务有限公司",
		// 	"IWBSESSION": "BROWSER-20180915064502",
		// 	"orgCode": "",
		// 	"userId": "EP201410280910450012",
		// 	"userName": "",
		// 	"realName": "",
		// 	"contextPath": "",
		// 	"orgSeq": ""
		// }
		
		fetch({
		  url: '/plan/initBaseInfo',
		  method: 'POST',
		  data: 'params='+JSON.stringify(this.queryJson)
		}).then(res => {
			this.EP_ID = res.initRes.EP_ID
			this.userRole = res.userType
			this.baseInfoData.planDate = res.initRes.planYear
			this.baseInfoData.compName = res.initRes.EP_NAME
			this.baseInfoData.compAddr = res.initRes.epAdress
			this.baseInfoData.factoryAddr = res.initRes.sbAdress
			this.baseInfoData.legalPerson = res.initRes.LINKMAN
			this.baseInfoData.postNo = res.initRes.POSTAL_CODE
			this.baseInfoData.category = res.initRes.dictname
			this.baseInfoData.totalInvestment = res.initEpExtend.TOTAL_INVESTMENT
			this.baseInfoData.totalOutputValue = res.initEpExtend.TOTAL_OUTPUTVALUE
			this.baseInfoData.areaCovered = res.initEpExtend.FLOOR_AREA
			this.baseInfoData.personNum = res.initEpExtend.EMPLOYEES_NUM
			this.baseInfoData.chargeMan = res.initEpExtend.PRINCIPAL
			this.baseInfoData.person = res.initEpExtend.LINKMAN
			this.baseInfoData.phone = res.initEpExtend.LINK_NUM
			this.baseInfoData.tel = res.initEpExtend.FAX_TEL
			this.baseInfoData.mail = res.initEpExtend.MAIL
			this.baseInfoData.webside = res.initEpExtend.WEBSITE
			this.baseInfoData.department = res.initEpExtend.DEPARTMENT
			this.baseInfoData.departmentChargeMan = res.initEpExtend.DEPARTMENT_HEAD
			this.baseInfoData.trashChargeMan = res.initEpExtend.MANAGER

			if(res.initEpExtend.sons.length > 0){
				this.managerList = []
				for(let i in res.initEpExtend.sons){
					let item = {}
					item.index = i + 1
					item.text1 = res.initEpExtend.sons[i].TECHNICAL_DIRECTER
					item.text2 = res.initEpExtend.sons[i].EDU_LEVEL
					this.managerList.push(item)
				}
			}
			this.switchList[0].text1 = res.initEpExtend.SYS_MANAGER + ""
			this.switchList[0].text2 = res.initEpExtend.SYS_RESPONSIBILITY + ""
			this.switchList[1].text1 = res.initEpExtend.SYS_OPERATION + ""
			this.switchList[1].text2 = res.initEpExtend.SYS_LEDGER + ""
			this.switchList[2].text1 = res.initEpExtend.SYS_TRAINING + ""
			this.switchList[2].text2 = res.initEpExtend.SYS_ACCIDENT + ""
			this.manageDes.text = res.initEpExtend.MANAGEMENT_ORG
		})
		

	},
	methods: {
		doSubmit () {
			let submitData = {}
			submitData.EP_ID = this.EP_ID
			submitData.TOTAL_INVESTMENT = this.baseInfoData.totalInvestment
			submitData.TOTAL_OUTPUTVALUE = this.baseInfoData.totalOutputValue
			submitData.FLOOR_AREA = this.baseInfoData.areaCovered
			submitData.EMPLOYEES_NUM = this.baseInfoData.personNum
			submitData.PRINCIPAL = this.baseInfoData.chargeMan
			submitData.LINKMAN = this.baseInfoData.person
			submitData.LINK_NUM = this.baseInfoData.phone
			submitData.FAX_TEL = this.baseInfoData.tel
			submitData.MAIL = this.baseInfoData.mail
			submitData.WEBSITE = this.baseInfoData.webside
			submitData.DEPARTMENT = this.baseInfoData.department
			submitData.DEPARTMENT_HEAD = this.baseInfoData.departmentChargeMan
			submitData.MANAGER = this.baseInfoData.trashChargeMan
			submitData.MANAGEMENT_ORG = this.manageDes.text

			submitData.TOTAL_INVESTMENT_UNIT = this.baseInfoData.TOTAL_INVESTMENT_UNIT
			submitData.TOTAL_OUTPUTVALUE_UNIT = this.baseInfoData.TOTAL_OUTPUTVALUE_UNIT
			submitData.FLOOR_AREA_UNIT = this.baseInfoData.FLOOR_AREA_UNIT

			submitData.sons = []
			for(let i in this.managerList){
				let item = {}
				item.TECHNICAL_DIRECTER = this.managerList[i].text1
				item.EDU_LEVEL = this.managerList[i].text2
				submitData.sons.push(item)
			}

			submitData.SYS_MANAGER = this.switchList[0].text1 + ""
			submitData.SYS_RESPONSIBILITY = this.switchList[0].text2 + ""
			submitData.SYS_OPERATION = this.switchList[1].text1 + ""
			submitData.SYS_LEDGER = this.switchList[1].text2 + ""
			submitData.SYS_TRAINING = this.switchList[2].text1 + ""
			submitData.SYS_ACCIDENT = this.switchList[2].text2 + ""


			for (let key in this.queryJson) {
				submitData[key] = this.queryJson[key]
			}
			fetch({
				url: '/plan/saveBaseInfo',
				method: 'POST',
				data: 'params='+JSON.stringify(submitData)
			}).then(res => {
				if(res.resFlag == '0'){
					this.$notify({
						title: '成功',
						message: '保存成功',
						type: 'success'
					});
				}else{
					this.$notify({
						title: '失败',
						message: res.resMsg,
						type: 'success'
					});
				}
			})
		},
	}
}
</script>
<style>
#baseInfo {
  display: -webkit-flex; /* Safari */
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  /*align-items:center;*/
  align-content: center;
  overflow-y: hidden;
}
#baseInfo > #MyAside {
  overflow-y: scroll;
}
#baseInfoArea {
  flex: 1;
  width: 100%;
  padding: 40px 5%;
  height: 100%;
  box-sizing: border-box;
  overflow-y: scroll;
}
#baseInfoArea .el-form-item__label {
  text-align: left;
  font-size: 16px;
  width: 140px !important;
}
#baseInfoArea .el-form-item__content {
  font-size: 16px;
  color: #666;
  margin-left: 140px !important;
}
#baseInfoArea .el-form-item {
  margin-bottom: 10px;
}
.footerSign {
  width: 100%;
  height: 50px;
  float: left;
}
</style>