<template>
	<div id='transferStuation'>
		<my-aside :userRole="userRole" class="my-aside" :titleInfo="myTitleInfo" @doSubmit="doSubmit"></my-aside>
		<div id="transFerStiationArea">
			<assSwitch :userRole="userRole" title="贮存措施" :switchInfo="switchInfo1"></assSwitch>
			<assTitle :userRole="userRole" :titleInfo="title1" titleType="reset" :formStatus="formStatus1 === 'card' ? '0' : '1'" @doReset="resetInfo1" @formStatusChange="formStatusChange1"></assTitle>
			<assForm v-if="formStatus1 === 'card'" :formList="title1fromList" :type="userRole === 'CSEP' ? '' : 'label'"></assForm>
			<assTable v-else-if="formStatus1 === 'table'" :tableList="formDataList1" :tableTitleList="formDataListTitle1"></assTable>
			<assTitle :userRole="userRole" :titleInfo="title2" titleType="reset" :formStatus="formStatus2 === 'card' ? '0' : '1'" @doReset="resetInfo2" @formStatusChange="formStatusChange2"></assTitle>
			<assForm v-if="formStatus2 === 'card'" :formList="title2fromList" :type="userRole === 'CSEP' ? '' : 'label'" :levelOneData="levelOneData"></assForm>
			<assTable v-else-if="formStatus2 === 'table'" :tableList="formDataList2" :tableTitleList="formDataListTitle2"></assTable>
			<assTitle :userRole="userRole" :titleInfo="title3" titleType="textarea"></assTitle>
			<!-- <assSwitch :userRole="userRole" title="运输措施" :switchInfo="switchInfo2"></assSwitch>
			<el-form ref="form" :model="compInfo" :rules="rules" label-width="80px" class="transferStuationFrom">
				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item label="单位名称" prop="compName">
							<el-input v-if="userRole=== 'CSEP'" v-model="compInfo.compName" placeholder="必填"></el-input>
							<el-row v-else>{{compInfo.compName}}</el-row>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="运输资质" prop="compVal">
							<el-input v-if="userRole=== 'CSEP'" v-model="compInfo.compVal" placeholder="必填"></el-input>
							<el-row v-else>{{compInfo.compVal}}</el-row>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
			<assTitle :userRole="userRole" :titleInfo="title4" titleType="textarea"></assTitle> -->
			<assTitle :userRole="userRole" :titleInfo="title4" titleType="reset" @doReset="resetInfo3"></assTitle>
			<assTransferFrom :userRole="userRole" :formList="transferFromList" :compList="compList"></assTransferFrom>
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
import assTable from '../../common/assTable.vue'
import assTransferFrom from '../../common/assTransferFrom.vue'
import { checkBrowser, getQueryString } from '../../utils/browserCheck.js'
import fetch from '../../utils/fetch.js'
export default {
	name: 'transferStuation',
	data () {
		return {
			myTitleInfo: {
				title: "危险废物转移情况",
				textInfoList: [
					"贮存措施：废物收集、贮存相关环保制度的执行情概况，根据实际情况勾选，同时填写废物的贮存设施现状及贮存情况，贮存方面的相关要求，如数量。面积以及采取的污染防治措施；",
					"运输措施：废物运输过程中相关环保制度的执行情况，根据实际情概况勾选，同时填写废物运输过程中采取的污染防治措施；",
					"转移计划：危险废物数量、种类；拟接收危险废物的经营单位的资质和经营范围等。",
					"拟贮存量: 当年计划贮存量",
					"上年度贮存量: 截止上一年12月31日为止库房里的贮存量",
					"截止上年度年底累计贮存量: 上一年度，库房累计贮存量"
				]
			},
			userRole: '',
			queryJson: {},
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
				title: "运输措施",
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
					title: "设施名称",
					limit: "16"
				}, {
					type: "inputWithUnit",
					text: "",
					title: "数量",
					unit: "个"
				}, {
					type: "inputWithUnitSelect",
					text: "",
					title: "贮存能力",
					unit: ""
				}, {
					type: "select",
					text: "",
					title: "单位"
				}, {
					type: "input",
					text: "",
					title: "类型",
					limit: "16"
				}, {
					type: "inputWithUnit",
					text: "",
					title: "面积",
					unit: "平方米"
				}]
			}],
			title2fromList: [{ 
				index: 1,
				itemList: [{
					type: "selectLevelText",
					title1: "名称",
					text2: "",
					title2: "类别",
					unit: ""
				}, 
				// {
				// 	type: "select",
				// 	text: "",
				// 	title: "单位",
				// }, 
				{
					type: "inputWithUnitSelect",
					text: "",
					title: "拟贮存量",
					unit: ""
				}, {
					type: "inputWithUnitSelect",
					text: "",
					title: "上年度贮存量",
					unit: ""
				}, {
					type: "inputWithUnitSelect",
					text: "",
					title: "截止上年度年底累计贮存量",
					unit: ""
				}, {
					type: "input",
					text: "",
					title: "贮存原因",
					limit: "250"
				}]
			}],
			switchInfo1: [{
				id: "1",
				name: "贮存场所是否符合《危险废物贮存污染控制标准》有关要求",
				value: "0"
			}, {
				id: "2",
				name: "是否按危险废物特性分类收集、贮存",
				value: "0"
			}, {
				id: "3",
				name: "是否混合贮存未经安全性处置且性质不相容的危险废物",
				value: "0"
			}, {
				id: "4",
				name: "是否将危险废物混入非危险废物中贮存",
				value: "0"
			}, {
				id: "5",
				name: "是否通过建设项目环境影响评价审批及竣工环境保护验收",
				value: "0"
			}],
			// switchInfo2: [{
			// 	id: "1",
			// 	name: "运输过程中是否遵守危险货物运输管理的规定",
			// 	value: ""
			// }, {
			// 	id: "2",
			// 	name: "是否按危险废物特性分类运输",
			// 	value: ""
			// }, {
			// 	id: "3",
			// 	name: "是否委托运输",
			// 	value: ""
			// }],
			// compInfo: {
			// 	compName: "",
			// 	compVal: ""
			// },
			levelOneData: [],
			transferFromList: [{
				index: "1",
				itemList: [{
					switchValue1: "0",
					switchValue2: "0",
					switchValue3: "0",
					compName: "",
					compId: "",
					compVal: "",
					textarea: ""
				}]
			}],
			compList: [],
			formStatus1: 'card',
			formStatus2: 'card',
			formDataList1: [],
			formDataList2: [],
			formDataListTitle1: [{ 
				title: '设施名称',
				key: 'NAME'
			}, {
				title: '数量(个)',
				key: 'NUM'
			}, {
				title: '贮存能力',
				key: 'STORE'
			}, {
				title: '单位',
				key: 'UNIT'
			}, {
				title: '类型',
				key: 'TYPE'
			}, {
				title: '面积(平方米)',
				key: 'AREA'
			}],
			formDataListTitle2: [{     
				title: '名称',
				key: 'D_NAME'
			}, {
				title: '类别',
				key: 'BIG_CATEGORY_NAME'
			}, {
				title: '拟贮存量',
				key: 'STORE_PLAN'
			}, {
				title: '上年度贮存量',
				key: 'STORE_LAST'
			}, {
				title: '截止上年度年底累计贮存量',
				key: 'STORE_LASTSUM'
			}, {
				title: '单位',
				key: 'STORE_PLAN_UNIT'
			}, {
				title: '贮存原因',
				key: 'STORE_REASON'
			}],
		}
	},
	components: {
		'my-aside': Aside,
		'assTitle': assTitle,
		'assForm': assForm,
		'assSwitch': assSwitch,
		'assTransferFrom': assTransferFrom,
		'assTable': assTable
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
			this.$router.push({ path: '/pageIncompatible' })
		})
		this.queryJson = getQueryString()

		this.formStatus1 = 'card'
		this.formStatus2 = 'card'

		fetch({
			url: '/plan/initTransfer',
			method: 'POST',
			data: 'params=' + JSON.stringify(this.queryJson)
		}).then(res => {

			// let res = {
			// 	"WJWT": "czlEcjhPMjRXelI5LzQrVE5JS1hiYjR6dGFhL3V2Y3dVR01JVXVhOVluRT0=",
			// 	"initProductFacility": [{
			// 		"UNIT": "个",
			// 		"NAME": "11",
			// 		"AREA_UNIT": "平方米",
			// 		"AREA": "11",
			// 		"ID": "1",
			// 		"NUM_UNIT": "个",
			// 		"TP_ID": "TP201810020531260014",
			// 		"NUM": "11",
			// 		"STORE": "22",
			// 		"TYPE": "22"
			// 	}],
			// 	"operatorId": "",
			// 	"initProductYs": [{
			// 		"EN_NAME_YS": "11",
			// 		"EN_ID_YS": null,
			// 		"YS_PROCESS": "321",
			// 		"ID": "1",
			// 		"TP_ID": "TP201810020531260014",
			// 		"YS_2": 1,
			// 		"YS_ZZ": "123",
			// 		"YS_1": 0,
			// 		"YS_3": 0
			// 	}, {
			// 		"EN_NAME_YS": "fda",
			// 		"EN_ID_YS": null,
			// 		"YS_PROCESS": "fdsa",
			// 		"ID": "2",
			// 		"TP_ID": "TP201810020531260014",
			// 		"YS_2": 1,
			// 		"YS_ZZ": "111",
			// 		"YS_1": 1,
			// 		"YS_3": 0
			// 	}],
			// 	"empId": "",
			// 	"userType": "CSEP",
			// 	"newGuideFlag": "",
			// 	"belongQ": "",
			// 	"belongS": "",
			// 	"nickName": "天津合佳威立雅环境服务有限公司",
			// 	"orgCode": "",
			// 	"userId": "EP201410280910450012",
			// 	"userName": "",
			// 	"initEPys": [{
			// 		"EP_NAME": "天津市龙汉达物流有限公司",
			// 		"EP_ID": "EP201410280826300007"
			// 	}, {
			// 		"EP_NAME": "天津壹鸣环境工程有限公司",
			// 		"EP_ID": "EP201410280833480008"
			// 	}, {
			// 		"EP_NAME": "天津合佳威立雅环境服务有限公司",
			// 		"EP_ID": "EP201410280910450012"
			// 	}, {
			// 		"EP_NAME": "天津佛强再生资源环保科技有限公司",
			// 		"EP_ID": "EP201410280912430013"
			// 	}, {
			// 		"EP_NAME": "沧州市利达运输队（天津市海丰化工有限公司）",
			// 		"EP_ID": "EP201410281234460033"
			// 	}, {
			// 		"EP_NAME": "天津市中一国际货运代理有限公司",
			// 		"EP_ID": "EP201410281453080045"
			// 	}, {
			// 		"EP_NAME": "唐山汉沽东方特种货物运输有限公司（天津东邦铅协议）",
			// 		"EP_ID": "EP201410281459210046"
			// 	}, {
			// 		"EP_NAME": "盐山县东方运输队（天津市海丰化工有限公司）",
			// 		"EP_ID": "EP201410281556500050"
			// 	}, {
			// 		"EP_NAME": "天津市塘沽危险品运输场",
			// 		"EP_ID": "EP201410281953030058"
			// 	}, {
			// 		"EP_NAME": "津交二运",
			// 		"EP_ID": "EP201410290939020062"
			// 	}, {
			// 		"EP_NAME": "天津开发区安远物流有限公司",
			// 		"EP_ID": "EP201410291415340076"
			// 	}, {
			// 		"EP_NAME": "天津港琪物流有限公司",
			// 		"EP_ID": "EP201410301510200117"
			// 	}, {
			// 		"EP_NAME": "天津市塘沽危险品运输有限公司（禹通物流）",
			// 		"EP_ID": "EP201410311049020128"
			// 	}, {
			// 		"EP_NAME": "南皮县骏捷物流有限公司（合佳威立雅运输商）",
			// 		"EP_ID": "EP201410311215130132"
			// 	}, {
			// 		"EP_NAME": "江西安泰物流有限公司（合佳威立雅运输商）",
			// 		"EP_ID": "EP201410311219360133"
			// 	}, {
			// 		"EP_NAME": "东光县英华汽车销售有限公司（环通协议）",
			// 		"EP_ID": "EP201411021317210148"
			// 	}, {
			// 		"EP_NAME": "天津滨海合佳威立雅环境服务有限公司",
			// 		"EP_ID": "EP201411031103580169"
			// 	}, {
			// 		"EP_NAME": "天津市东建物流有限公司",
			// 		"EP_ID": "EP201411040956130193"
			// 	}, {
			// 		"EP_NAME": "天津市永兴运输场",
			// 		"EP_ID": "EP201411041029570196"
			// 	}, {
			// 		"EP_NAME": "天津金宏立运输有限公司",
			// 		"EP_ID": "EP201411041352150202"
			// 	}, {
			// 		"EP_NAME": "沧州市新华区利达运输队（合佳威立雅运输商）",
			// 		"EP_ID": "EP201411051447110218"
			// 	}, {
			// 		"EP_NAME": "天津市伟达储运有限公司",
			// 		"EP_ID": "EP201411061622300229"
			// 	}, {
			// 		"EP_NAME": "黄骅市隆达运输队（海澜协议）",
			// 		"EP_ID": "EP201411181126200285"
			// 	}, {
			// 		"EP_NAME": "沧州临港方政运输队（海澜协议）",
			// 		"EP_ID": "EP201411181137460286"
			// 	}, {
			// 		"EP_NAME": "东光县英华汽车销售有限公司临港分公司（环通协议）",
			// 		"EP_ID": "EP201411261857310314"
			// 	}, {
			// 		"EP_NAME": "天津市和平危险品运输有限公司",
			// 		"EP_ID": "EP201412081843020336"
			// 	}, {
			// 		"EP_NAME": "沧州市南大港管理区运达物流有限公司（仁新协议）",
			// 		"EP_ID": "EP201412151630120349"
			// 	}, {
			// 		"EP_NAME": "青县通诚汽车运输有限公司（合佳威立雅运输商）",
			// 		"EP_ID": "EP201412221052070364"
			// 	}, {
			// 		"EP_NAME": "场内运输",
			// 		"EP_ID": "EP2015001"
			// 	}, {
			// 		"EP_NAME": "管道运输",
			// 		"EP_ID": "EP2015002"
			// 	}, {
			// 		"EP_NAME": "公用仓库",
			// 		"EP_ID": "EP2015003"
			// 	}, {
			// 		"EP_NAME": "河北世嘉伟业物流有限公司（合佳威立雅运输商）",
			// 		"EP_ID": "EP201501050906350382"
			// 	}, {
			// 		"EP_NAME": "天津市泰瑞鑫国际物流有限公司",
			// 		"EP_ID": "EP201501211621150403"
			// 	}, {
			// 		"EP_NAME": "江西安泰物流有限公司(泰鼎)",
			// 		"EP_ID": "EP201502051605470430"
			// 	}, {
			// 		"EP_NAME": "天津恒致达物流有限公司",
			// 		"EP_ID": "EP201502281431230450"
			// 	}, {
			// 		"EP_NAME": "天津大港油田运输有限责任公司",
			// 		"EP_ID": "EP201503031123430453"
			// 	}, {
			// 		"EP_NAME": "大城县供销社运输公司危险物品运输队（昱隆泰协议）",
			// 		"EP_ID": "EP201503031504110454"
			// 	}, {
			// 		"EP_NAME": "天津壹鸣环境科技股份有限公司",
			// 		"EP_ID": "EP201505151246570569"
			// 	}, {
			// 		"EP_NAME": "沧州临港赫阳运输有限公司（友信协议）",
			// 		"EP_ID": "EP201505181621390576"
			// 	}, {
			// 		"EP_NAME": "黄骅市交通货运服务中心（友信协议）",
			// 		"EP_ID": "EP201505251518030602"
			// 	}, {
			// 		"EP_NAME": "沧州临港宏泰运输队（友信协议）",
			// 		"EP_ID": "EP201505251520340603"
			// 	}, {
			// 		"EP_NAME": "天津瀚洋汇和环保科技有限公司",
			// 		"EP_ID": "EP201505291554270613"
			// 	}, {
			// 		"EP_NAME": "沧州市新华区利达运输队（环通协议）",
			// 		"EP_ID": "EP201506252312470751"
			// 	}, {
			// 		"EP_NAME": "天津创锦真空涂装制品有限公司",
			// 		"EP_ID": "EP201507140922331009"
			// 	}, {
			// 		"EP_NAME": "黄骅市隆达运输队（江源协议）",
			// 		"EP_ID": "EP201507210854241085"
			// 	}, {
			// 		"EP_NAME": "沧县天源汽车运输队（海澜协议）",
			// 		"EP_ID": "EP201507310947151185"
			// 	}, {
			// 		"EP_NAME": "天津天山国际货运有限公司",
			// 		"EP_ID": "EP201507311144361191"
			// 	}, {
			// 		"EP_NAME": "天津市鑫来化工有限公司",
			// 		"EP_ID": "EP201508111726081271"
			// 	}, {
			// 		"EP_NAME": "利安隆博华（天津）医药化学有限公司",
			// 		"EP_ID": "EP201508141038071310"
			// 	}, {
			// 		"EP_NAME": "天津市广捷物流有限公司",
			// 		"EP_ID": "EP201508210851041390"
			// 	}, {
			// 		"EP_NAME": "天津市双狮涂料有限公司",
			// 		"EP_ID": "EP201508251353151440"
			// 	}, {
			// 		"EP_NAME": "天津市博丰海信运输有限公司",
			// 		"EP_ID": "EP201509060934491546"
			// 	}, {
			// 		"EP_NAME": "唐山汉沽东方特种货物运输有限公司（友信协议）",
			// 		"EP_ID": "EP201509220953301746"
			// 	}, {
			// 		"EP_NAME": "天津开发区通华国际货运代理有限公司",
			// 		"EP_ID": "EP201509300819171803"
			// 	}, {
			// 		"EP_NAME": "天津市祥源盛自行车配件有限公司",
			// 		"EP_ID": "EP201510101504241835"
			// 	}, {
			// 		"EP_NAME": "天津津交二运物流有限公司",
			// 		"EP_ID": "EP201510280815371992"
			// 	}, {
			// 		"EP_NAME": "沧州临港方政运输队（江源协议）",
			// 		"EP_ID": "EP201601061531522487"
			// 	}, {
			// 		"EP_NAME": "天津市万路丰道路运输有限公司",
			// 		"EP_ID": "EP201603021801332651"
			// 	}, {
			// 		"EP_NAME": "黄骅市东达运输有限公司（合佳威立雅运输商）",
			// 		"EP_ID": "EP201603111614452688"
			// 	}, {
			// 		"EP_NAME": "北京市通县永升化工厂（昱隆泰协议）",
			// 		"EP_ID": "EP201603301329372762"
			// 	}, {
			// 		"EP_NAME": "天津市天润运输有限公司",
			// 		"EP_ID": "EP201604191439232840"
			// 	}, {
			// 		"EP_NAME": "沧州临港赫阳运输有限公司（江源协议）",
			// 		"EP_ID": "EP201605161538542937"
			// 	}, {
			// 		"EP_NAME": "天津市龙盛汽车配件有限公司",
			// 		"EP_ID": "EP201606141610003031"
			// 	}, {
			// 		"EP_NAME": "黄骅市六通运输队（天津市海丰化工有限公司）",
			// 		"EP_ID": "EP201606251054163072"
			// 	}, {
			// 		"EP_NAME": "天津市广会通物流有限公司",
			// 		"EP_ID": "EP201606301335533088"
			// 	}, {
			// 		"EP_NAME": "沧州临港鹏达运输队（腾源协议）",
			// 		"EP_ID": "EP201607070903033110"
			// 	}, {
			// 		"EP_NAME": "黄骅市隆达运输队（腾源协议）",
			// 		"EP_ID": "EP201607071055583111"
			// 	}, {
			// 		"EP_NAME": "天津德利得供应链管理股份有限公司",
			// 		"EP_ID": "EP201609070950073254"
			// 	}, {
			// 		"EP_NAME": "东光县英华汽车销售有限公司（腾源协议）",
			// 		"EP_ID": "EP201609181048113284"
			// 	}, {
			// 		"EP_NAME": "黄骅市前进运输队（腾源协议）",
			// 		"EP_ID": "EP201609190801213287"
			// 	}, {
			// 		"EP_NAME": "沧州临港宏泰运输队（腾源协议）",
			// 		"EP_ID": "EP201609190802523288"
			// 	}, {
			// 		"EP_NAME": "天津华庆百胜运输有限公司",
			// 		"EP_ID": "EP201609241559513310"
			// 	}, {
			// 		"EP_NAME": "沧州临港昌骅运输队（腾源协议）",
			// 		"EP_ID": "EP201610011001303337"
			// 	}, {
			// 		"EP_NAME": "黄骅市德盛运输有限公司（腾源协议）",
			// 		"EP_ID": "EP201610111317193364"
			// 	}, {
			// 		"EP_NAME": "天津兴百物流有限公司",
			// 		"EP_ID": "EP201611020907063414"
			// 	}, {
			// 		"EP_NAME": "天津市万通胜运输有限公司",
			// 		"EP_ID": "EP201611111358513447"
			// 	}, {
			// 		"EP_NAME": "沧州澳太运输有限公司",
			// 		"EP_ID": "EP201612121303343568"
			// 	}, {
			// 		"EP_NAME": "河北郑明物流有限公司",
			// 		"EP_ID": "EP201612131311343572"
			// 	}, {
			// 		"EP_NAME": "大城县供销社运输公司危险物品运输队（腾源协议）",
			// 		"EP_ID": "EP201612281057553613"
			// 	}, {
			// 		"EP_NAME": "黄骅市泰安运输有限公司",
			// 		"EP_ID": "EP201702171323503679"
			// 	}, {
			// 		"EP_NAME": "沧州市南大港管理区泰星运输有限公司（合佳威立雅运输商）",
			// 		"EP_ID": "EP201702281349383713"
			// 	}],
			// 	"sepaName": "津南区",
			// 	"status": "",
			// 	"ifLogin": "0",
			// 	"ROLEID": "CSEP",
			// 	"initTransfer": {
			// 		"CC_2": 1,
			// 		"CC_1": 0,
			// 		"CC_5": 0,
			// 		"sysdate": 1538960430343,
			// 		"CC_4": 0,
			// 		"CC_3": 1,
			// 		"TP_ID": "TP201810020531260014",
			// 		"STATUS": "00",
			// 		"CC_PROCESS": "多少啊"
			// 	},
			// 	"epName": "天津合佳威立雅环境服务有限公司",
			// 	"epId": "EP201410280910450012",
			// 	"belongSepa": "JNQ",
			// 	"userPortrait": "",
			// 	"initOverviewList": [{
			// 		"BIG_CATEGORY_NAME": "医疗废物",
			// 		"UNIT": "吨",
			// 		"W_NAME": "11",
			// 		"SOURCE_PROCESS": "11",
			// 		"SAMLL_CATEGORY_ID": "831-003-01",
			// 		"TP_ID": "TP201810020531260014",
			// 		"YEAR_NUM": "22",
			// 		"BIG_CATEGORY_ID": "HW01",
			// 		"W_SHAPE": "11",
			// 		"LAST_NUM": "11",
			// 		"SAMLL_CATEGORY_NAME": "病理性废物",
			// 		"ID": "1",
			// 		"D_NAME": "11",
			// 		"CHARACTER": "11"
			// 	}, {
			// 		"BIG_CATEGORY_NAME": "木材防腐剂废物",
			// 		"UNIT": "个",
			// 		"W_NAME": "11",
			// 		"SOURCE_PROCESS": "22",
			// 		"SAMLL_CATEGORY_ID": "266-003-05",
			// 		"TP_ID": "TP201810020531260014",
			// 		"YEAR_NUM": "22",
			// 		"BIG_CATEGORY_ID": "HW05",
			// 		"W_SHAPE": "22",
			// 		"LAST_NUM": "22",
			// 		"SAMLL_CATEGORY_NAME": "木材防腐化学品生产配制产生的废弃产品及过期原料",
			// 		"ID": "2",
			// 		"D_NAME": "22",
			// 		"CHARACTER": "11"
			// 	}],
			// 	"IWBSESSION": "BROWSER-20181008091641",
			// 	"realName": "",
			// 	"contextPath": "",
			// 	"initProductCc": [{
			// 		"STORE_LAST_UNIT": "个",
			// 		"BIG_CATEGORY_NAME": null,
			// 		"STORE_REASON": "11",
			// 		"STORE_LAST": "22",
			// 		"ID": "1",
			// 		"D_NAME": "11",
			// 		"STORE_LASTSUM": "22",
			// 		"TP_ID": "TP201810020531260014",
			// 		"STORE_LASTSUM_UNIT": "个",
			// 		"STORE_PLAN_UNIT": "个",
			// 		"STORE_PLAN": "11",
			// 		"BIG_CATEGORY_ID": "HW01"
			// 	}],
			// 	"orgSeq": ""
			// }

			this.userRole = res.userType

			this.compList = []
			for (let i in res.initEPys) {
				let item = {}
				item.label = res.initEPys[i].EP_NAME
				item.value = res.initEPys[i].EP_ID
				this.compList.push(item)
			}

			this.switchInfo1[0].value = res.initTransfer && res.initTransfer.CC_1 ? res.initTransfer.CC_1 + "" : '0'
			this.switchInfo1[1].value = res.initTransfer && res.initTransfer.CC_2 ? res.initTransfer.CC_2 + "" : '0'
			this.switchInfo1[2].value = res.initTransfer && res.initTransfer.CC_3 ? res.initTransfer.CC_3 + "" : '0'
			this.switchInfo1[3].value = res.initTransfer && res.initTransfer.CC_4 ? res.initTransfer.CC_4 + "" : '0'
			this.switchInfo1[4].value = res.initTransfer && res.initTransfer.CC_5 ? res.initTransfer.CC_5 + "" : '0'

			this.formDataList1 = res.initProductFacility
			if (res.initProductFacility.length > 0) {
				this.title1fromList = []
				for (let i in res.initProductFacility) {
					let item = {
						index: i + 1,
						itemList: [{
							type: "input",
							text: res.initProductFacility[i].NAME,
							title: "设施名称",
							limit: "16"
						}, {
							type: "inputWithUnit",
							text: res.initProductFacility[i].NUM,
							title: "数量",
							unit: "个"
						}, {
							type: "inputWithUnitSelect",
							text: res.initProductFacility[i].STORE,
							title: "贮存能力",
							unit: res.initProductFacility[i].UNIT
						}, {
							type: "select",
							text: res.initProductFacility[i].UNIT,
							title: "单位"
						}, {
							type: "input",
							text: res.initProductFacility[i].TYPE,
							title: "类型",
							limit: "16"
						}, {
							type: "inputWithUnit",
							text: res.initProductFacility[i].AREA,
							title: "面积",
							unit: "平方米"
						}]
					}
					this.title1fromList.push(item)
				}
			} else {
				this.title1fromList = [{
					index: 1,
					itemList: [{
						type: "input",
						text: "",
						title: "设施名称",
						limit: "16"
					}, {
						type: "inputWithUnit",
						text: "",
						title: "数量",
						unit: "个"
					}, {
						type: "inputWithUnitSelect",
						text: "",
						title: "贮存能力",
						unit: ""
					}, {
						type: "select",
						text: "",
						title: "单位"
					}, {
						type: "input",
						text: "",
						title: "类型",
						limit: "16"
					}, {
						type: "inputWithUnit",
						text: "",
						title: "面积",
						unit: "平方米"
					}]
				}]
			}
			this.levelOneData = []
			for (let i in res.initOverviewList) {
				let item = {}
				item.value = res.initOverviewList[i].D_NAME
				item.label = res.initOverviewList[i].D_NAME
				item.category = res.initOverviewList[i].BIG_CATEGORY_ID
				item.UNIT = res.initOverviewList[i].UNIT
				this.levelOneData.push(item)
			}

			this.formDataList2 = res.initProductCc
			if (res.initProductCc.length > 0) {
				this.title2fromList = []
				for (let i in res.initProductCc) {
					let item = {
						index: i + 1,
						itemList: [{
							type: "selectLevelText",
							text1: res.initProductCc[i].D_NAME,
							title1: "名称",
							text2: res.initProductCc[i].BIG_CATEGORY_ID,
							title2: "类别",
							unit: res.initProductCc[i].STORE_PLAN_UNIT
						}
						// , {
						// 	type: "select",
						// 	text: res.initProductCc[i].STORE_PLAN_UNIT,
						// 	title: "单位",
						// }
						, {
							type: "inputWithUnitSelect",
							text: res.initProductCc[i].STORE_PLAN,
							title: "拟贮存量",
							unit: res.initProductCc[i].STORE_PLAN_UNIT
						}, {
							type: "inputWithUnitSelect",
							text: res.initProductCc[i].STORE_LAST,
							title: "上年度贮存量",
							unit: res.initProductCc[i].STORE_PLAN_UNIT
						}, {
							type: "inputWithUnitSelect",
							text: res.initProductCc[i].STORE_LASTSUM,
							title: "截止上年度年底累计贮存量",
							unit: res.initProductCc[i].STORE_PLAN_UNIT
						}, {
							type: "input",
							text: res.initProductCc[i].STORE_REASON,
							title: "贮存原因",
							limit: "250"
						}]
					}
					this.title2fromList.push(item)
				}
			} else {
				this.title2fromList = [{
					index: 1,
					itemList: [{
						type: "selectLevelText",
						text1: "",
						title1: "名称",
						text2: "",
						title2: "类别",
						unit: ""
					}, 
					// {
					// 	type: "select",
					// 	text: "",
					// 	title: "单位",
					// }, 
					{
						type: "inputWithUnitSelect",
						text: "",
						title: "拟贮存量",
						unit: ""
					}, {
						type: "inputWithUnitSelect",
						text: "",
						title: "上年度贮存量",
						unit: ""
					}, {
						type: "inputWithUnitSelect",
						text: "",
						title: "截止上年度年底累计贮存量",
						unit: ""
					}, {
						type: "input",
						text: "",
						title: "贮存原因",
						limit: "250"
					}]
				}]
			}
			this.title3.text = res.initTransfer.CC_PROCESS

			if (res.initProductYs.length > 0) {
				this.transferFromList = []
				for (let i in res.initProductYs) {
					let item = {
						index: i + 1,
						switchValue1: res.initProductYs[i].YS_1 ? res.initProductYs[i].YS_1 + "" : "0",
						switchValue2: res.initProductYs[i].YS_2 ? res.initProductYs[i].YS_2 + "" : "0",
						switchValue3: res.initProductYs[i].YS_3 ? res.initProductYs[i].YS_3 + "" : "0",
						compName: res.initProductYs[i].EN_NAME_YS,
						compId: res.initProductYs[i].EN_ID_YS,
						compVal: res.initProductYs[i].YS_ZZ,
						textarea: res.initProductYs[i].YS_PROCESS
					}
					this.transferFromList.push(item)
				}
				// this.switchInfo2[0].value = res.initProductYs[0].YS_1 ? res.initProductYs[0].YS_1 + "" : "0"
				// this.switchInfo2[1].value = res.initProductYs[0].YS_2 ? res.initProductYs[0].YS_2 + "" : "0"
				// this.switchInfo2[2].value = res.initProductYs[0].YS_3 ? res.initProductYs[0].YS_3 + "" : "0"
				// this.compInfo.compName = res.initProductYs[0].EN_NAME_YS
				// this.compInfo.compVal = res.initProductYs[0].YS_ZZ
				// this.title4.text = res.initProductYs[0].YS_PROCESS

			} else {
				this.transferFromList = [{
					index: "1",
					switchValue1: "0",
					switchValue2: "0",
					switchValue3: "0",
					compName: "",
					compId: "",
					compVal: "",
					textarea: ""
				}]
			}

		})

	},
	methods: {
		doSubmit () {
			let submitData = {}
			submitData.TP_ID = this.queryJson.TP_ID
			for (let key in this.queryJson) {
				submitData[key] = this.queryJson[key]
			}
			submitData.CC_1 = this.switchInfo1[0].value + ""
			submitData.CC_2 = this.switchInfo1[1].value + ""
			submitData.CC_3 = this.switchInfo1[2].value + ""
			submitData.CC_4 = this.switchInfo1[3].value + ""
			submitData.CC_5 = this.switchInfo1[4].value + ""
			submitData.CC_PROCESS = this.title3.text

			submitData.TRANSFER_YS = []
			for (let i in this.transferFromList) {
				let transItem = {}
				transItem.YS_1 = this.transferFromList[i].switchValue1 + ""
				transItem.YS_2 = this.transferFromList[i].switchValue2 + ""
				transItem.YS_3 = this.transferFromList[i].switchValue3 + ""
				transItem.EN_NAME_YS = this.transferFromList[i].compName
				transItem.EN_ID_YS = this.transferFromList[i].compId
				transItem.YS_ZZ = this.transferFromList[i].compVal
				transItem.YS_PROCESS = this.transferFromList[i].textarea
				submitData.TRANSFER_YS.push(transItem)
			}

			submitData.TRANSFER_FACILITY = []
			for (let i in this.title1fromList) {
				let item = {}
				item.NAME = this.title1fromList[i].itemList[0].text
				item.NUM = this.title1fromList[i].itemList[1].text
				item.NUM_UNIT = "个"
				item.STORE = this.title1fromList[i].itemList[2].text
				item.UNIT = this.title1fromList[i].itemList[3].text
				item.TYPE = this.title1fromList[i].itemList[4].text
				item.AREA = this.title1fromList[i].itemList[5].text
				item.AREA_UNIT = "平方米"


				submitData.TRANSFER_FACILITY.push(item)
			}

			submitData.TRANSFER_CC = []
			for (let i in this.title2fromList) {
				let item = {}
				item.D_NAME = this.title2fromList[i].itemList[0].text1
				item.BIG_CATEGORY_ID = this.title2fromList[i].itemList[0].text2
				item.STORE_PLAN_UNIT = this.title2fromList[i].itemList[0].unit
				item.STORE_LAST_UNIT = this.title2fromList[i].itemList[0].unit
				item.STORE_LASTSUM_UNIT = this.title2fromList[i].itemList[0].unit
				item.STORE_PLAN = this.title2fromList[i].itemList[1].text
				item.STORE_LAST = this.title2fromList[i].itemList[2].text
				item.STORE_LASTSUM = this.title2fromList[i].itemList[3].text
				item.STORE_REASON = this.title2fromList[i].itemList[4].text

				submitData.TRANSFER_CC.push(item)
			}

			for (let i in submitData.TRANSFER_FACILITY) {
				for (let key in submitData.TRANSFER_FACILITY[i]) {
					if (submitData.TRANSFER_FACILITY[i][key] === "") {
						this.$notify.error({
							title: '警告',
							message: "请填全[危险废物贮存设施现状]所有内容"
						});
						return
					}
				}
			}
			for (let i in submitData.TRANSFER_CC) {
				for (let key in submitData.TRANSFER_CC[i]) {
					if (submitData.TRANSFER_CC[i][key] === "") {
						this.$notify.error({
							title: '警告',
							message: "请填全[贮存危险废物情况]所有内容"
						});
						return
					}
				}
			}
			var trimArr = this.unique(submitData.TRANSFER_CC,"D_NAME");
			if(submitData.TRANSFER_CC.length > 1 && trimArr.length < submitData.TRANSFER_CC.length ) {
				this.$notify.error({
					title: '警告',
					message: "[贮存危险废物情况]名称不能重复"
				});
				return
			}
			// let checkFlag = false
			// this.$refs['form'].validate((valid) => {
			// 	if (valid) {
			// 		checkFlag = true
			// 	} else {
			// 		checkFlag = false
			// 	}
			// });
			// if (!checkFlag) {
			// 	return
			// }

			for (let i in submitData.TRANSFER_YS) {
				if (submitData.TRANSFER_YS[i].EN_NAME_YS === '' || submitData.TRANSFER_YS[i].YS_ZZ === '' || submitData.TRANSFER_YS[i].YS_PROCESS === '') {
					this.$notify.error({
						title: '警告',
						message: "请填全[运输措施]所有内容"
					});
					return
				}
			}
			if (submitData.CC_PROCESS === '') {
				this.$notify.error({
					title: '警告',
					message: "请填写贮存过程中采取的污染防治和事故预防措施"
				});
				return
			}
			// if (this.title4.text === '') {
			// 	this.$notify.error({
			// 		title: '警告',
			// 		message: "请填写运输过程中采取的污染防治措施"
			// 	});
			// 	return
			// }

			const loading = this.$loading({
				lock: true,
				text: 'Loading',
				spinner: 'el-icon-loading',
				background: 'rgba(0, 0, 0, 0.3)'
			});
			fetch({
				url: '/plan/saveTransfer',
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
		resetInfo1 () {
			this.title1fromList = [{
				index: 1,
				itemList: [{
					type: "input",
					text: "",
					title: "设施名称",
					limit: "16"
				}, {
					type: "inputWithUnit",
					text: "",
					title: "数量",
					unit: "个"
				}, {
					type: "inputWithUnitSelect",
					text: "",
					title: "贮存能力",
					unit: ""
				}, {
					type: "select",
					text: "",
					title: "单位"
				}, {
					type: "input",
					text: "",
					title: "类型",
					limit: "16"
				}, {
					type: "inputWithUnit",
					text: "",
					title: "面积",
					unit: "平方米"
				}]
			}]
		},
		resetInfo2 () {
			this.title2fromList = [{
				index: 1,
				itemList: [{
					type: "selectLevelText",
					text1: "",
					title1: "名称",
					text2: "",
					title2: "类别",
					unit: ""
				}, 
				// {
				// 	type: "select",
				// 	text: "",
				// 	title: "单位",
				// }, 
				{
					type: "inputWithUnitSelect",
					text: "",
					title: "拟贮存量",
					unit: ""
				}, {
					type: "inputWithUnitSelect",
					text: "",
					title: "上年度贮存量",
					unit: ""
				}, {
					type: "inputWithUnitSelect",
					text: "",
					title: "截止上年度年底累计贮存量",
					unit: ""
				}, {
					type: "input",
					text: "",
					title: "贮存原因",
					limit: "250"
				}]
			}]
		},
		resetInfo3 () {
			this.transferFromList = [{
				index: "1",
				switchValue1: "0",
				switchValue2: "0",
				switchValue3: "0",
				compName: "",
				compId: "",
				compVal: "",
				textarea: ""
			}]
		},
		formStatusChange1 (status) {
			this.formStatus1 = status
		},
		formStatusChange2 (status) {
			this.formStatus2 = status
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
<style scoped>
#transferStuation {
  display: -webkit-flex; /* Safari */
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  /*align-items:center;*/
  align-content: center;
  overflow-y: hidden;
}
#transFerStiationArea {
  flex: 1;
  width: 100%;
  padding: 40px 5%;
  height: 100%;
  box-sizing: border-box;
  overflow-y: scroll;
}
.transferStuationFrom {
  width: 100%;
  float: left;
}
.footerSign {
  width: 100%;
  height: 50px;
  float: left;
}
</style>