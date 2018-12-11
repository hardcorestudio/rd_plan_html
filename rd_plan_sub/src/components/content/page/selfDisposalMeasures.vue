<template>
	<div id='selfDisposalMeasures'>
		<my-aside :userRole="userRole" class="my-aside" :titleInfo="myTitleInfo" @doSubmit="doSubmit"></my-aside>
		<div id="selfDisposalMeasuresArea">
			<div v-if="userRole === 'CSEP'" class="productCompSwitchBg">
				<div class="productCompSwitch_title">是否有自行处理措施</div>
				<el-switch
					class="productCompSwitch_switch" 
					v-model="ifsave" 
					@change="ifsaveCheck" 
					active-color="#13ce66"
					active-text="是"
					inactive-text="否"
					active-value="1"
					inactive-value="0">
				</el-switch>
			</div>
			<el-form ref="form" :model="selfDisposalMeasuresData" :rules="rules" :show-message="ifsaveUserRole=== 'CSEP'" label-width="80px" class="selfDisposalMeasures_form">
				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item label="设施名称" prop="equipmentName">
							<el-input v-if="ifsaveUserRole=== 'CSEP'" v-model="selfDisposalMeasuresData.equipmentName" placeholder="必填(限25位)" maxlength="25"></el-input>
							<el-row v-else>{{selfDisposalMeasuresData.equipmentName}}</el-row>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="设施类别" prop="category">
							<el-input v-if="ifsaveUserRole=== 'CSEP'" v-model="selfDisposalMeasuresData.category" placeholder="必填(限25位)" maxlength="25"></el-input>
							<el-row v-else>{{selfDisposalMeasuresData.category}}</el-row>
						</el-form-item>
					</el-col>
				</el-row>
				<el-form-item label="设施地址" prop="addr">
					<el-input v-if="ifsaveUserRole=== 'CSEP'" v-model="selfDisposalMeasuresData.addr" placeholder="必填(限50位)" maxlength="50"></el-input>
					<el-row v-else>{{selfDisposalMeasuresData.addr}}</el-row>
				</el-form-item>
				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item label="总投资" prop="amount">
							<el-input v-if="ifsaveUserRole=== 'CSEP'" v-model.number="selfDisposalMeasuresData.amount" placeholder="必填(限10位)" maxlength="10">
								<template slot="append">{{selfDisposalMeasuresData.amountUnit}}</template>
							</el-input>
							<el-row v-else>{{selfDisposalMeasuresData.amount}} {{selfDisposalMeasuresData.amountUnit}}</el-row>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="设计能力" prop="can">
							<el-input v-if="ifsaveUserRole=== 'CSEP'" v-model="selfDisposalMeasuresData.can" placeholder="必填(限250位)" maxlength="250"></el-input>
							<el-row v-else>{{selfDisposalMeasuresData.can}}</el-row>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item label="设计使用年限" prop="years">
							<el-input v-if="ifsaveUserRole=== 'CSEP'" v-model="selfDisposalMeasuresData.years" placeholder="必填(限25位)" maxlength="25"></el-input>
							<el-row v-else>{{selfDisposalMeasuresData.years}}</el-row>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="投入运行时间" prop="startDate">
							<el-input v-if="ifsaveUserRole=== 'CSEP'" v-model="selfDisposalMeasuresData.startDate" placeholder="必填(限25位)" maxlength="25"></el-input>
							<el-row v-else>{{selfDisposalMeasuresData.startDate}}</el-row>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item label="运行费用" prop="price">
							<el-input v-if="ifsaveUserRole=== 'CSEP'" v-model.number="selfDisposalMeasuresData.price" placeholder="必填(限10位)" maxlength="10">
								<template slot="append">万元</template>
							</el-input>
							<el-row v-else>{{selfDisposalMeasuresData.price}}万元</el-row>
						</el-form-item>
					</el-col>
				</el-row>
				<el-form-item label="主要设备及数量" prop="mainEquAndNum">
					<el-input v-if="ifsaveUserRole=== 'CSEP'" v-model="selfDisposalMeasuresData.mainEquAndNum" placeholder="必填(限250位)" maxlength="250"></el-input>
					<el-row v-else>{{selfDisposalMeasuresData.mainEquAndNum}}</el-row>
				</el-form-item>
				<el-form-item label="危险废物利用处置效果" prop="how">
					<el-input v-if="ifsaveUserRole=== 'CSEP'" v-model="selfDisposalMeasuresData.how" placeholder="必填(限250位)" maxlength="250"></el-input>
					<el-row v-else>{{selfDisposalMeasuresData.how}}</el-row>
				</el-form-item>
			</el-form>
			<assSwitch :userRole="ifsaveUserRole" :switchInfo="switchInfo"></assSwitch>
			<assTitle :userRole="ifsaveUserRole" :titleInfo="title1" titleType="reset" :formStatus="formStatus === 'card' ? '0' : '1'" @doReset="doReset" @formStatusChange="formStatusChange"></assTitle>
			<assForm v-if="formStatus === 'card'" pageId="selfDisposalMeasures" :formList="title1fromList" :type="ifsaveUserRole === 'CSEP' ? '' : 'label'" :cateList="levelOneData"></assForm>
			<assTable v-else-if="formStatus === 'table'" :tableList="formDataList" :tableTitleList="formDataListTitle"></assTable>
			<assTitle :userRole="ifsaveUserRole" :titleInfo="textareaInfo1" titleType="textarea"></assTitle>
			<assTitle :userRole="ifsaveUserRole" :titleInfo="textareaInfo2" titleType="textarea"></assTitle>
			<div class="footerSign"></div>
		</div>
	</div>
