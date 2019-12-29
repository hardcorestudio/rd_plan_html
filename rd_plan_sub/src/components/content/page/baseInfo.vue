<template>
	<div id='baseInfo'>
		<my-aside :userRole="userRole" class="my-aside" :titleInfo="myTitleInfo" @doSubmit="doSubmit"></my-aside>
		<div id="baseInfoArea">
			<el-form ref="form" :rules="rules" :model="baseInfoData" label-width="80px">
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
				<el-row>
					<el-form-item label="统一社会信用代码" prop="socialCreditCode">
						<el-input v-if="userRole=== 'CSEP'" v-model="baseInfoData.socialCreditCode" placeholder="必填"></el-input>
						<el-row v-else>{{baseInfoData.socialCreditCode}}</el-row>
					</el-form-item>
				</el-row>
				<el-row>
					<el-col v-if="userRole=== 'CSEP'" :span="1" style="width: 35px;height: 40px;line-height: 40px;">
						<el-checkbox v-model="baseInfoData.pdpChecked" true-label="1" false-label="0"></el-checkbox>
					</el-col>
					<el-col :span="userRole=== 'CSEP' ? '23' : '24'">
						<el-form-item label="排污许可证" class="pollutantDischargePermitItem">
							<el-input v-if="userRole=== 'CSEP'" v-model="baseInfoData.pollutantDischargePermit" placeholder="必填" :disabled="baseInfoData.pdpChecked==='0'"></el-input>
							<el-row v-else>{{baseInfoData.pollutantDischargePermit}}</el-row>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col :span="20">
						<el-form-item label="行业类别/代码">
							<el-row>{{baseInfoData.category}}</el-row>
						</el-form-item>
					</el-col>
					<el-col v-if="userRole=== 'CSEP'" :span="4" style="text-align: right;">
						<el-button @click="categoryEditModalOpen">选择</el-button>
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item label="总投资" prop="totalInvestment">
							<el-input v-if="userRole=== 'CSEP'" oninput="if(value.length>10)value=value.slice(0,10)" type="number" v-model.number="baseInfoData.totalInvestment" placeholder="必填(限10位)" maxlength="10">
								<template slot="append">{{baseInfoData.TOTAL_INVESTMENT_UNIT}}</template>
							</el-input>
							<el-row v-else>{{baseInfoData.totalInvestment}} {{baseInfoData.TOTAL_INVESTMENT_UNIT}}</el-row>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="总产值" prop="totalOutputValue">
							<el-input v-if="userRole=== 'CSEP'" oninput="if(value.length>10)value=value.slice(0,10)" type="number" v-model.number="baseInfoData.totalOutputValue" placeholder="必填(限10位)" maxlength="10">
								<template slot="append">{{baseInfoData.TOTAL_OUTPUTVALUE_UNIT}}</template>
							</el-input>
							<el-row v-else>{{baseInfoData.totalOutputValue}} {{baseInfoData.TOTAL_OUTPUTVALUE_UNIT}}</el-row>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item label="占地面积" prop="areaCovered">
							<el-input v-if="userRole=== 'CSEP'" oninput="if(value.length>10)value=value.slice(0,10)" type="number" v-model.number="baseInfoData.areaCovered" placeholder="必填(限10位)" maxlength="10">
								<template slot="append">{{baseInfoData.FLOOR_AREA_UNIT}}</template>
							</el-input>
							<el-row v-else>{{baseInfoData.areaCovered}} {{baseInfoData.FLOOR_AREA_UNIT}}</el-row>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="职工人数" prop="personNum">
							<el-input v-if="userRole=== 'CSEP'" oninput="if(value.length>10)value=value.slice(0,10)" type="number" v-model.number="baseInfoData.personNum" placeholder="必填(限10位)" maxlength="10"></el-input>
							<el-row v-else>{{baseInfoData.personNum}}</el-row>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item label="环保部门负责人" prop="chargeMan">
							<el-input v-if="userRole=== 'CSEP'" v-model="baseInfoData.chargeMan" placeholder="必填(限10位)" maxlength="10"></el-input>
							<el-row v-else>{{baseInfoData.chargeMan}}</el-row>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="联系人" prop="person">
							<el-input v-if="userRole=== 'CSEP'" v-model="baseInfoData.person" placeholder="必填(限10位)" maxlength="10"></el-input>
							<el-row v-else>{{baseInfoData.person}}</el-row>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item label="联系电话" prop="phone">
							<el-input v-if="userRole=== 'CSEP'" v-model="baseInfoData.phone" placeholder="必填(限18位)" maxlength="18"></el-input>
							<el-row v-else>{{baseInfoData.phone}}</el-row>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="传真电话" prop="tel">
							<el-input v-if="userRole=== 'CSEP'" v-model="baseInfoData.tel" placeholder="选填(限18位)" maxlength="18"></el-input>
							<el-row v-else>{{baseInfoData.tel}}</el-row>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item label="电子邮箱" prop="mail">
							<el-input v-if="userRole=== 'CSEP'" v-model="baseInfoData.mail" placeholder="必填(限32位)" maxlength="32"></el-input>
							<el-row v-else>{{baseInfoData.mail}}</el-row>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="单位网站">
							<el-input v-if="userRole=== 'CSEP'" v-model="baseInfoData.webside" placeholder="选填(限16位)" maxlength="16"></el-input>
							<el-row v-else>{{baseInfoData.webside}}</el-row>
						</el-form-item>
					</el-col>
				</el-row>
				<assTitle :titleInfo="bigTitle" titleType="single"></assTitle>
				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item label="管理部门" prop="department">
							<el-input v-if="userRole=== 'CSEP'" v-model="baseInfoData.department" placeholder="必填(限16位)" maxlength="16"></el-input>
							<el-row v-else>{{baseInfoData.department}}</el-row>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item label="部门负责人" prop="departmentChargeMan">
							<el-input v-if="userRole=== 'CSEP'" v-model="baseInfoData.departmentChargeMan" placeholder="必填(限16位)" maxlength="16"></el-input>
							<el-row v-else>{{baseInfoData.departmentChargeMan}}</el-row>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item label="废物管理负责人" prop="trashChargeMan">
							<el-input v-if="userRole=== 'CSEP'" v-model="baseInfoData.trashChargeMan" placeholder="必填(限16位)" maxlength="16"></el-input>
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
		<!-- modal -->
		<!-- <el-cascader :props="categoryProps"></el-cascader> -->
		<el-dialog
			title="行业类别/代码"
			v-if="categoryModalFlag"
			:visible.sync="categoryModalFlag"
			width="60%">
			<div style="width: 100%;height: 300px;">
				<!-- <div v-if="categoryValues.first_id" style="padding:10px 0; float: left;">{{categoryValues.first_id}} - {{categoryValues.first_name}} ></div>
				<div v-if="categoryValues.second_id" style="padding:10px 0; float: left;"> {{categoryValues.second_id}} - {{categoryValues.second_name}} ></div>
				<div v-if="categoryValues.third_id" style="padding:10px 0; float: left;"> {{categoryValues.third_id}} - {{categoryValues.third_name}} ></div> -->
				<el-cascader
					style="width:100%"
					v-model="categoryChooseList"
					:options="modalDataOptions"
					@active-item-change="categoryItemChange"
					:props="categoryProps"
				></el-cascader>
			</div>
			<span slot="footer" class="dialog-footer">
					<el-button @click="categoryModalFlag = false">取 消</el-button>
					<el-button type="primary" @click="categorySubmit">确 定</el-button>
				</span>
		</el-dialog>
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
		var validateTel = (rule, value, callback) => {
			if (value !== '') {
				// var regBox = {
				// 		regEmail : /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,//邮箱
				// 		regMobile : /^0?1[3|4|5|8][0-9]\d{8}$/,//手机
				// 		regTel : /^0[\d]{2,3}-[\d]{7,8}$/
				// }
				var numCheck = /^[0-9]\d*$/; 
				var tflag = numCheck.test(value);
				if (!tflag) {
					callback(new Error('请输入数字'));
				}else{
					callback();
				};
			} else {
				callback();
			}
		};
		var validatePhone = (rule, value, callback) => {
			if (value === '') {
				callback(new Error('请输入'));
			} else {
				var regBox = {
						regEmail : /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,//邮箱
						regMobile : /^0?1[3|4|5|8][0-9]\d{8}$/,//手机
						regTel : /^0[\d]{2,3}-[\d]{7,8}$/
				}
				var mflag = regBox.regMobile.test(value);
				var tflag = regBox.regTel.test(value);
				if (mflag || tflag) {
					callback();
				}else{
					callback(new Error('请输入正确的电话号码'));
				};
			}
		};
		var validateMail = (rule, value, callback) => {
			if (value === '') {
				callback(new Error('请输入'));
			} else {
				var regBox = {
						regEmail : /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,//邮箱
						regMobile : /^0?1[3|4|5|8][0-9]\d{8}$/,//手机
						regTel : /^0[\d]{2,3}-[\d]{7,8}$/
				}
				var mflag = regBox.regEmail.test(value);
				if (!mflag) {
						callback(new Error('请输入正确的邮箱'));
				}else{
						callback();
				};
			}
		};
		return {
			categoryModalFlag: false,
			repaetClickTime: 2,
			repeatClickFlag: false,
			myTitleInfo: {
				title: "基本信息",
				epName: "",
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
				totalInvestment: "", // input
				totalOutputValue: "", // input
				areaCovered: "", // input
				personNum: "", // input
				chargeMan: "", // input
				person: "", // input
				phone: "", // input
				tel: "", // input
				mail: "", // input
				webside: "", // input
				department: "", // input
				departmentChargeMan: "", // input
				trashChargeMan: "", // input
				TOTAL_INVESTMENT_UNIT: "万元",
				TOTAL_OUTPUTVALUE_UNIT: "万元",
				FLOOR_AREA_UNIT: "平方米",
				socialCreditCode: "",
				pollutantDischargePermit: "",
				pdpChecked: '0'
			},
			rules: {
				totalInvestment: [
					{ required: true, message: '请输入总投资', trigger: 'blur' },
					{ type: 'number', message: '请输入数字' }
				],
				totalOutputValue: [
					{ required: true, message: '请输入总产值', trigger: 'blur' },
					{ type: 'number', message: '请输入数字' }
				],
				areaCovered: [
					{ required: true, message: '请输入占地面积', trigger: 'blur' },
					{ type: 'number', message: '请输入数字' }
				],
				personNum: [
					{ required: true, message: '请输入职工人数', trigger: 'blur' },
					{ type: 'number', message: '请输入数字' }
				],
				chargeMan: [
					{ required: true, message: '请输入负责人', trigger: 'blur' }
				],
				person: [
					{ required: true, message: '请输入联系人', trigger: 'blur' }
				],
				phone: [
					{ required: true, trigger: 'change', validator: validateTel},
				],
				tel: [
					{ required: false, trigger: 'change', validator: validateTel},
				],
				mail: [
					{ required: true, message: '请输入电子邮箱', trigger: 'change', validator: validateMail }
				],
				department: [
					{ required: true, message: '请输入管理部门', trigger: 'blur' }
				],
				departmentChargeMan: [
					{ required: true, message: '请输入部门负责人', trigger: 'blur' }
				],
				trashChargeMan: [
					{ required: true, message: '请输入废物管理负责人', trigger: 'blur' }
				],
				socialCreditCode: [
					{ required: true, message: '请输入统一社会信用代码', trigger: 'blur' }
				],
				pollutantDischargePermit: [
					{ required: true, message: '请输入排污许可证', trigger: 'blur' }
				],
			},
			managerList: [{
				index: 1,
				text1: "",
				text2: ""
			}],
			switchList: [{
				id1: "1",
				id2: "2",
				title1: "管理制度",
				text1: "0",
				title2: "岗位责任制度",
				text2: "0"
			}, {
				id1: "1",
				id2: "2",
				title1: "安全操作规程",
				text1: "0",
				title2: "管理台账",
				text2: "0"
			}, {
				id1: "1",
				id2: "2",
				title1: "培训制度",
				text1: "0",
				title2: "意外事故防范措施和应急预案",
				text2: "0"
			}],
			manageDes: {
				title: "管理组织描述",
				placeholder: "必填",
				text: ""
			},
			modalData: {},
			modalDataOptions: [],
			categoryProps: {
				label: "dict_value",
				value: 'dict_id',
				children: 'children'
			},
			categoryValues: {},
			categoryChooseList: []
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
			// this.$router.push({ path: '/pageIncompatible' })
			window.location.href = "pageIncompatible.html";
		})
		this.repeatClickFlag = false
		this.queryJson = getQueryString()

		this.myTitleInfo.epName = this.queryJson.epName
		// let res = {
		// 	"WJWT": "czlEcjhPMjRXelI5LzQrVE5JS1hiU0xmajBIT1VoM0RsWjhTV1QwVW9EVT0=",
		// 	"sepaName": "西青区",
		// 	"operatorId": "",
		// 	"status": "",
		// 	"ROLEID": "CSEP",
		// 	"ifLogin": "0",
		// 	"initRes": {
		// 		"ISSUIETIME": null,
		// 		"ISSUIEVALID": null,
		// 		"FAX_NUM": "23991989",
		// 		"epAdress": "天津市西青区天津西青高端金属制品工业区19号",
		// 		"sbAdress": "天津市西青区高端金属制品工业区19号",
		// 		"EP_NAME": "天津市昱隆泰再生资源环保处理有限公司",
		// 		"STATUS": "2",
		// 		"IF_HANDLE": "1",
		// 		"LATITUDE": "38.53",
		// 		"IF_PRODUCE": "1",
		// 		"STEP": "1",
		// 		"planYear": "2020年",
		// 		"TEL": "23991989",
		// 		"OrgId": 3235,
		// 		"REGISTERCODE": "120111000088275",
		// 		"R_PERSON": "左松虎",
		// 		"EMAIL": "1340242675@qq.com",
		// 		"EP_ADRESS_J": "天津西青高端金属制品工业区19号",
		// 		"PROCESSINSTID": 5464,
		// 		"YSFZDATE": null,
		// 		"epName": "天津市昱隆泰再生资源环保处理有限公司",
		// 		"EP_ADRESS_S": "022",
		// 		"EP_ADRESS_Q": "XQQ",
		// 		"EP_ID": "EP201410280946090018",
		// 		"SB_ADRESS_J": "高端金属制品工业区19号",
		// 		"sysdate": 1452614400000,
		// 		"LINKMAN": "王富庆",
		// 		"BELONG_SEPA": "XQQ",
		// 		"CARD_NUM": 0,
		// 		"COMMENT": null,
		// 		"INDUSTRY_CODE": "mid_772",
		// 		"dictname": "环境治理业",
		// 		"SB_ADRESS_S": "022",
		// 		"SB_ADRESS_Q": "XQQ",
		// 		"POSTAL_CODE": "300383",
		// 		"LONGITUDE": "117.16",
		// 		"R_DATE": 1452614400000,
		// 		"IF_TRANSPORT": "0"
		// 	},
		// 	"empId": "",
		// 	"epName": "天津市昱隆泰再生资源环保处理有限公司",
		// 	"initEpExtend": {
		// 		"LINK_NUM": "18902080007",
		// 		"TOTAL_INVESTMENT": "95",
		// 		"SYS_ACCIDENT": 1,
		// 		"SYS_OPERATION": 1,
		// 		"TOTAL_OUTPUTVALUE_UNIT": "万元",
		// 		"industry_mid_id": "谷物磨制",
		// 		"STATUS": "00",
		// 		"MANAGEMENT_ORG": null,
		// 		"TOTAL_OUTPUTVALUE": "1455",
		// 		"MAIL": "1340242675@qq.com",
		// 		"WEBSITE": "",
		// 		"industry_sm_id": "C1310",
		// 		"EMPLOYEES_NUM": 30,
		// 		"industry_type_id": "C",
		// 		"industry_sm_name": "谷物磨制",
		// 		"MANAGER": "杨富财",
		// 		"REGISTERCODE": "123",
		// 		"SYS_MANAGER": 1,
		// 		"DEPARTMENT": "安环部",
		// 		"SYS_LEDGER": 1,
		// 		"FLOOR_AREA": "6667",
		// 		"FAX_TEL": "",
		// 		"SYS_RESPONSIBILITY": 1,
		// 		"PDP": "abc",
		// 		"FLOOR_AREA_UNIT": "平方米",
		// 		"TP_ID": "TP202001230422330029",
		// 		"EP_ID": "EP201410280946090018",
		// 		"PRINCIPAL": "王富庆",
		// 		"SYS_TRAINING": 1,
		// 		"DEPARTMENT_HEAD": "杨富财",
		// 		"industry_big_name": "农副食品加工业",
		// 		"TOTAL_INVESTMENT_UNIT": "万元",
		// 		"sons": [{
		// 			"TECHNICAL_DIRECTER": "杭亮",
		// 			"EDU_LEVEL": "高中",
		// 			"ID": "1",
		// 			"TP_ID": "TP202001230422330029",
		// 			"EP_ID": "EP201410280946090018"
		// 		}],
		// 		"sysdate": 1578259949393,
		// 		"LINKMAN": "王富庆",
		// 		"industry_type_name": "制造业",
		// 		"industry_mid_name": "谷物磨制",
		// 		"industry_big_id": "C13"
		// 	},
		// 	"epId": "EP201410280946090018",
		// 	"userType": "CSEP",
		// 	"newGuideFlag": "",
		// 	"belongSepa": "XQQ",
		// 	"belongQ": "",
		// 	"userPortrait": "",
		// 	"belongS": "",
		// 	"nickName": "天津市昱隆泰再生资源环保处理有限公司",
		// 	"IWBSESSION": "BROWSER-20191229043010",
		// 	"orgCode": "",
		// 	"userId": "EP201410280946090018",
		// 	"userName": "",
		// 	"realName": "",
		// 	"contextPath": "",
		// 	"orgSeq": ""
		// }

		fetch({
			url: '/plan/initBaseInfo',
			method: 'POST',
			data: 'params=' + JSON.stringify(this.queryJson)
		}).then(res => {
			this.EP_ID = this.queryJson.EP_ID
			this.userRole = res.userType
			if(res.initRes){
				this.baseInfoData.planDate = res.initRes.planYear
				this.baseInfoData.compName = res.initRes.EP_NAME
				this.baseInfoData.compAddr = res.initRes.epAdress
				this.baseInfoData.factoryAddr = res.initRes.sbAdress
				this.baseInfoData.legalPerson = res.initRes.LINKMAN
				this.baseInfoData.postNo = res.initRes.POSTAL_CODE
				
				
			}
			if(res.initEpExtend){
				this.baseInfoData.totalInvestment = parseInt(res.initEpExtend.TOTAL_INVESTMENT)
				this.baseInfoData.totalOutputValue = parseInt(res.initEpExtend.TOTAL_OUTPUTVALUE)
				this.baseInfoData.areaCovered = parseInt(res.initEpExtend.FLOOR_AREA)
				this.baseInfoData.personNum = parseInt(res.initEpExtend.EMPLOYEES_NUM)
				this.baseInfoData.chargeMan = res.initEpExtend.PRINCIPAL
				this.baseInfoData.person = res.initEpExtend.LINKMAN
				this.baseInfoData.phone = res.initEpExtend.LINK_NUM
				this.baseInfoData.tel = res.initEpExtend.FAX_TEL
				this.baseInfoData.mail = res.initEpExtend.MAIL
				this.baseInfoData.webside = res.initEpExtend.WEBSITE
				this.baseInfoData.department = res.initEpExtend.DEPARTMENT
				this.baseInfoData.departmentChargeMan = res.initEpExtend.DEPARTMENT_HEAD
				this.baseInfoData.trashChargeMan = res.initEpExtend.MANAGER

				this.baseInfoData.category = ''
				if (res.initEpExtend.industry_type_id && res.initEpExtend.industry_type_id !== '') {
					this.baseInfoData.category = res.initEpExtend.industry_type_id + ' - ' + res.initEpExtend.industry_type_name + 
																			 res.initEpExtend.industry_big_id + ' - ' + res.initEpExtend.industry_big_name + 
																			 res.initEpExtend.industry_mid_id + ' - ' + res.initEpExtend.industry_mid_name + 
																			 res.initEpExtend.industry_sm_id + ' - ' + res.initEpExtend.industry_sm_name
					this.categoryValues.first_id = res.initEpExtend.industry_type_id
					this.categoryValues.first_name = res.initEpExtend.industry_type_name
					this.categoryValues.second_id = res.initEpExtend.industry_big_id
					this.categoryValues.second_name = res.initEpExtend.industry_big_name
					this.categoryValues.third_id = res.initEpExtend.industry_mid_id
					this.categoryValues.third_name = res.initEpExtend.industry_mid_name
					this.categoryValues.fourth_id = res.initEpExtend.industry_sm_id
					this.categoryValues.fourth_name = res.initEpExtend.industry_sm_name
				}
				this.baseInfoData.socialCreditCode = res.initEpExtend.REGISTERCODE
				this.baseInfoData.pollutantDischargePermit = res.initEpExtend.PDP

				if (res.initEpExtend.sons && res.initEpExtend.sons.length > 0) {
					this.managerList = []
					for (let i in res.initEpExtend.sons) {
						let item = {}
						item.index = parseInt(i) + 1
						item.text1 = res.initEpExtend.sons[i].TECHNICAL_DIRECTER
						item.text2 = res.initEpExtend.sons[i].EDU_LEVEL
						this.managerList.push(item)
					}
				}
				this.switchList[0].text1 = res.initEpExtend.SYS_MANAGER ? res.initEpExtend.SYS_MANAGER + "" : "0"
				this.switchList[0].text2 = res.initEpExtend.SYS_RESPONSIBILITY ? res.initEpExtend.SYS_RESPONSIBILITY + "" : "0"
				this.switchList[1].text1 = res.initEpExtend.SYS_OPERATION ? res.initEpExtend.SYS_OPERATION + "" : "0"
				this.switchList[1].text2 = res.initEpExtend.SYS_LEDGER ? res.initEpExtend.SYS_LEDGER + "" : "0"
				this.switchList[2].text1 = res.initEpExtend.SYS_TRAINING ? res.initEpExtend.SYS_TRAINING + "" : "0"
				this.switchList[2].text2 = res.initEpExtend.SYS_ACCIDENT ? res.initEpExtend.SYS_ACCIDENT + "" : "0"
				this.manageDes.text = res.initEpExtend.MANAGEMENT_ORG

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

			let _this = this
			let checkFlag = false
			_this.$refs['form'].validate((valid) => {
				if (valid) {
					checkFlag = true
				} else {
					checkFlag = false
				}
			});
			if (!checkFlag) {
				return
			}
			let checkMethodFlag = true
			let checkMessagge = ''
			for (let i in _this.managerList) {
				if (_this.managerList[i].text1 === '' || _this.managerList[i].text2 === '') {
					checkMethodFlag = false
					break
				}
			}
			if (!checkMethodFlag) {
				_this.$notify.error({
					title: '警告',
					message: "请填全[废物污染防治设施]所有内容"
				});
				return
			}
			if (this.manageDes.text === "") {
				_this.$notify.error({
					title: '警告',
					message: "请填写管理组织描述"
				});
				return
			}
			if (this.baseInfoData.pdpChecked === "1" && this.baseInfoData.pollutantDischargePermit === '') {
				_this.$notify.error({
					title: '警告',
					message: "请填写排污许可证"
				});
				return
			}
			if(this.baseInfoData.category === '') {
				_this.$notify.error({
					title: '警告',
					message: "请选择行业类别/代码"
				});
				return
			}

			const loading = _this.$loading({
				lock: true,
				text: 'Loading',
				spinner: 'el-icon-loading',
				background: 'rgba(0, 0, 0, 0.3)'
			});

			let submitData = {}
			submitData.EP_ID = _this.EP_ID
			submitData.TOTAL_INVESTMENT = _this.baseInfoData.totalInvestment
			submitData.TOTAL_OUTPUTVALUE = _this.baseInfoData.totalOutputValue
			submitData.FLOOR_AREA = _this.baseInfoData.areaCovered
			submitData.EMPLOYEES_NUM = _this.baseInfoData.personNum
			submitData.PRINCIPAL = _this.baseInfoData.chargeMan
			submitData.LINKMAN = _this.baseInfoData.person
			submitData.LINK_NUM = _this.baseInfoData.phone
			submitData.FAX_TEL = _this.baseInfoData.tel
			submitData.MAIL = _this.baseInfoData.mail
			submitData.WEBSITE = _this.baseInfoData.webside
			submitData.DEPARTMENT = _this.baseInfoData.department
			submitData.DEPARTMENT_HEAD = _this.baseInfoData.departmentChargeMan
			submitData.MANAGER = _this.baseInfoData.trashChargeMan
			submitData.MANAGEMENT_ORG = _this.manageDes.text
			//new 20191227
			submitData.REGISTERCODE = _this.baseInfoData.socialCreditCode
			submitData.PDP = _this.baseInfoData.pdpChecked === '0' ? '' : _this.baseInfoData.pollutantDischargePermit
			submitData.industry_type_id = _this.categoryValues.first_id
			submitData.industry_type_name = _this.categoryValues.first_name
			submitData.industry_big_id = _this.categoryValues.second_id
			submitData.industry_big_name = _this.categoryValues.second_name
			submitData.industry_mid_id = _this.categoryValues.third_id
			submitData.industry_mid_name = _this.categoryValues.third_name
			submitData.industry_sm_id = _this.categoryValues.fourth_id
			submitData.industry_sm_name = _this.categoryValues.fourth_name

			submitData.TOTAL_INVESTMENT_UNIT = _this.baseInfoData.TOTAL_INVESTMENT_UNIT
			submitData.TOTAL_OUTPUTVALUE_UNIT = _this.baseInfoData.TOTAL_OUTPUTVALUE_UNIT
			submitData.FLOOR_AREA_UNIT = _this.baseInfoData.FLOOR_AREA_UNIT

			submitData.sons = []
			for (let i in _this.managerList) {
				let item = {}
				item.TECHNICAL_DIRECTER = _this.managerList[i].text1
				item.EDU_LEVEL = _this.managerList[i].text2
				submitData.sons.push(item)
			}

			submitData.SYS_MANAGER = _this.switchList[0].text1 + ""
			submitData.SYS_RESPONSIBILITY = _this.switchList[0].text2 + ""
			submitData.SYS_OPERATION = _this.switchList[1].text1 + ""
			submitData.SYS_LEDGER = _this.switchList[1].text2 + ""
			submitData.SYS_TRAINING = _this.switchList[2].text1 + ""
			submitData.SYS_ACCIDENT = _this.switchList[2].text2 + ""


			for (let key in _this.queryJson) {
				submitData[key] = _this.queryJson[key]
			}
			fetch({
				url: '/plan/saveBaseInfo',
				method: 'POST',
				data: 'params=' + JSON.stringify(submitData)
			}).then(res => {
				if (res.resFlag == '0') {
					_this.$notify({
						title: '成功',
						message: '保存成功',
						type: 'success'
					});
				} else {
					_this.$notify.error({
						title: '失败',
						message: res.resMsg
					});
				}
				loading.close();
			})
		},
		categoryEditModalOpen() {
			let _this = this
			let submitData = {}
			for (let key in _this.queryJson) {
				submitData[key] = _this.queryJson[key]
			}
			//wudi add url
			fetch({
				url: '/plan/getIndustryType',
				method: 'POST',
				data: 'params='+ JSON.stringify(submitData)
			}).then(res => {
				this.modalData = res
				// this.modalData = {
				// 	"industryBig": [
				// 		{
				// 			"id_main": 12,
				// 			"id": 93,
				// 			"status": "1",
				// 			"dict_value": "社会保障",
				// 			"dict_id": "S93",
				// 			"children": []
				// 		},
				// 		{
				// 			"id_main": 12,
				// 			"id": 94,
				// 			"status": "1",
				// 			"dict_value": "群众团体、社会团体和其他成员组织",
				// 			"dict_id": "S94",
				// 			"children": []
				// 		}
				// 	],
				// 	"WJWT": "czlEcjhPMjRXelI5LzQrVE5JS1hiVzA0TTEzL1llQnJZN0pDSzJWcDR2Zz0=",
				// 	"operatorId": "",
				// 	"industrySm": [
				// 		{
				// 			"id_main": 14,
				// 			"id": 1094,
				// 			"status": "1",
				// 			"dict_value": "村民自治组织",
				// 			"dict_id": "S9320",
				// 		},
				// 		{
				// 			"id_main": 14,
				// 			"id": 1095,
				// 			"status": "1",
				// 			"dict_value": "国际组织",
				// 			"dict_id": "T9400",
				// 		}
				// 	],
				// 	"empId": "",
				// 	"userType": "CSEP",
				// 	"newGuideFlag": "",
				// 	"belongQ": "",
				// 	"belongS": "",
				// 	"nickName": "天津市昱隆泰再生资源环保处理有限公司",
				// 	"orgCode": "",
				// 	"userId": "EP201410280946090018",
				// 	"userName": "",
				// 	"sepaName": "西青区",
				// 	"industryMid": [
				// 		{
				// 			"id_main": 13,
				// 			"id": 431,
				// 			"status": "1",
				// 			"dict_value": "村民自治组织",
				// 			"dict_id": "S932",
				// 			"children": []
				// 		},
				// 		{
				// 			"id_main": 13,
				// 			"id": 432,
				// 			"status": "1",
				// 			"dict_value": "国际组织",
				// 			"dict_id": "T940",
				// 			"children": []
				// 		}
				// 	],
				// 	"status": "",
				// 	"ifLogin": "0",
				// 	"ROLEID": "CSEP",
				// 	"epName": "天津市昱隆泰再生资源环保处理有限公司",
				// 	"epId": "EP201410280946090018",
				// 	"industryType": [
				// 		{
				// 			"id_main": 11,
				// 			"id": 1,
				// 			"status": "1",
				// 			"dict_value": "农、林、牧、渔业",
				// 			"dict_id": "A",
				// 			"children": []
				// 		},
				// 		{
				// 			"id_main": 11,
				// 			"id": 2,
				// 			"status": "1",
				// 			"dict_value": "采矿业",
				// 			"dict_id": "B",
				// 			"children": []
				// 		},
				// 		{
				// 			"id_main": 11,
				// 			"id": 3,
				// 			"status": "1",
				// 			"dict_value": "制造业",
				// 			"dict_id": "C",
				// 			"children": []
				// 		},
				// 		{
				// 			"id_main": 11,
				// 			"id": 4,
				// 			"status": "1",
				// 			"dict_value": "电力、热力、燃气及水生产和供应业",
				// 			"dict_id": "D",
				// 			"children": []
				// 		},
				// 		{
				// 			"id_main": 11,
				// 			"id": 5,
				// 			"status": "1",
				// 			"dict_value": "建筑业",
				// 			"dict_id": "E",
				// 			"children": []
				// 		},
				// 		{
				// 			"id_main": 11,
				// 			"id": 6,
				// 			"status": "1",
				// 			"dict_value": "批发和零售业",
				// 			"dict_id": "F",
				// 			"children": []
				// 		},
				// 		{
				// 			"id_main": 11,
				// 			"id": 7,
				// 			"status": "1",
				// 			"dict_value": "交通运输、仓储和邮政业",
				// 			"dict_id": "G",
				// 			"children": []
				// 		},
				// 		{
				// 			"id_main": 11,
				// 			"id": 8,
				// 			"status": "1",
				// 			"dict_value": "住宿和餐饮业",
				// 			"dict_id": "H",
				// 			"children": []
				// 		},
				// 		{
				// 			"id_main": 11,
				// 			"id": 9,
				// 			"status": "1",
				// 			"dict_value": "信息传输、软件和信息技术服务业",
				// 			"dict_id": "I",
				// 			"children": []
				// 		},
				// 		{
				// 			"id_main": 11,
				// 			"id": 10,
				// 			"status": "1",
				// 			"dict_value": "金融业",
				// 			"dict_id": "J",
				// 			"children": []
				// 		},
				// 		{
				// 			"id_main": 11,
				// 			"id": 11,
				// 			"status": "1",
				// 			"dict_value": "房地产业",
				// 			"dict_id": "K",
				// 			"children": []
				// 		},
				// 		{
				// 			"id_main": 11,
				// 			"id": 12,
				// 			"status": "1",
				// 			"dict_value": "租赁和商务服务业",
				// 			"dict_id": "L",
				// 			"children": []
				// 		},
				// 		{
				// 			"id_main": 11,
				// 			"id": 13,
				// 			"status": "1",
				// 			"dict_value": "科学研究和技术服务业",
				// 			"dict_id": "M",
				// 			"children": []
				// 		},
				// 		{
				// 			"id_main": 11,
				// 			"id": 14,
				// 			"status": "1",
				// 			"dict_value": "水利、环境和公共设施管理业",
				// 			"dict_id": "N",
				// 			"children": []
				// 		},
				// 		{
				// 			"id_main": 11,
				// 			"id": 15,
				// 			"status": "1",
				// 			"dict_value": "居民服务、修理和其他服务业",
				// 			"dict_id": "O",
				// 			"children": []
				// 		},
				// 		{
				// 			"id_main": 11,
				// 			"id": 16,
				// 			"status": "1",
				// 			"dict_value": "教育",
				// 			"dict_id": "P",
				// 			"children": []
				// 		},
				// 		{
				// 			"id_main": 11,
				// 			"id": 17,
				// 			"status": "1",
				// 			"dict_value": "卫生和社会工作",
				// 			"dict_id": "Q",
				// 			"children": []
				// 		},
				// 		{
				// 			"id_main": 11,
				// 			"id": 18,
				// 			"status": "1",
				// 			"dict_value": "文化、体育和娱乐业",
				// 			"dict_id": "R",
				// 			"children": []
				// 		},
				// 		{
				// 			"id_main": 11,
				// 			"id": 19,
				// 			"status": "1",
				// 			"dict_value": "公共管理、社会保障和社会组织",
				// 			"dict_id": "S",
				// 			"children": []
				// 		},
				// 		{
				// 			"id_main": 11,
				// 			"id": 20,
				// 			"status": "1",
				// 			"dict_value": "国际组织",
				// 			"dict_id": "T",
				// 			"children": []
				// 		}
				// 	],
				// 	"belongSepa": "XQQ",
				// 	"userPortrait": "",
				// 	"IWBSESSION": "BROWSER-20200125020857",
				// 	"realName": "",
				// 	"contextPath": "",
				// 	"orgSeq": ""
				// }
				this.modalDataOptions = this.modalData.industryType
				this.categoryChooseList = []
				this.categoryModalFlag = true
			})
		},
		categoryItemChange(val) {
			if(val.length === 1) {
				for (let i in this.modalDataOptions) {
					if(this.modalDataOptions[i].dict_id === val[0]) {
						
						this.modalDataOptions[i].children = []
						this.modalDataOptions[i].children = this.modalData.industryBig.filter((item) => {
							return item.dict_id.substring(0,1) === val[0];
						})
						break
					}
				}
			}else if (val.length === 2) {
				for (let i in this.modalDataOptions) {
					if(this.modalDataOptions[i].dict_id === val[0]) {

						for(let m in this.modalDataOptions[i].children) {
							if(this.modalDataOptions[i].children[m].dict_id === val[1]) {

								this.modalDataOptions[i].children[m].children = []
								this.modalDataOptions[i].children[m].children = this.modalData.industryMid.filter((item) => {
									return item.dict_id.substring(0,3) === val[1];
								})
								
								break
							}
						}
						break
					}
				}
			}else if (val.length === 3) {
				for (let i in this.modalDataOptions) {
					if(this.modalDataOptions[i].dict_id === val[0]) {

						for(let m in this.modalDataOptions[i].children) {
							if(this.modalDataOptions[i].children[m].dict_id === val[1]) {

								for(let n in this.modalDataOptions[i].children[m].children) {
									if(this.modalDataOptions[i].children[m].children[n].dict_id === val[2]) {

										this.modalDataOptions[i].children[m].children[n].children = []
										this.modalDataOptions[i].children[m].children[n].children = this.modalData.industrySm.filter((item) => {
											return item.dict_id.substring(0,4) === val[2];
										})
										break
									}
								}
								break
							}
						}
						break
					}
				}
			}
		},
		categorySubmit() {
			if (this.categoryChooseList.length === 4) {
				for (let i in this.modalData.industryType) {
					if (this.modalData.industryType[i].dict_id === this.categoryChooseList[0]) {
						this.categoryValues.first_id = this.modalData.industryType[i].dict_id
						this.categoryValues.first_name = this.modalData.industryType[i].dict_value
						break
					}
				}
				for (let i in this.modalData.industryBig) {
					if (this.modalData.industryBig[i].dict_id === this.categoryChooseList[1]) {
						this.categoryValues.second_id = this.modalData.industryBig[i].dict_id
						this.categoryValues.second_name = this.modalData.industryBig[i].dict_value
						break
					}
				}
				for (let i in this.modalData.industryMid) {
					if (this.modalData.industryMid[i].dict_id === this.categoryChooseList[2]) {
						this.categoryValues.third_id = this.modalData.industryMid[i].dict_id
						this.categoryValues.third_name = this.modalData.industryMid[i].dict_value
						break
					}
				}
				for (let i in this.modalData.industrySm) {
					if (this.modalData.industrySm[i].dict_id === this.categoryChooseList[3]) {
						this.categoryValues.fourth_id = this.modalData.industrySm[i].dict_id
						this.categoryValues.fourth_name = this.modalData.industrySm[i].dict_value
						break
					}
				}
				this.baseInfoData.category = this.categoryValues.first_id + " - " + this.categoryValues.first_name + ' / ' + 
																		 this.categoryValues.second_id + " - " + this.categoryValues.second_name + ' / ' + 
																		 this.categoryValues.third_id + " - " + this.categoryValues.third_name + ' / ' + 
																		 this.categoryValues.fourth_id + " - " + this.categoryValues.fourth_name;

				this.categoryModalFlag = false
			} else {
				this.$notify.error({
					title: '警告',
					message: "请选择行业类别/代码"
				});
			}
		}
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
  width: 155px !important;
}
#baseInfoArea .el-form-item__content {
  font-size: 16px;
  color: #666;
  margin-left: 155px !important;
}
#baseInfoArea .pollutantDischargePermitItem .el-form-item__label {
	width: 120px !important;
}
#baseInfoArea .pollutantDischargePermitItem .el-form-item__content {
	margin-left: 120px !important;
}
/* #baseInfoArea .el-form-item {
  margin-bottom: 10px;
} */
.footerSign {
  width: 100%;
  height: 50px;
  float: left;
}
</style>