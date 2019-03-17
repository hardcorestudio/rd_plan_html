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
			<div class="sdm_formTitle">
				<div class="sdm_formTitleText">自行利用/处置措施(一)</div>
			</div>
			<div class="selfDisposalMeasuresAreaBg">
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
			</div>
			<div class="sdm_formTitle" @click="isFormTwoShow = !isFormTwoShow">
				<div class="sdm_formTitleText">自行利用/处置措施(二)</div>
				<div class="sdm_formTitleBtn">{{isFormTwoShow ? '收起' : '展开'}}</div>
			</div>
			<div v-if="isFormTwoShow" class="selfDisposalMeasuresAreaBg">
				<el-form ref="form2" :model="selfDisposalMeasuresData2" :rules="rules" :show-message="ifsaveUserRole=== 'CSEP'" label-width="80px" class="selfDisposalMeasures_form">
					<el-row :gutter="20">
						<el-col :span="12">
							<el-form-item label="设施名称" prop="equipmentName">
								<el-input v-if="ifsaveUserRole=== 'CSEP'" v-model="selfDisposalMeasuresData2.equipmentName" placeholder="必填(限25位)" maxlength="25"></el-input>
								<el-row v-else>{{selfDisposalMeasuresData2.equipmentName}}</el-row>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="设施类别" prop="category">
								<el-input v-if="ifsaveUserRole=== 'CSEP'" v-model="selfDisposalMeasuresData2.category" placeholder="必填(限25位)" maxlength="25"></el-input>
								<el-row v-else>{{selfDisposalMeasuresData2.category}}</el-row>
							</el-form-item>
						</el-col>
					</el-row>
					<el-form-item label="设施地址" prop="addr">
						<el-input v-if="ifsaveUserRole=== 'CSEP'" v-model="selfDisposalMeasuresData2.addr" placeholder="必填(限50位)" maxlength="50"></el-input>
						<el-row v-else>{{selfDisposalMeasuresData2.addr}}</el-row>
					</el-form-item>
					<el-row :gutter="20">
						<el-col :span="12">
							<el-form-item label="总投资" prop="amount">
								<el-input v-if="ifsaveUserRole=== 'CSEP'" v-model.number="selfDisposalMeasuresData2.amount" placeholder="必填(限10位)" maxlength="10">
									<template slot="append">{{selfDisposalMeasuresData2.amountUnit}}</template>
								</el-input>
								<el-row v-else>{{selfDisposalMeasuresData2.amount}} {{selfDisposalMeasuresData2.amountUnit}}</el-row>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="设计能力" prop="can">
								<el-input v-if="ifsaveUserRole=== 'CSEP'" v-model="selfDisposalMeasuresData2.can" placeholder="必填(限250位)" maxlength="250"></el-input>
								<el-row v-else>{{selfDisposalMeasuresData2.can}}</el-row>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row :gutter="20">
						<el-col :span="12">
							<el-form-item label="设计使用年限" prop="years">
								<el-input v-if="ifsaveUserRole=== 'CSEP'" v-model="selfDisposalMeasuresData2.years" placeholder="必填(限25位)" maxlength="25"></el-input>
								<el-row v-else>{{selfDisposalMeasuresData2.years}}</el-row>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="投入运行时间" prop="startDate">
								<el-input v-if="ifsaveUserRole=== 'CSEP'" v-model="selfDisposalMeasuresData2.startDate" placeholder="必填(限25位)" maxlength="25"></el-input>
								<el-row v-else>{{selfDisposalMeasuresData2.startDate}}</el-row>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row :gutter="20">
						<el-col :span="12">
							<el-form-item label="运行费用" prop="price">
								<el-input v-if="ifsaveUserRole=== 'CSEP'" v-model.number="selfDisposalMeasuresData2.price" placeholder="必填(限10位)" maxlength="10">
									<template slot="append">万元</template>
								</el-input>
								<el-row v-else>{{selfDisposalMeasuresData2.price}}万元</el-row>
							</el-form-item>
						</el-col>
					</el-row>
					<el-form-item label="主要设备及数量" prop="mainEquAndNum">
						<el-input v-if="ifsaveUserRole=== 'CSEP'" v-model="selfDisposalMeasuresData2.mainEquAndNum" placeholder="必填(限250位)" maxlength="250"></el-input>
						<el-row v-else>{{selfDisposalMeasuresData2.mainEquAndNum}}</el-row>
					</el-form-item>
					<el-form-item label="危险废物利用处置效果" prop="how">
						<el-input v-if="ifsaveUserRole=== 'CSEP'" v-model="selfDisposalMeasuresData2.how" placeholder="必填(限250位)" maxlength="250"></el-input>
						<el-row v-else>{{selfDisposalMeasuresData2.how}}</el-row>
					</el-form-item>
				</el-form>
				<assSwitch :userRole="ifsaveUserRole" :switchInfo="switchInfo2"></assSwitch>
				<assTitle :userRole="ifsaveUserRole" :titleInfo="title1" titleType="reset" :formStatus="formStatus2 === 'card' ? '0' : '1'" @doReset="doReset2" @formStatusChange="formStatusChange2"></assTitle>
				<assForm v-if="formStatus2 === 'card'" pageId="selfDisposalMeasures" :formList="title1fromList2" :type="ifsaveUserRole === 'CSEP' ? '' : 'label'" :cateList="levelOneData"></assForm>
				<assTable v-else-if="formStatus2 === 'table'" :tableList="formDataList2" :tableTitleList="formDataListTitle"></assTable>
				<assTitle :userRole="ifsaveUserRole" :titleInfo="textareaInfo1_2" titleType="textarea"></assTitle>
				<assTitle :userRole="ifsaveUserRole" :titleInfo="textareaInfo2_2" titleType="textarea"></assTitle>
			</div>
			<div class="sdm_formTitle" @click="isFormThreeShow = !isFormThreeShow">
				<div class="sdm_formTitleText">自行利用/处置措施(三)</div>
				<div class="sdm_formTitleBtn">{{isFormThreeShow ? '收起' : '展开'}}</div>
			</div>
			<div v-if="isFormThreeShow" class="selfDisposalMeasuresAreaBg">
				<el-form ref="form3" :model="selfDisposalMeasuresData3" :rules="rules" :show-message="ifsaveUserRole=== 'CSEP'" label-width="80px" class="selfDisposalMeasures_form">
					<el-row :gutter="20">
						<el-col :span="12">
							<el-form-item label="设施名称" prop="equipmentName">
								<el-input v-if="ifsaveUserRole=== 'CSEP'" v-model="selfDisposalMeasuresData3.equipmentName" placeholder="必填(限25位)" maxlength="25"></el-input>
								<el-row v-else>{{selfDisposalMeasuresData3.equipmentName}}</el-row>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="设施类别" prop="category">
								<el-input v-if="ifsaveUserRole=== 'CSEP'" v-model="selfDisposalMeasuresData3.category" placeholder="必填(限25位)" maxlength="25"></el-input>
								<el-row v-else>{{selfDisposalMeasuresData3.category}}</el-row>
							</el-form-item>
						</el-col>
					</el-row>
					<el-form-item label="设施地址" prop="addr">
						<el-input v-if="ifsaveUserRole=== 'CSEP'" v-model="selfDisposalMeasuresData3.addr" placeholder="必填(限50位)" maxlength="50"></el-input>
						<el-row v-else>{{selfDisposalMeasuresData3.addr}}</el-row>
					</el-form-item>
					<el-row :gutter="20">
						<el-col :span="12">
							<el-form-item label="总投资" prop="amount">
								<el-input v-if="ifsaveUserRole=== 'CSEP'" v-model.number="selfDisposalMeasuresData3.amount" placeholder="必填(限10位)" maxlength="10">
									<template slot="append">{{selfDisposalMeasuresData3.amountUnit}}</template>
								</el-input>
								<el-row v-else>{{selfDisposalMeasuresData3.amount}} {{selfDisposalMeasuresData3.amountUnit}}</el-row>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="设计能力" prop="can">
								<el-input v-if="ifsaveUserRole=== 'CSEP'" v-model="selfDisposalMeasuresData3.can" placeholder="必填(限250位)" maxlength="250"></el-input>
								<el-row v-else>{{selfDisposalMeasuresData3.can}}</el-row>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row :gutter="20">
						<el-col :span="12">
							<el-form-item label="设计使用年限" prop="years">
								<el-input v-if="ifsaveUserRole=== 'CSEP'" v-model="selfDisposalMeasuresData3.years" placeholder="必填(限25位)" maxlength="25"></el-input>
								<el-row v-else>{{selfDisposalMeasuresData3.years}}</el-row>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="投入运行时间" prop="startDate">
								<el-input v-if="ifsaveUserRole=== 'CSEP'" v-model="selfDisposalMeasuresData3.startDate" placeholder="必填(限25位)" maxlength="25"></el-input>
								<el-row v-else>{{selfDisposalMeasuresData3.startDate}}</el-row>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row :gutter="20">
						<el-col :span="12">
							<el-form-item label="运行费用" prop="price">
								<el-input v-if="ifsaveUserRole=== 'CSEP'" v-model.number="selfDisposalMeasuresData3.price" placeholder="必填(限10位)" maxlength="10">
									<template slot="append">万元</template>
								</el-input>
								<el-row v-else>{{selfDisposalMeasuresData3.price}}万元</el-row>
							</el-form-item>
						</el-col>
					</el-row>
					<el-form-item label="主要设备及数量" prop="mainEquAndNum">
						<el-input v-if="ifsaveUserRole=== 'CSEP'" v-model="selfDisposalMeasuresData3.mainEquAndNum" placeholder="必填(限250位)" maxlength="250"></el-input>
						<el-row v-else>{{selfDisposalMeasuresData3.mainEquAndNum}}</el-row>
					</el-form-item>
					<el-form-item label="危险废物利用处置效果" prop="how">
						<el-input v-if="ifsaveUserRole=== 'CSEP'" v-model="selfDisposalMeasuresData3.how" placeholder="必填(限250位)" maxlength="250"></el-input>
						<el-row v-else>{{selfDisposalMeasuresData3.how}}</el-row>
					</el-form-item>
				</el-form>
				<assSwitch :userRole="ifsaveUserRole" :switchInfo="switchInfo3"></assSwitch>
				<assTitle :userRole="ifsaveUserRole" :titleInfo="title1" titleType="reset" :formStatus="formStatus3 === 'card' ? '0' : '1'" @doReset="doReset3" @formStatusChange="formStatusChange3"></assTitle>
				<assForm v-if="formStatus3 === 'card'" pageId="selfDisposalMeasures" :formList="title1fromList3" :type="ifsaveUserRole === 'CSEP' ? '' : 'label'" :cateList="levelOneData"></assForm>
				<assTable v-else-if="formStatus3 === 'table'" :tableList="formDataList3" :tableTitleList="formDataListTitle"></assTable>
				<assTitle :userRole="ifsaveUserRole" :titleInfo="textareaInfo1_3" titleType="textarea"></assTitle>
				<assTitle :userRole="ifsaveUserRole" :titleInfo="textareaInfo2_3" titleType="textarea"></assTitle>
			</div>
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
			isFormTwoShow: false,
			isFormThreeShow: false,
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
			switchInfo2: [{
				id: "1",
				name: "是否定期监测污染物排放情况",
				value: "0"
			}, {
				id: "2",
				name: "污染物排放达标情况",
				value: "0",
				type: 'reach'
			}],
			switchInfo3: [{
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
			title1fromList2: [{
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
			title1fromList3: [{
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
			selfDisposalMeasuresData2: {
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
			selfDisposalMeasuresData3: {
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
			textareaInfo1_2: {
				title: "危险废物自行利用处置工艺说明",
				placeholder: "必填",
				text: ""
			},
			textareaInfo2_2: {
				title: "二次环境污染控制和事故预防措施",
				placeholder: "必填",
				text: ""
			},
			textareaInfo1_3: {
				title: "危险废物自行利用处置工艺说明",
				placeholder: "必填",
				text: ""
			},
			textareaInfo2_3: {
				title: "二次环境污染控制和事故预防措施",
				placeholder: "必填",
				text: ""
			},
			formStatus: "card",  
			formStatus2: "card",   
			formStatus3: "card",    
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
			formDataList: [],
			formDataList2: [],
			formDataList3: []
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
		this.formStatus2 = "card"
		this.formStatus3 = "card"
		
		fetch({
			url: '/plan/initHandleSelf',
			method: 'POST',
			data: 'params=' + JSON.stringify(this.queryJson)
		}).then(res => {
		// 	let res = {
		// 		"WJWT":"czlEcjhPMjRXelI5LzQrVE5JS1hiVEowR0xtTTlnck5HdHZlN3d3aFlEbz0=",
		// 		"operatorId":"",
		// 		"empId":"",
		// 		"userType":"CSEP",
		// 		"newGuideFlag":"",
		// 		"belongQ":"",
		// 		"ifsave":"1",
		// 		"belongS":"",
		// 		"nickName":"天津市昱隆泰再生资源环保处理有限公司",
		// 		"orgCode":"",
		// 		"userId":"EP201410280946090018",
		// 		"userName":"",
		// 		"initHandleSelfs":[
		// 				{
		// 						"DB_2":1,
		// 						"DESIGN":"21",
		// 						"DB_1":1,
		// 						"RUN_MONEY":"2121",
		// 						"TP_ID":"TP201812101031280016",
		// 						"STATUS":"0",
		// 						"FACILITY_TYPE":"22",
		// 						"FACILITY_ADDRESS":"33",
		// 						"DESIGN_TIME":"12",
		// 						"RUN_TIME":"21",
		// 						"FACILITY_NAME":"11",
		// 						"RUN_MONEY_UNIT":"万元",
		// 						"DESC_CONTENT":"12",
		// 						"INVEST_SUM":"123",
		// 						"FACILITY_SUM":"21",
		// 						"sysdate":1545879513000,
		// 						"MEASURE":"21",
		// 						"ID":"1",
		// 						"initHandleSelfList":[
		// 								{
		// 										"STORE_LAST_UNIT":"吨",
		// 										"STORE_LAST":"21",
		// 										"ID":"1",
		// 										"D_NAME":"废物名称1",
		// 										"TP_ID":"TP201812101031280016",
		// 										"STORE_PLAN_UNIT":"吨",
		// 										"STORE_YEAR":"21",
		// 										"MAIN_ID":"1"
		// 								}
		// 						],
		// 						"HANDLE_EFFECT":"21",
		// 						"INVEST_SUM_UNIT":"万元"
		// 				},
		// 				{
		// 						"DB_2":1,
		// 						"DESIGN":"21",
		// 						"DB_1":1,
		// 						"RUN_MONEY":"2121",
		// 						"TP_ID":"TP201812101031280016",
		// 						"STATUS":"0",
		// 						"FACILITY_TYPE":"22",
		// 						"FACILITY_ADDRESS":"33",
		// 						"DESIGN_TIME":"12",
		// 						"RUN_TIME":"21",
		// 						"FACILITY_NAME":"11",
		// 						"RUN_MONEY_UNIT":"万元",
		// 						"DESC_CONTENT":"12",
		// 						"INVEST_SUM":"123",
		// 						"FACILITY_SUM":"21",
		// 						"sysdate":1545879513000,
		// 						"MEASURE":"21",
		// 						"ID":"1",
		// 						"initHandleSelfList":[
		// 								{
		// 										"STORE_LAST_UNIT":"吨",
		// 										"STORE_LAST":"21",
		// 										"ID":"1",
		// 										"D_NAME":"废物名称1",
		// 										"TP_ID":"TP201812101031280016",
		// 										"STORE_PLAN_UNIT":"吨",
		// 										"STORE_YEAR":"21",
		// 										"MAIN_ID":"1"
		// 								}
		// 						],
		// 						"HANDLE_EFFECT":"21",
		// 						"INVEST_SUM_UNIT":"万元"
		// 				}
		// 		],
		// 		"sepaName":"西青区",
		// 		"status":"",
		// 		"ifLogin":"0",
		// 		"ROLEID":"CSEP",
		// 		"epName":"天津市昱隆泰再生资源环保处理有限公司",
		// 		"epId":"EP201410280946090018",
		// 		"belongSepa":"XQQ",
		// 		"userPortrait":"",
		// 		"IWBSESSION":"BROWSER-20190124131817",
		// 		"initOverviewList":[
		// 				{
		// 						"BIG_CATEGORY_NAME":"医疗废物",
		// 						"UNIT":"吨",
		// 						"W_NAME":"有害物质名称1",
		// 						"SOURCE_PROCESS":"22",
		// 						"SAMLL_CATEGORY_ID":"831-001-01",
		// 						"TP_ID":"TP201812101031280016",
		// 						"YEAR_NUM":"100000",
		// 						"BIG_CATEGORY_ID":"HW01",
		// 						"W_SHAPE":"物理性状1",
		// 						"LAST_NUM":"200000",
		// 						"SAMLL_CATEGORY_NAME":"感染性废物",
		// 						"ID":"1",
		// 						"D_NAME":"废物名称1",
		// 						"CHARACTER":"In"
		// 				},
		// 				{
		// 						"BIG_CATEGORY_NAME":"医疗废物",
		// 						"UNIT":"个",
		// 						"W_NAME":"有害物质名称2",
		// 						"SOURCE_PROCESS":"来源及产生工序2",
		// 						"SAMLL_CATEGORY_ID":"900-001-01",
		// 						"TP_ID":"TP201812101031280016",
		// 						"YEAR_NUM":"3000000",
		// 						"BIG_CATEGORY_ID":"HW01",
		// 						"W_SHAPE":"物理性状2",
		// 						"LAST_NUM":"4000000",
		// 						"SAMLL_CATEGORY_NAME":"为防治动物传染病而需要收集和处置的废物",
		// 						"ID":"2",
		// 						"D_NAME":"废物名称2",
		// 						"CHARACTER":"T"
		// 				},
		// 				{
		// 						"BIG_CATEGORY_NAME":"医药废物",
		// 						"UNIT":"吨",
		// 						"W_NAME":"有害物质名称3",
		// 						"SOURCE_PROCESS":"来源及产生工序3",
		// 						"SAMLL_CATEGORY_ID":"271-001-02",
		// 						"TP_ID":"TP201812101031280016",
		// 						"YEAR_NUM":"5000000",
		// 						"BIG_CATEGORY_ID":"HW02",
		// 						"W_SHAPE":" 物理性状3",
		// 						"LAST_NUM":"6000000",
		// 						"SAMLL_CATEGORY_NAME":"化学合成原料药生产产生的蒸馏及反应残余物",
		// 						"ID":"3",
		// 						"D_NAME":"废物名称3",
		// 						"CHARACTER":"I"
		// 				},
		// 				{
		// 						"BIG_CATEGORY_NAME":"木材防腐剂废物",
		// 						"UNIT":"吨",
		// 						"W_NAME":"1234",
		// 						"SOURCE_PROCESS":"好的",
		// 						"SAMLL_CATEGORY_ID":"201-001-05",
		// 						"TP_ID":"TP201812101031280016",
		// 						"YEAR_NUM":"100",
		// 						"BIG_CATEGORY_ID":"HW05",
		// 						"W_SHAPE":"去玩儿",
		// 						"LAST_NUM":"200.56",
		// 						"SAMLL_CATEGORY_NAME":"使用五氯酚进行木材防腐产生的废水处理污泥以及木材防腐处理产生的沾染该防腐剂的废弃木材残片",
		// 						"ID":"4",
		// 						"D_NAME":"废物名称4",
		// 						"CHARACTER":"C"
		// 				},
		// 				{
		// 						"BIG_CATEGORY_NAME":"废有机溶剂与含有机溶剂废物",
		// 						"UNIT":"吨",
		// 						"W_NAME":"有害物质名称6",
		// 						"SOURCE_PROCESS":"阿212",
		// 						"SAMLL_CATEGORY_ID":"900-401-06",
		// 						"TP_ID":"TP201812101031280016",
		// 						"YEAR_NUM":"100.11",
		// 						"BIG_CATEGORY_ID":"HW06",
		// 						"W_SHAPE":"666",
		// 						"LAST_NUM":"200.22",
		// 						"SAMLL_CATEGORY_NAME":"工业生产中作为清洗剂或萃取剂使用后废弃的含卤素有机溶剂包括四氯化碳二氯甲烷11-二氯乙烷12-二氯乙烷111-三氯乙烷112-三氯乙烷三氯乙烯四氯乙烯",
		// 						"ID":"5",
		// 						"D_NAME":"废物名称5",
		// 						"CHARACTER":"T/I"
		// 				},
		// 				{
		// 						"BIG_CATEGORY_NAME":"多氯（溴）联苯类废物",
		// 						"UNIT":"吨",
		// 						"W_NAME":"1",
		// 						"SOURCE_PROCESS":"1",
		// 						"SAMLL_CATEGORY_ID":"900-008-10",
		// 						"TP_ID":"TP201812101031280016",
		// 						"YEAR_NUM":"1",
		// 						"BIG_CATEGORY_ID":"HW10",
		// 						"W_SHAPE":"1",
		// 						"LAST_NUM":"2",
		// 						"SAMLL_CATEGORY_NAME":"含多氯联苯（PCBs）多氯三联苯（PCTs）多溴联苯（PBBs）的电容器变压器",
		// 						"ID":"6",
		// 						"D_NAME":"hahaha",
		// 						"CHARACTER":"C"
		// 				}
		// 		],
		// 		"realName":"",
		// 		"contextPath":"",
		// 		"orgSeq":""
		// }
			this.userRole = res.userType
			this.ifsave = res.ifsave
			this.ifsaveUserRole = this.ifsave === '1' ?  this.userRole : 'ifsave'
			
			let selfListLength = res.initHandleSelfs.length
			this.levelOneData = []
			for (let i in res.initOverviewList) {
				let item = {}
				item.value = res.initOverviewList[i].D_NAME
				item.label = res.initOverviewList[i].D_NAME
				item.UNIT = res.initOverviewList[i].UNIT
				this.levelOneData.push(item)
			}
			if(selfListLength > 0){
				if(selfListLength === 1){
					this.isFormTwoShow = false
					this.isFormThreeShow = false
				}else if(selfListLength === 2){
					this.isFormTwoShow = true
					this.isFormThreeShow = false
				}else if(selfListLength === 3){
					this.isFormTwoShow = true
					this.isFormThreeShow = true
				}

				for(let i = 0;i < selfListLength;i++){
					if(i === 0){
						this.selfDisposalMeasuresData.equipmentName = res.initHandleSelfs[i].FACILITY_NAME
						this.selfDisposalMeasuresData.category = res.initHandleSelfs[i].FACILITY_TYPE
						this.selfDisposalMeasuresData.addr = res.initHandleSelfs[i].FACILITY_ADDRESS
						this.selfDisposalMeasuresData.amount = parseFloat(res.initHandleSelfs[i].INVEST_SUM)
						this.selfDisposalMeasuresData.can = res.initHandleSelfs[i].DESIGN
						this.selfDisposalMeasuresData.years = res.initHandleSelfs[i].DESIGN_TIME
						this.selfDisposalMeasuresData.startDate = res.initHandleSelfs[i].RUN_TIME
						this.selfDisposalMeasuresData.price = parseFloat(res.initHandleSelfs[i].RUN_MONEY)
						this.selfDisposalMeasuresData.mainEquAndNum = res.initHandleSelfs[i].FACILITY_SUM
						this.selfDisposalMeasuresData.how = res.initHandleSelfs[i].HANDLE_EFFECT

						this.switchInfo[0].value = res.initHandleSelfs[i].DB_1 ? res.initHandleSelfs[i].DB_1 + "" : '0'
						this.switchInfo[1].value = res.initHandleSelfs[i].DB_2 ? res.initHandleSelfs[i].DB_2 + "" : '0'
						this.textareaInfo1.text = res.initHandleSelfs[i].DESC_CONTENT
						this.textareaInfo2.text = res.initHandleSelfs[i].MEASURE

						this.formDataList = res.initHandleSelfs[i].initHandleSelfList
						if (res.initHandleSelfs[i].initHandleSelfList.length > 0) {
							this.title1fromList = []
							for (let j in res.initHandleSelfs[i].initHandleSelfList) {
								let item = {
									index: j + 1,
									itemList: [{
										type: "selectDIY",
										text: res.initHandleSelfs[i].initHandleSelfList[j].D_NAME,
										title: "自行利用处置废物名称",
										isSingle: true,
										unit: "1"
									}, {
										type: "inputWithUnitSelect",
										text: res.initHandleSelfs[i].initHandleSelfList[j].STORE_YEAR,
										title: "本年度计划利用处置量",
										unit: res.initHandleSelfs[i].initHandleSelfList[j].STORE_PLAN_UNIT
									}, {
										type: "inputWithUnitSelect",
										text: res.initHandleSelfs[i].initHandleSelfList[j].STORE_LAST,
										title: "上年度实际利用处置量",
										unit: res.initHandleSelfs[i].initHandleSelfList[j].STORE_PLAN_UNIT
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
								}, {
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
					}
					if(i === 1){
						this.selfDisposalMeasuresData2.equipmentName = res.initHandleSelfs[i].FACILITY_NAME
						this.selfDisposalMeasuresData2.category = res.initHandleSelfs[i].FACILITY_TYPE
						this.selfDisposalMeasuresData2.addr = res.initHandleSelfs[i].FACILITY_ADDRESS
						this.selfDisposalMeasuresData2.amount = parseFloat(res.initHandleSelfs[i].INVEST_SUM)
						this.selfDisposalMeasuresData2.can = res.initHandleSelfs[i].DESIGN
						this.selfDisposalMeasuresData2.years = res.initHandleSelfs[i].DESIGN_TIME
						this.selfDisposalMeasuresData2.startDate = res.initHandleSelfs[i].RUN_TIME
						this.selfDisposalMeasuresData2.price = parseFloat(res.initHandleSelfs[i].RUN_MONEY)
						this.selfDisposalMeasuresData2.mainEquAndNum = res.initHandleSelfs[i].FACILITY_SUM
						this.selfDisposalMeasuresData2.how = res.initHandleSelfs[i].HANDLE_EFFECT

						this.switchInfo2[0].value = res.initHandleSelfs[i].DB_1 ? res.initHandleSelfs[i].DB_1 + "" : '0'
						this.switchInfo2[1].value = res.initHandleSelfs[i].DB_2 ? res.initHandleSelfs[i].DB_2 + "" : '0'
						this.textareaInfo1_2.text = res.initHandleSelfs[i].DESC_CONTENT
						this.textareaInfo2_2.text = res.initHandleSelfs[i].MEASURE

						this.formDataList2 = res.initHandleSelfs[i].initHandleSelfList
						if (res.initHandleSelfs[i].initHandleSelfList.length > 0) {
							this.title1fromList2 = []
							for (let j in res.initHandleSelfs[i].initHandleSelfList) {
								let item = {
									index: j + 1,
									itemList: [{
										type: "selectDIY",
										text: res.initHandleSelfs[i].initHandleSelfList[j].D_NAME,
										title: "自行利用处置废物名称",
										isSingle: true,
										unit: "1"
									}, {
										type: "inputWithUnitSelect",
										text: res.initHandleSelfs[i].initHandleSelfList[j].STORE_YEAR,
										title: "本年度计划利用处置量",
										unit: res.initHandleSelfs[i].initHandleSelfList[j].STORE_PLAN_UNIT
									}, {
										type: "inputWithUnitSelect",
										text: res.initHandleSelfs[i].initHandleSelfList[j].STORE_LAST,
										title: "上年度实际利用处置量",
										unit: res.initHandleSelfs[i].initHandleSelfList[j].STORE_PLAN_UNIT
									}]
								}
								this.title1fromList2.push(item)
							}
						} else {
							this.title1fromList2 = [{
								index: 1,
								itemList: [{
									type: "selectDIY",
									text: "",
									title: "自行利用处置废物名称",
									isSingle: true,
									unit: "1"
								}, {
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
					}
					if(i === 2){
						this.selfDisposalMeasuresData3.equipmentName = res.initHandleSelfs[i].FACILITY_NAME
						this.selfDisposalMeasuresData3.category = res.initHandleSelfs[i].FACILITY_TYPE
						this.selfDisposalMeasuresData3.addr = res.initHandleSelfs[i].FACILITY_ADDRESS
						this.selfDisposalMeasuresData3.amount = parseFloat(res.initHandleSelfs[i].INVEST_SUM)
						this.selfDisposalMeasuresData3.can = res.initHandleSelfs[i].DESIGN
						this.selfDisposalMeasuresData3.years = res.initHandleSelfs[i].DESIGN_TIME
						this.selfDisposalMeasuresData3.startDate = res.initHandleSelfs[i].RUN_TIME
						this.selfDisposalMeasuresData3.price = parseFloat(res.initHandleSelfs[i].RUN_MONEY)
						this.selfDisposalMeasuresData3.mainEquAndNum = res.initHandleSelfs[i].FACILITY_SUM
						this.selfDisposalMeasuresData3.how = res.initHandleSelfs[i].HANDLE_EFFECT

						this.switchInfo3[0].value = res.initHandleSelfs[i].DB_1 ? res.initHandleSelfs[i].DB_1 + "" : '0'
						this.switchInfo3[1].value = res.initHandleSelfs[i].DB_2 ? res.initHandleSelfs[i].DB_2 + "" : '0'
						this.textareaInfo1_3.text = res.initHandleSelfs[i].DESC_CONTENT
						this.textareaInfo2_3.text = res.initHandleSelfs[i].MEASURE

						this.formDataList3 = res.initHandleSelfs[i].initHandleSelfList
						if (res.initHandleSelfs[i].initHandleSelfList.length > 0) {
							this.title1fromList3 = []
							for (let j in res.initHandleSelfs[i].initHandleSelfList) {
								let item = {
									index: j + 1,
									itemList: [{
										type: "selectDIY",
										text: res.initHandleSelfs[i].initHandleSelfList[j].D_NAME,
										title: "自行利用处置废物名称",
										isSingle: true,
										unit: "1"
									}, {
										type: "inputWithUnitSelect",
										text: res.initHandleSelfs[i].initHandleSelfList[j].STORE_YEAR,
										title: "本年度计划利用处置量",
										unit: res.initHandleSelfs[i].initHandleSelfList[j].STORE_PLAN_UNIT
									}, {
										type: "inputWithUnitSelect",
										text: res.initHandleSelfs[i].initHandleSelfList[j].STORE_LAST,
										title: "上年度实际利用处置量",
										unit: res.initHandleSelfs[i].initHandleSelfList[j].STORE_PLAN_UNIT
									}]
								}
								this.title1fromList3.push(item)
							}
						} else {
							this.title1fromList3 = [{
								index: 1,
								itemList: [{
									type: "selectDIY",
									text: "",
									title: "自行利用处置废物名称",
									isSingle: true,
									unit: "1"
								}, {
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
					}
				}
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
				if(this.isFormTwoShow){
					this.$refs['form2'].validate((valid) => {
						if (valid) {
							checkFlag = true
						} else {
							checkFlag = false
						}
					});
				}
				if(this.isFormThreeShow){
					this.$refs['form3'].validate((valid) => {
						if (valid) {
							checkFlag = true
						} else {
							checkFlag = false
						}
					});
				}
				if (!checkFlag) {
					return
				}

				submitData.initHandleSelfs = []
				let itemForm1 = {}
				itemForm1.FACILITY_NAME = this.selfDisposalMeasuresData.equipmentName
				itemForm1.FACILITY_TYPE = this.selfDisposalMeasuresData.category
				itemForm1.FACILITY_ADDRESS = this.selfDisposalMeasuresData.addr
				itemForm1.INVEST_SUM = this.selfDisposalMeasuresData.amount
				itemForm1.INVEST_SUM_UNIT = this.selfDisposalMeasuresData.amountUnit
				itemForm1.RUN_MONEY_UNIT = this.selfDisposalMeasuresData.amountUnit
				itemForm1.DESIGN = this.selfDisposalMeasuresData.can
				itemForm1.DESIGN_TIME = this.selfDisposalMeasuresData.years
				itemForm1.RUN_TIME = this.selfDisposalMeasuresData.startDate
				itemForm1.RUN_MONEY = this.selfDisposalMeasuresData.price
				itemForm1.FACILITY_SUM = this.selfDisposalMeasuresData.mainEquAndNum
				itemForm1.HANDLE_EFFECT = this.selfDisposalMeasuresData.how

				itemForm1.HANDLE_LIST = []
				for (let i in this.title1fromList) {
					let item = {}
					item.D_NAME = this.title1fromList[i].itemList[0].text
					item.STORE_YEAR = this.title1fromList[i].itemList[1].text
					item.STORE_PLAN_UNIT = this.title1fromList[i].itemList[1].unit
					item.STORE_LAST_UNIT = this.title1fromList[i].itemList[1].unit
					item.STORE_LAST = this.title1fromList[i].itemList[2].text

					itemForm1.HANDLE_LIST.push(item)
				}
				itemForm1.DB_1 = this.switchInfo[0].value + ""
				itemForm1.DB_2 = this.switchInfo[1].value + ""
				itemForm1.DESC_CONTENT = this.textareaInfo1.text
				itemForm1.MEASURE = this.textareaInfo2.text


				if(itemForm1.HANDLE_LIST.length === 1){
					let emptyNum = 0
					for (let key in itemForm1.HANDLE_LIST[0]) {
						if (key !== 'STORE_PLAN_UNIT' && key !== 'STORE_LAST_UNIT' && itemForm1.HANDLE_LIST[0][key] !== "") {
							emptyNum++
						}
					}
					if (emptyNum > 0 && emptyNum < 3) {
						this.$notify.error({
							title: '警告',
							message: "请填全表一[危险废物自行利用处置情况]所有内容"
						});
						return
					}else if(emptyNum === 0){
						//增加一个变量证明需要清空数据
						itemForm1.HANDLE_LIST[0].toBeEmpty = "1";
					}
				}else{
					for (let i in itemForm1.HANDLE_LIST) {
						for (let key in itemForm1.HANDLE_LIST[i]) {
							if (itemForm1.HANDLE_LIST[i][key] === "") {
								this.$notify.error({
									title: '警告',
									message: "请填全表一[危险废物自行利用处置情况]所有内容"
								});
								return
							}
						}
					}
				}

				var trimArr = this.unique(itemForm1.HANDLE_LIST,"D_NAME");
				if(itemForm1.HANDLE_LIST.length > 1 && trimArr.length < itemForm1.HANDLE_LIST.length ) {
					this.$notify.error({
						title: '警告',
						message: "表一[贮存危险废物情况]名称不能重复"
					});
					return
				}


				if (itemForm1.DESC_CONTENT === '') {
					this.$notify.error({
						title: '警告',
						message: "请填写表一【危险废物自行利用处置工艺说明】"
					});
					return
				}
				if (itemForm1.MEASURE === '') {
					this.$notify.error({
						title: '警告',
						message: "请填写表一【二次环境污染控制和事故预防措施】"
					});
					return
				}

				submitData.initHandleSelfs.push(itemForm1)

				if(this.isFormTwoShow){
					let itemForm2 = {}
					itemForm2.FACILITY_NAME = this.selfDisposalMeasuresData2.equipmentName
					itemForm2.FACILITY_TYPE = this.selfDisposalMeasuresData2.category
					itemForm2.FACILITY_ADDRESS = this.selfDisposalMeasuresData2.addr
					itemForm2.INVEST_SUM = this.selfDisposalMeasuresData2.amount
					itemForm2.INVEST_SUM_UNIT = this.selfDisposalMeasuresData2.amountUnit
					itemForm2.RUN_MONEY_UNIT = this.selfDisposalMeasuresData2.amountUnit
					itemForm2.DESIGN = this.selfDisposalMeasuresData2.can
					itemForm2.DESIGN_TIME = this.selfDisposalMeasuresData2.years
					itemForm2.RUN_TIME = this.selfDisposalMeasuresData2.startDate
					itemForm2.RUN_MONEY = this.selfDisposalMeasuresData2.price
					itemForm2.FACILITY_SUM = this.selfDisposalMeasuresData2.mainEquAndNum
					itemForm2.HANDLE_EFFECT = this.selfDisposalMeasuresData2.how

					itemForm2.HANDLE_LIST = []
					for (let i in this.title1fromList2) {
						let item = {}
						item.D_NAME = this.title1fromList2[i].itemList[0].text
						item.STORE_YEAR = this.title1fromList2[i].itemList[1].text
						item.STORE_PLAN_UNIT = this.title1fromList2[i].itemList[1].unit
						item.STORE_LAST_UNIT = this.title1fromList2[i].itemList[1].unit
						item.STORE_LAST = this.title1fromList2[i].itemList[2].text

						itemForm2.HANDLE_LIST.push(item)
					}
					itemForm2.DB_1 = this.switchInfo2[0].value + ""
					itemForm2.DB_2 = this.switchInfo2[1].value + ""
					itemForm2.DESC_CONTENT = this.textareaInfo1_2.text
					itemForm2.MEASURE = this.textareaInfo2_2.text


					if(itemForm2.HANDLE_LIST.length === 1){
						let emptyNum = 0
						for (let key in itemForm2.HANDLE_LIST[0]) {
							if (key !== 'STORE_PLAN_UNIT' && key !== 'STORE_LAST_UNIT' && itemForm2.HANDLE_LIST[0][key] !== "") {
								emptyNum++
							}
						}
						if (emptyNum > 0 && emptyNum < 3) {
							this.$notify.error({
								title: '警告',
								message: "请填全表二[危险废物自行利用处置情况]所有内容"
							});
							return
						}else if(emptyNum === 0){
							//增加一个变量证明需要清空数据
							itemForm2.HANDLE_LIST[0].toBeEmpty = "1";
						}
					}else{
						for (let i in itemForm2.HANDLE_LIST) {
							for (let key in itemForm2.HANDLE_LIST[i]) {
								if (itemForm2.HANDLE_LIST[i][key] === "") {
									this.$notify.error({
										title: '警告',
										message: "请填全表二[危险废物自行利用处置情况]所有内容"
									});
									return
								}
							}
						}
					}

					var trimArr = this.unique(itemForm2.HANDLE_LIST,"D_NAME");
					if(itemForm2.HANDLE_LIST.length > 1 && trimArr.length < itemForm2.HANDLE_LIST.length ) {
						this.$notify.error({
							title: '警告',
							message: "表二[贮存危险废物情况]名称不能重复"
						});
						return
					}


					if (itemForm2.DESC_CONTENT === '') {
						this.$notify.error({
							title: '警告',
							message: "请填写表二【危险废物自行利用处置工艺说明】"
						});
						return
					}
					if (itemForm2.MEASURE === '') {
						this.$notify.error({
							title: '警告',
							message: "请填写表二【二次环境污染控制和事故预防措施】"
						});
						return
					}

					submitData.initHandleSelfs.push(itemForm2)
				}
				if(this.isFormThreeShow){
					let itemForm3 = {}
					itemForm3.FACILITY_NAME = this.selfDisposalMeasuresData3.equipmentName
					itemForm3.FACILITY_TYPE = this.selfDisposalMeasuresData3.category
					itemForm3.FACILITY_ADDRESS = this.selfDisposalMeasuresData3.addr
					itemForm3.INVEST_SUM = this.selfDisposalMeasuresData3.amount
					itemForm3.INVEST_SUM_UNIT = this.selfDisposalMeasuresData3.amountUnit
					itemForm3.RUN_MONEY_UNIT = this.selfDisposalMeasuresData3.amountUnit
					itemForm3.DESIGN = this.selfDisposalMeasuresData3.can
					itemForm3.DESIGN_TIME = this.selfDisposalMeasuresData3.years
					itemForm3.RUN_TIME = this.selfDisposalMeasuresData3.startDate
					itemForm3.RUN_MONEY = this.selfDisposalMeasuresData3.price
					itemForm3.FACILITY_SUM = this.selfDisposalMeasuresData3.mainEquAndNum
					itemForm3.HANDLE_EFFECT = this.selfDisposalMeasuresData3.how

					itemForm3.HANDLE_LIST = []
					for (let i in this.title1fromList3) {
						let item = {}
						item.D_NAME = this.title1fromList3[i].itemList[0].text
						item.STORE_YEAR = this.title1fromList3[i].itemList[1].text
						item.STORE_PLAN_UNIT = this.title1fromList3[i].itemList[1].unit
						item.STORE_LAST_UNIT = this.title1fromList3[i].itemList[1].unit
						item.STORE_LAST = this.title1fromList3[i].itemList[2].text

						itemForm3.HANDLE_LIST.push(item)
					}
					itemForm3.DB_1 = this.switchInfo3[0].value + ""
					itemForm3.DB_2 = this.switchInfo3[1].value + ""
					itemForm3.DESC_CONTENT = this.textareaInfo1_3.text
					itemForm3.MEASURE = this.textareaInfo2_3.text


					if(itemForm3.HANDLE_LIST.length === 1){
						let emptyNum = 0
						for (let key in itemForm3.HANDLE_LIST[0]) {
							if (key !== 'STORE_PLAN_UNIT' && key !== 'STORE_LAST_UNIT' && itemForm3.HANDLE_LIST[0][key] !== "") {
								emptyNum++
							}
						}
						if (emptyNum > 0 && emptyNum < 3) {
							this.$notify.error({
								title: '警告',
								message: "请填全表三[危险废物自行利用处置情况]所有内容"
							});
							return
						}else if(emptyNum === 0){
							//增加一个变量证明需要清空数据
							itemForm3.HANDLE_LIST[0].toBeEmpty = "1";
						}
					}else{
						for (let i in itemForm3.HANDLE_LIST) {
							for (let key in itemForm3.HANDLE_LIST[i]) {
								if (itemForm3.HANDLE_LIST[i][key] === "") {
									this.$notify.error({
										title: '警告',
										message: "请填全表三[危险废物自行利用处置情况]所有内容"
									});
									return
								}
							}
						}
					}

					var trimArr = this.unique(itemForm3.HANDLE_LIST,"D_NAME");
					if(itemForm3.HANDLE_LIST.length > 1 && trimArr.length < itemForm3.HANDLE_LIST.length ) {
						this.$notify.error({
							title: '警告',
							message: "表三[贮存危险废物情况]名称不能重复"
						});
						return
					}


					if (itemForm3.DESC_CONTENT === '') {
						this.$notify.error({
							title: '警告',
							message: "请填写表三【危险废物自行利用处置工艺说明】"
						});
						return
					}
					if (itemForm3.MEASURE === '') {
						this.$notify.error({
							title: '警告',
							message: "请填写表三【二次环境污染控制和事故预防措施】"
						});
						return
					}

					submitData.initHandleSelfs.push(itemForm3)
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
				}, {
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
		doReset2 () {
			this.title1fromList2 = [{
				index: 1,
				itemList: [{
					type: "selectDIY",
					text: "",
					title: "自行利用处置废物名称",
					isSingle: true,
					unit: "1"
				}, 
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
		doReset3 () {
			this.title1fromList3 = [{
				index: 1,
				itemList: [{
					type: "selectDIY",
					text: "",
					title: "自行利用处置废物名称",
					isSingle: true,
					unit: "1"
				}, {
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
		formStatusChange2(status){
			this.formStatus2 = status
		},
		formStatusChange3(status){
			this.formStatus3 = status
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
					this.doReset2()
					this.doReset3()
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

					this.selfDisposalMeasuresData2 = {
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
					this.textareaInfo1_2.text = ""
					this.textareaInfo2_2.text = ""
					this.switchInfo2 = [{
						id: "1",
						name: "是否定期监测污染物排放情况",
						value: "0"
					}, {
						id: "2",
						name: "污染物排放达标情况",
						value: "0",
						type: 'reach'
					}]

					this.selfDisposalMeasuresData3 = {
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
					this.textareaInfo1_3.text = ""
					this.textareaInfo2_3.text = ""
					this.switchInfo3 = [{
						id: "1",
						name: "是否定期监测污染物排放情况",
						value: "0"
					}, {
						id: "2",
						name: "污染物排放达标情况",
						value: "0",
						type: 'reach'
					}]
					
					this.isFormTwoShow = false
					this.isFormThreeShow = false

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
.selfDisposalMeasuresAreaBg{
	padding-bottom: 20px;
	border-bottom: 3px solid #13ce66;
	float: left;
}
.sdm_formTitle{
	width: 100%;
	float: left;
	height: 46px;
}
.sdm_formTitleText{
	width: 50%;
	float: left;
	height: 46px;
	line-height: 46px;
	font-size: 20px;
	font-weight: bold;
}
.sdm_formTitleBtn{
	width: 50%;
	float: left;
	text-align: right;
	height: 46px;
	line-height: 46px;
	font-size: 16px;
	color:#13ce66;
}
</style>