</template>
<script>
import Aside from '../Aside.vue';
import assTitle from '../../common/assTitle.vue'
import assForm from '../../common/assForm.vue'
import assTable from '../../common/assTable.vue'
import assSwitch from '../../common/assSwitch.vue'
import { checkBrowser, getQueryString } from '../../utils/browserCheck.js'
import fetch from '../../utils/fetch.js'
export default {
	name: 'selfDisposalMeasures',
	data () {
		return {
			repaetClickTime: 2,
			repeatClickFlag: false,
			myTitleInfo: {
				title: "自行利用/处置措施", //表六
				epName: "",
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
			userRole: '',
			ifsave: "0",
			ifsaveUserRole: '',
			queryJson: {},
			switchInfo: [{
				id: "1",
				name: "是否定期监测污染物排放情况",
				value: "0"
			}, {
				id: "2",
				name: "污染物排放达标情况",
				value: "0",
				type: 'reach'
			}],
			title1: {
				title: "危险废物自行利用处置情况",
			},
			title1fromList: [{
				index: 1,
				itemList: [{
					type: "selectDIY",
					text: "",
					title: "自行利用处置废物名称",
					isSingle: true,
					unit: "1"
				}, 
				// {
				// 	type: "select",
				// 	text: "",
				// 	title: "单位",
				// 	isSingle: true,
				// }, 
				{
					type: "inputWithUnitSelect",
					text: "",
					title: "本年度计划利用处置量",
					unit: ""
				}, {
					type: "inputWithUnitSelect",
					text: "",
					title: "上年度实际利用处置量",
					unit: ""
				}]
			}],
			levelOneData: [],
			selfDisposalMeasuresData: {
				equipmentName: "",
				category: "",
				addr: "",
				amount: "",
				amountUnit: "万元",
				can: "",
				years: "",
				startDate: "",
				price: "",
				mainEquAndNum: "",
				how: "",
			},
			rules: {
				equipmentName: [
					{ required: true, message: '请输入', trigger: 'blur' }
				],
				category: [
					{ required: true, message: '请输入', trigger: 'blur' }
				],
				addr: [
					{ required: true, message: '请输入', trigger: 'blur' }
				],
				amount: [
					{ required: true, message: '请输入', trigger: 'blur' },
					{ type: 'number', message: '请输入数字' }
				],
				can: [
					{ required: true, message: '请输入', trigger: 'blur' }
				],
				years: [
					{ required: true, message: '请输入', trigger: 'blur' }
				],
				startDate: [
					{ required: true, message: '请输入', trigger: 'blur' }
				],
				price: [
					{ required: true, message: '请输入', trigger: 'blur' },
					{ type: 'number', message: '请输入数字' }
				],
				mainEquAndNum: [
					{ required: true, message: '请输入', trigger: 'blur' }
				],
				how: [
					{ required: true, message: '请输入', trigger: 'blur' }
				]
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
			formStatus: "card",   
			formDataListTitle: [{
				title: '自行利用处置废物名称',
				key: 'D_NAME'
			},{
				title: '本年度计划利用处置量',
				key: 'STORE_YEAR'
			},{
				title: '上年度实际利用处置量',
				key: 'STORE_LAST'
			},{
				title: '单位',
				key: 'STORE_PLAN_UNIT'
			}],
			formDataList: []
		}
	},
	components: {
		'my-aside': Aside,
		'assTitle': assTitle,
		'assForm': assForm,
		'assSwitch': assSwitch,
		'assTable': assTable
	},
	mounted () {
		checkBrowser(() => {
			// this.$message({
			// 	showClose: true,
			// 	message: '您当前使用的浏览器不支持本模块功能，建议使用Chrome浏览器',
			// 	type: 'warning'
			// });
			// this.$router.push({ path: '/pageIncompatible' })
			window.location.href = "pageIncompatible.html";
		})
		this.repeatClickFlag = false
		this.queryJson = getQueryString()

		this.myTitleInfo.epName = this.queryJson.epName

		this.formStatus = "card"
		
		fetch({
			url: '/plan/initHandleSelf',
			method: 'POST',
			data: 'params=' + JSON.stringify(this.queryJson)
		}).then(res => {
			// let res = {
			// 	"WJWT": "czlEcjhPMjRXelI5LzQrVE5JS1hiVGxudHdidmxmclhIenN5WSsrYU9TOD0=",
			// 	"operatorId": "",
			// 	"empId": "",
			// 	"userType": "CSEP",
			// 	"newGuideFlag": "",
			// 	"belongQ": "",
			// 	"belongS": "",
			// 	"nickName": "天津合佳威立雅环境服务有限公司",
			// 	"orgCode": "",
			// 	"initHandleSelf": {
			// 		"DB_2": 0,
			// 		"DESIGN": "放大书法",
			// 		"DB_1": 1,
			// 		"RUN_MONEY": "10",
			// 		"TP_ID": "TP201809120707190010",
			// 		"STATUS": "00",
			// 		"FACILITY_TYPE": "范德萨发",
			// 		"FACILITY_ADDRESS": "放大书法大赛嘎的说法",
			// 		"DESIGN_TIME": "十年",
			// 		"RUN_TIME": "二年",
			// 		"FACILITY_NAME": "放大",
			// 		"RUN_MONEY_UNIT": "万元",
			// 		"DESC_CONTENT": "范德萨范德萨发大水萨法",
			// 		"INVEST_SUM": "15",
			// 		"FACILITY_SUM": "放大书法大赛",
			// 		"sysdate": 1537053927987,
			// 		"MEASURE": "啊啊啊啊啊啊啊啊啊啊啊啊啊啊",
			// 		"HANDLE_EFFECT": "范德萨发大水",
			// 		"INVEST_SUM_UNIT": "吨"
			// 	},
			// 	"userId": "EP201410280910450012",
			// 	"userName": "",
			// 	"sepaName": "津南区",
			// 	"status": "",
			// 	"ifLogin": "0",
			// 	"ROLEID": "CSEP",
			// 	"epName": "天津合佳威立雅环境服务有限公司",
			// 	"epId": "EP201410280910450012",
			// 	"belongSepa": "JNQ",
			// 	"userPortrait": "",
			// 	"IWBSESSION": "BROWSER-20180917123504",
			// 	"initOverviewList": [
			// 		{
			// 			"BIG_CATEGORY_NAME": null,
			// 			"UNIT": "吨",
			// 			"W_NAME": "发大水",
			// 			"SOURCE_PROCESS": "adfdsa",
			// 			"SAMLL_CATEGORY_ID": "271-005-02",
			// 			"TP_ID": "TP201809120707190010",
			// 			"YEAR_NUM": "11",
			// 			"BIG_CATEGORY_ID": "HW02",
			// 			"W_SHAPE": "发大水",
			// 			"LAST_NUM": "1100",
			// 			"SAMLL_CATEGORY_NAME": null,
			// 			"ID": "1",
			// 			"D_NAME": "发达",
			// 			"CHARACTER": "aaa"
			// 		},
			// 		{
			// 			"BIG_CATEGORY_NAME": null,
			// 			"UNIT": "个",
			// 			"W_NAME": "111",
			// 			"SOURCE_PROCESS": "嗷嗷",
			// 			"SAMLL_CATEGORY_ID": "900-402-06",
			// 			"TP_ID": "TP201809120707190010",
			// 			"YEAR_NUM": "22",
			// 			"BIG_CATEGORY_ID": "HW06",
			// 			"W_SHAPE": "发大水",
			// 			"LAST_NUM": "2200",
			// 			"SAMLL_CATEGORY_NAME": null,
			// 			"ID": "2",
			// 			"D_NAME": "vvv",
			// 			"CHARACTER": "范德萨"
			// 		},
			// 		{
			// 			"BIG_CATEGORY_NAME": null,
			// 			"UNIT": "吨",
			// 			"W_NAME": "发大水",
			// 			"SOURCE_PROCESS": "发大水",
			// 			"SAMLL_CATEGORY_ID": "831-002-01",
			// 			"TP_ID": "TP201809120707190010",
			// 			"YEAR_NUM": "发大水",
			// 			"BIG_CATEGORY_ID": "HW01",
			// 			"W_SHAPE": "22",
			// 			"LAST_NUM": "22",
			// 			"SAMLL_CATEGORY_NAME": null,
			// 			"ID": "3",
			// 			"D_NAME": "发大水",
			// 			"CHARACTER": "范德萨"
			// 		}
			// 	],
			// 	"initHandleSelfList": [
			// 		{
			// 			"STORE_LAST_UNIT": "个",
			// 			"STORE_LAST": "500",
			// 			"ID": "1",
			// 			"D_NAME": "1123",
			// 			"TP_ID": "TP201809120707190010",
			// 			"STORE_PLAN_UNIT": "吨",
			// 			"STORE_YEAR": "100"
			// 		},
			// 		{
			// 			"STORE_LAST_UNIT": "个",
			// 			"STORE_LAST": "2000",
			// 			"ID": "2",
			// 			"D_NAME": "232",
			// 			"TP_ID": "TP201809120707190010",
			// 			"STORE_PLAN_UNIT": "吨",
			// 			"STORE_YEAR": "200"
			// 		}
			// 	],
			// 	"contextPath": "",
			// 	"realName": "",
			// 	"orgSeq": "",
			// 	"ifsave": "0"
			// }
			this.userRole = res.userType
			this.ifsave = res.ifsave
			this.ifsaveUserRole = this.ifsave === '1' ?  this.userRole : 'ifsave'

			if(res.initHandleSelf){
				this.selfDisposalMeasuresData.equipmentName = res.initHandleSelf.FACILITY_NAME
				this.selfDisposalMeasuresData.category = res.initHandleSelf.FACILITY_TYPE
				this.selfDisposalMeasuresData.addr = res.initHandleSelf.FACILITY_ADDRESS
				this.selfDisposalMeasuresData.amount = parseFloat(res.initHandleSelf.INVEST_SUM)
				this.selfDisposalMeasuresData.can = res.initHandleSelf.DESIGN
				this.selfDisposalMeasuresData.years = res.initHandleSelf.DESIGN_TIME
				this.selfDisposalMeasuresData.startDate = res.initHandleSelf.RUN_TIME
				this.selfDisposalMeasuresData.price = parseFloat(res.initHandleSelf.RUN_MONEY)
				this.selfDisposalMeasuresData.mainEquAndNum = res.initHandleSelf.FACILITY_SUM
				this.selfDisposalMeasuresData.how = res.initHandleSelf.HANDLE_EFFECT

				this.switchInfo[0].value = res.initHandleSelf.DB_1 ? res.initHandleSelf.DB_1 + "" : '0'
				this.switchInfo[1].value = res.initHandleSelf.DB_2 ? res.initHandleSelf.DB_2 + "" : '0'
				this.textareaInfo1.text = res.initHandleSelf.DESC_CONTENT
				this.textareaInfo2.text = res.initHandleSelf.MEASURE
			}

			this.levelOneData = []
			for (let i in res.initOverviewList) {
				let item = {}
				item.value = res.initOverviewList[i].D_NAME
				item.label = res.initOverviewList[i].D_NAME
				item.UNIT = res.initOverviewList[i].UNIT
				this.levelOneData.push(item)
			}

			this.formDataList = res.initHandleSelfList
			if (res.initHandleSelfList.length > 0) {
				this.title1fromList = []
				for (let i in res.initHandleSelfList) {
					let item = {
						index: i + 1,
						itemList: [{
							type: "selectDIY",
							text: res.initHandleSelfList[i].D_NAME,
							title: "自行利用处置废物名称",
							isSingle: true,
							unit: "1"
						}, 
						// {
						// 	type: "select",
						// 	text: res.initHandleSelfList[i].STORE_PLAN_UNIT,
						// 	title: "单位",
						// 	isSingle: true,
						// }, 
						{
							type: "inputWithUnitSelect",
							text: res.initHandleSelfList[i].STORE_YEAR,
							title: "本年度计划利用处置量",
							unit: res.initHandleSelfList[i].STORE_PLAN_UNIT
						}, {
							type: "inputWithUnitSelect",
							text: res.initHandleSelfList[i].STORE_LAST,
							title: "上年度实际利用处置量",
							unit: res.initHandleSelfList[i].STORE_PLAN_UNIT
						}]
					}
					this.title1fromList.push(item)
				}
			} else {
				this.title1fromList = [{
					index: 1,
					itemList: [{
						type: "selectDIY",
						text: "",
						title: "自行利用处置废物名称",
						isSingle: true,
						unit: "1"
					}, 
					// {
					// 	type: "select",
					// 	text: "",
					// 	title: "单位",
					// 	isSingle: true,
					// }, 
					{
						type: "inputWithUnitSelect",
						text: "",
						title: "本年度计划利用处置量",
						unit: ""
					}, {
						type: "inputWithUnitSelect",
						text: "",
						title: "上年度实际利用处置量",
						unit: ""
					}]
				}]
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

			let submitData = {}
			submitData.TP_ID = this.queryJson.TP_ID

			if(this.ifsave === '1'){
				let checkFlag = false
				this.$refs['form'].validate((valid) => {
					if (valid) {
						checkFlag = true
					} else {
						checkFlag = false
					}
				});
				if (!checkFlag) {
					return
				}
				submitData.FACILITY_NAME = this.selfDisposalMeasuresData.equipmentName
				submitData.FACILITY_TYPE = this.selfDisposalMeasuresData.category
				submitData.FACILITY_ADDRESS = this.selfDisposalMeasuresData.addr
				submitData.INVEST_SUM = this.selfDisposalMeasuresData.amount
				submitData.INVEST_SUM_UNIT = this.selfDisposalMeasuresData.amountUnit
				submitData.RUN_MONEY_UNIT = this.selfDisposalMeasuresData.amountUnit
				submitData.DESIGN = this.selfDisposalMeasuresData.can
				submitData.DESIGN_TIME = this.selfDisposalMeasuresData.years
				submitData.RUN_TIME = this.selfDisposalMeasuresData.startDate
				submitData.RUN_MONEY = this.selfDisposalMeasuresData.price
				submitData.FACILITY_SUM = this.selfDisposalMeasuresData.mainEquAndNum
				submitData.HANDLE_EFFECT = this.selfDisposalMeasuresData.how

				submitData.HANDLE_LIST = []
				for (let i in this.title1fromList) {
					let item = {}
					item.D_NAME = this.title1fromList[i].itemList[0].text
					item.STORE_YEAR = this.title1fromList[i].itemList[1].text
					item.STORE_PLAN_UNIT = this.title1fromList[i].itemList[1].unit
					item.STORE_LAST_UNIT = this.title1fromList[i].itemList[1].unit
					item.STORE_LAST = this.title1fromList[i].itemList[2].text

					submitData.HANDLE_LIST.push(item)
				}
				submitData.DB_1 = this.switchInfo[0].value + ""
				submitData.DB_2 = this.switchInfo[1].value + ""
				submitData.DESC_CONTENT = this.textareaInfo1.text
				submitData.MEASURE = this.textareaInfo2.text


				if(submitData.HANDLE_LIST.length === 1){
					let emptyNum = 0
					for (let key in submitData.HANDLE_LIST[0]) {
						if (key !== 'STORE_PLAN_UNIT' && key !== 'STORE_LAST_UNIT' && submitData.HANDLE_LIST[0][key] !== "") {
							emptyNum++
						}
					}
					if (emptyNum > 0 && emptyNum < 3) {
						this.$notify.error({
							title: '警告',
							message: "请填全[危险废物自行利用处置情况]所有内容"
						});
						return
					}else if(emptyNum === 0){
						//增加一个变量证明需要清空数据
						submitData.HANDLE_LIST[0].toBeEmpty = "1";
					}
				}else{
					for (let i in submitData.HANDLE_LIST) {
						for (let key in submitData.HANDLE_LIST[i]) {
							if (submitData.HANDLE_LIST[i][key] === "") {
								this.$notify.error({
									title: '警告',
									message: "请填全[危险废物自行利用处置情况]所有内容"
								});
								return
							}
						}
					}
				}

				var trimArr = this.unique(submitData.HANDLE_LIST,"D_NAME");
				if(submitData.HANDLE_LIST.length > 1 && trimArr.length < submitData.HANDLE_LIST.length ) {
					this.$notify.error({
						title: '警告',
						message: "[贮存危险废物情况]名称不能重复"
					});
					return
				}


				if (submitData.DESC_CONTENT === '') {
					this.$notify.error({
						title: '警告',
						message: "请填写危险废物自行利用处置工艺说明"
					});
					return
				}
				if (submitData.MEASURE === '') {
					this.$notify.error({
						title: '警告',
						message: "请填写二次环境污染控制和事故预防措施"
					});
					return
				}
			}

			submitData.ifsave = this.ifsave
			for (let key in this.queryJson) {
				submitData[key] = this.queryJson[key]
			}
			const loading = this.$loading({
				lock: true,
				text: 'Loading',
				spinner: 'el-icon-loading',
				background: 'rgba(0, 0, 0, 0.3)'
			});
			fetch({
				url: '/plan/saveHandleSelf',
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
		},
		doReset () {
			this.title1fromList = [{
				index: 1,
				itemList: [{
					type: "selectDIY",
					text: "",
					title: "自行利用处置废物名称",
					isSingle: true,
					unit: "1"
				}, 
				// {
				// 	type: "select",
				// 	text: "",
				// 	title: "单位",
				// 	isSingle: true,
				// }, 
				{
					type: "inputWithUnitSelect",
					text: "",
					title: "本年度计划利用处置量",
					unit: ""
				}, {
					type: "inputWithUnitSelect",
					text: "",
					title: "上年度实际利用处置量",
					unit: ""
				}]
			}]
		},
		formStatusChange(status){
			this.formStatus = status
		},
		ifsaveCheck(val) {
			if (val === '1') {
				this.ifsaveUserRole = this.userRole
			}else {
				this.$confirm('切换后数据将会被清空，是否确定?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					//清理数据
					this.doReset()
					this.selfDisposalMeasuresData = {
						equipmentName: "",
						category: "",
						addr: "",
						amount: "",
						amountUnit: "万元",
						can: "",
						years: "",
						startDate: "",
						price: "",
						mainEquAndNum: "",
						how: "",
					}
					this.textareaInfo1.text = ""
					this.textareaInfo2.text = ""
					this.switchInfo = [{
						id: "1",
						name: "是否定期监测污染物排放情况",
						value: "0"
					}, {
						id: "2",
						name: "污染物排放达标情况",
						value: "0",
						type: 'reach'
					}]

					this.ifsaveUserRole = "ifsave"
				}).catch(() => {
					if(val === '1'){
						this.ifsave = "0"
					}else{
						this.ifsave = "1"
					}    
				});
			}
		},
		unique(arr,mkey){
			var re = [arr[0][mkey]];
			for (var i =1;i<arr.length;i++){
					if( arr[i][mkey]  != re[re.length-1] ){
							re.push(arr[i][mkey]);
					}
			}
			return re;
		}
	}
}
</script>
<style>
#selfDisposalMeasures {
  display: -webkit-flex; /* Safari */
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  /*align-items:center;*/
  align-content: center;
  overflow-y: hidden;
}
#selfDisposalMeasures > #MyAside {
  overflow-y: scroll;
}
#selfDisposalMeasuresArea {
  flex: 1;
  width: 100%;
  padding: 40px 5%;
  height: 100%;
  box-sizing: border-box;
  overflow-y: scroll;
}
#selfDisposalMeasuresArea .el-form-item__label {
  text-align: left;
  font-size: 16px;
  width: 140px !important;
}
#selfDisposalMeasuresArea .el-form-item__content {
  font-size: 16px;
  color: #666;
  margin-left: 140px !important;
}
/* #selfDisposalMeasuresArea .el-form-item {
  margin-bottom: 10px;
} */
.footerSign {
  width: 100%;
  height: 50px;
  float: left;
}
.productCompSwitchBg{
	width: 100%;
	float: left;
}
.productCompSwitch_title{
	font-size: 18px;
	padding: 6px 0 12px;
	float: left;
}
.productCompSwitch_switch{
	float: left;
	margin: 8px 0 0 15px;
}
.productCompSwitch_switch .el-switch__label.is-active{ 
	color:#13ce66;
}
.selfDisposalMeasures_form{
	width: 100%;
	float: left;
}
</style>