<template>
	<div id='entrustDisposalMeasures'>
		<my-aside :userRole="userRole" class="my-aside" :titleInfo="myTitleInfo" @doSubmit="doSubmit"></my-aside>
		<div id="entrustDisposalMeasuresPlan">
			<assTitle :userRole="userRole" :titleInfo="title1" titleType="reset" @doReset="doReset" :numTitle="numTitle"></assTitle>
			<assForm :formList="title1fromList" :type="userRole !== 'CSEP' ? 'label' : ''" :cateList="cateList" :cateList2="cateList2"></assForm>
			<div class="footerSign"></div>
		</div>
	</div>
</template>
<script>
import Aside from '../Aside.vue';
import assTitle from '../../common/assTitle.vue'
import assForm from '../../common/assForm.vue'
import { checkBrowser,getQueryString } from '../../utils/browserCheck.js'
export default {
	name: 'entrustDisposalMeasures',
	data () {
		return {
			myTitleInfo: {
				title: "危废委托利用/处置措施",
				textInfoList: [
					'凡计划期限上一年已委托或计划期限内拟委托外单位利用处置危险废物(包括自行利用处置过程中产生的废渣)的，需填写表7。委托利用的，在表头的利用下划√;委托处置的，在表头的处置下划√。同时将相应利用处置单位的危险废物经营许可证复印件作为本管理计划表的附件一并装订成册;',
					'利用处置单位名称、许可证编号:与利用处置单位危险废物经营许可证上的名称、许可证编号一致;',
					'利用处置废物名称:与表3中相应的废物名称一致;',
					'利用处置方式:外单位利用处置该种废物的方式，包括“焚烧”“填埋”“综合利用”等;',
					'本年度计划委托利用处置量:计划期限内委托利用处置危险废物的数量;',
					'上年度委托利用处置量:计划期限上一年委托利用处置该种',
					'危险废物的数量，如为计划期限内新更换的委托利用处置单位，即上一年未委托该单位利用处置废物时，则相应委托利用处置量填写“0”。'
				]
			},
			userRole: 'CSEP',
			title1: {
				title: " "
			},
			numTitle: "",
			title1fromList: [{
				index: 1,
				itemList: [{
					type: "selectDIY",
					text: "",
					title: "委托利用处置单位名称",
					isSingle: true
				}, {
					type: "selectDIY",
					text: "",
					title: "废物名称",
					num: "1"
				}, {
					type: "select",
					text: "",
					title: "单位"
				}, {
					type: "input",
					text: "",
					title: "利用处置方式"
				}, {
					type: "input",
					text: "",
					title: "本年度计划委托利用处置量",
					isSingle: true
				}, {
					type: "input",
					text: "",
					title: "上年度实际委托利用处置量",
					isSingle: true
				}]
			}],
			cateList: [],
			cateList2: []
		}
	},
	components: {
		'my-aside': Aside,
		'assTitle': assTitle,
		'assForm': assForm
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

		// fetch({
		// 	url: '/plan/initTransfer',
		// 	method: 'POST',
		// 	data: 'params=' + JSON.stringify(this.queryJson)
		// }).then(res => {
		let res = {
			"WJWT": "czlEcjhPMjRXelI5LzQrVE5JS1hiZkxoR29rSFkwQVFNOUczbXMxNlBJdz0=",
			"operatorId": "",
			"sumHandleList": [
				{
					"last_num_sum": "300.00吨",
					"year_num_sum": "300.00吨"
				}
			],
			"empId": "",
			"initEpCzList": [
				{
					"EN_NAME_CZ": "天津壹鸣环境工程有限公司",
					"EN_ID_CZ": "EP201410280833480008"
				},
				{
					"EN_NAME_CZ": "中海油能源发展股份有限公司安全环保分公司（碧海环保）",
					"EN_ID_CZ": "EP201410280908450011"
				},
				{
					"EN_NAME_CZ": "天津合佳威立雅环境服务有限公司",
					"EN_ID_CZ": "EP201410280910450012"
				},
				{
					"EN_NAME_CZ": "天津市海澜危废品综合利用处理有限公司",
					"EN_ID_CZ": "EP201410280929450017"
				},
				{
					"EN_NAME_CZ": "天津市昱隆泰再生资源环保处理有限公司",
					"EN_ID_CZ": "EP201410280946090018"
				},
				{
					"EN_NAME_CZ": "天津东邦铅资源再生有限公司",
					"EN_ID_CZ": "EP201410281131110030"
				},
				{
					"EN_NAME_CZ": "天津市海丰化工有限公司",
					"EN_ID_CZ": "EP201410281233290032"
				},
				{
					"EN_NAME_CZ": "天津江源环保科技有限公司",
					"EN_ID_CZ": "EP201410281429170043"
				},
				{
					"EN_NAME_CZ": "天津环通金属制品有限公司",
					"EN_ID_CZ": "EP201410281648190057"
				},
				{
					"EN_NAME_CZ": "利弗斯（天津）工业废物处理有限公司",
					"EN_ID_CZ": "EP201410291259060069"
				},
				{
					"EN_NAME_CZ": "泰鼎（天津）环保科技有限公司",
					"EN_ID_CZ": "EP201410291352330074"
				},
				{
					"EN_NAME_CZ": "天津仁新玻璃材料有限公司",
					"EN_ID_CZ": "EP201410291732000084"
				},
				{
					"EN_NAME_CZ": "天津滨海合佳威立雅环境服务有限公司",
					"EN_ID_CZ": "EP201411031103580169"
				},
				{
					"EN_NAME_CZ": "天津友信材料科技有限公司",
					"EN_ID_CZ": "EP201501071338330387"
				},
				{
					"EN_NAME_CZ": "天津壹鸣环境科技股份有限公司",
					"EN_ID_CZ": "EP201505151246570569"
				},
				{
					"EN_NAME_CZ": "天津市雅环再生资源回收利用有限公司",
					"EN_ID_CZ": "EP201508141009471304"
				},
				{
					"EN_NAME_CZ": "天津市祥源盛自行车配件有限公司",
					"EN_ID_CZ": "EP201510101504241835"
				},
				{
					"EN_NAME_CZ": "中能（天津）环保再生资源利用有限公司",
					"EN_ID_CZ": "EP201512021411072294"
				},
				{
					"EN_NAME_CZ": "天津华庆百胜能源有限公司",
					"EN_ID_CZ": "EP201602251339212631"
				},
				{
					"EN_NAME_CZ": "天津市腾源环保科技有限公司",
					"EN_ID_CZ": "EP201606031641393014"
				},
				{
					"EN_NAME_CZ": "天津壹鸣环境污染治理有限公司",
					"EN_ID_CZ": "EP201607110955513122"
				},
				{
					"EN_NAME_CZ": "德鸿泰（天津）环保科技有限公司",
					"EN_ID_CZ": "EP201611221430103497"
				},
				{
					"EN_NAME_CZ": "生产记录簿测试户",
					"EN_ID_CZ": "EP201707191015183982"
				}
			],
			"userType": "CSEP",
			"newGuideFlag": "",
			"belongQ": "",
			"belongS": "",
			"nickName": "天津合佳威立雅环境服务有限公司",
			"orgCode": "",
			"userId": "EP201410280910450012",
			"userName": "",
			"sepaName": "津南区",
			"status": "",
			"ifLogin": "0",
			"ROLEID": "CSEP",
			"epName": "天津合佳威立雅环境服务有限公司",
			"epId": "EP201410280910450012",
			"belongSepa": "JNQ",
			"userPortrait": "",
			"initHandleList": [
				{
					"UNIT": "吨",
					"EN_NAME_CZ": "范德萨发生发撒附近开了；阿",
					"LAST_NUM": "100",
					"HANDLE_TYPE": "范德萨",
					"LINCENSE_NO": "1234567",
					"SAMLL_CATEGORY_ID": null,
					"ID": "1",
					"D_NAME": "范德萨",
					"TP_ID": "TP201809120707190010",
					"EN_ID_CZ": "EP00000000001",
					"YEAR_NUM": "100",
					"BIG_CATEGORY_ID": "HW01"
				},
				{
					"UNIT": "吨",
					"EN_NAME_CZ": "范德萨发生发撒附近开了；阿",
					"LAST_NUM": "100",
					"HANDLE_TYPE": "范德萨",
					"LINCENSE_NO": "1234567",
					"SAMLL_CATEGORY_ID": null,
					"ID": "2",
					"D_NAME": "范德萨",
					"TP_ID": "TP201809120707190010",
					"EN_ID_CZ": "EP00000000002",
					"YEAR_NUM": "100",
					"BIG_CATEGORY_ID": "HW01"
				},
				{
					"UNIT": "吨",
					"EN_NAME_CZ": "aaaaaaaaaaaa",
					"LAST_NUM": "100",
					"HANDLE_TYPE": "范德萨",
					"LINCENSE_NO": "1234567",
					"SAMLL_CATEGORY_ID": null,
					"ID": "3",
					"D_NAME": "范德萨",
					"TP_ID": "TP201809120707190010",
					"EN_ID_CZ": "EP00000000003",
					"YEAR_NUM": "100",
					"BIG_CATEGORY_ID": "HW01"
				}
			],
			"IWBSESSION": "BROWSER-20180917145842",
			"initOverviewList": [
				{
					"BIG_CATEGORY_NAME": null,
					"UNIT": "吨",
					"W_NAME": "发大水",
					"SOURCE_PROCESS": "adfdsa",
					"SAMLL_CATEGORY_ID": "271-005-02",
					"TP_ID": "TP201809120707190010",
					"YEAR_NUM": "11",
					"BIG_CATEGORY_ID": "HW02",
					"W_SHAPE": "发大水",
					"LAST_NUM": "1100",
					"SAMLL_CATEGORY_NAME": null,
					"ID": "1",
					"D_NAME": "发达",
					"CHARACTER": "aaa"
				},
				{
					"BIG_CATEGORY_NAME": null,
					"UNIT": "个",
					"W_NAME": "111",
					"SOURCE_PROCESS": "嗷嗷",
					"SAMLL_CATEGORY_ID": "900-402-06",
					"TP_ID": "TP201809120707190010",
					"YEAR_NUM": "22",
					"BIG_CATEGORY_ID": "HW06",
					"W_SHAPE": "发大水",
					"LAST_NUM": "2200",
					"SAMLL_CATEGORY_NAME": null,
					"ID": "2",
					"D_NAME": "vvv",
					"CHARACTER": "范德萨"
				},
				{
					"BIG_CATEGORY_NAME": null,
					"UNIT": "吨",
					"W_NAME": "发大水",
					"SOURCE_PROCESS": "发大水",
					"SAMLL_CATEGORY_ID": "831-002-01",
					"TP_ID": "TP201809120707190010",
					"YEAR_NUM": "发大水",
					"BIG_CATEGORY_ID": "HW01",
					"W_SHAPE": "22",
					"LAST_NUM": "22",
					"SAMLL_CATEGORY_NAME": null,
					"ID": "3",
					"D_NAME": "发大水",
					"CHARACTER": "范德萨"
				}
			],
			"realName": "",
			"contextPath": "",
			"orgSeq": ""
		}
		let lastNum = ""
		let yearNum = ""
		for (let i in res.sumHandleList) {
			if (i === 0) {
				lastNum = res.sumHandleList[i].last_num_sum
				yearNum = res.sumHandleList[i].year_num_sum
			} else {
				lastNum += ' ' + res.sumHandleList[i].last_num_sum
				yearNum += ' ' + res.sumHandleList[i].year_num_sum
			}
		}
		if (res.sumHandleList.length === 0) {
			lastNum = "0"
			yearNum = "0"
		}
		this.numTitle = "本年度计划委托利用处置量：" + yearNum + "   上年度实际委托利用处置量：" + lastNum
		
		this.cateList = []
		for (let i in res.initEpCzList) {
			let item = {}
			item.value = res.initEpCzList[i].EN_ID_CZ
			item.label = res.initEpCzList[i].EN_NAME_CZ
			this.cateList.push(item)
		}
		this.cateList2 = []
		for (let i in res.initOverviewList) {
			let item = {}
			item.value = res.initOverviewList[i].D_NAME
			item.label = res.initOverviewList[i].D_NAME
			this.cateList2.push(item)
		}
		if (res.initHandleList.length > 0) {
			this.title1fromList = []
			for (let i in res.initHandleList) {
				let item = {
					index: i + 1,
					itemList: [{
						type: "selectDIY",
						text: res.initHandleList[i].EN_NAME_CZ,
						title: "委托利用处置单位名称",
						isSingle: true
					},{
						type: "selectDIY",
						text: res.initHandleList[i].D_NAME,
						title: "废物名称",
						num: "1"
					}, {
						type: "select",
						text: res.initHandleList[i].UNIT,
						title: "单位"
					}, {
						type: "input",
						text: res.initHandleList[i].HANDLE_TYPE,
						title: "利用处置方式"
					}, {
						type: "input",
						text: res.initHandleList[i].YEAR_NUM,
						title: "本年度计划委托利用处置量",
						isSingle: true
					}, {
						type: "input",
						text: res.initHandleList[i].LAST_NUM,
						title: "上年度实际委托利用处置量",
						isSingle: true
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
					title: "委托利用处置单位名称",
					isSingle: true
				},{
					type: "selectDIY",
					text: "",
					title: "废物名称",
					num: "1"
				}, {
					type: "select",
					text: "",
					title: "单位"
				}, {
					type: "input",
					text: "",
					title: "利用处置方式"
				}, {
					type: "input",
					text: "",
					title: "本年度计划委托利用处置量",
					isSingle: true
				}, {
					type: "input",
					text: "",
					title: "上年度实际委托利用处置量",
					isSingle: true
				}]
			}]
		}

		// })




	},
	methods: {
		doSubmit () {
			console.log("保存save");
		},
		doReset () {
			console.log("原辅材料及消耗量");
			this.title1fromList = [{
				index: 1,
				itemList: [{
					type: "selectDIY",
					text: "",
					title: "委托利用处置单位名称",
					isSingle: true
				},{
					type: "selectDIY",
					text: "",
					title: "废物名称",
					num: "1"
				}, {
					type: "select",
					text: "",
					title: "单位"
				}, {
					type: "input",
					text: "",
					title: "利用处置方式"
				}, {
					type: "input",
					text: "",
					title: "本年度计划委托利用处置量",
					isSingle: true
				}, {
					type: "input",
					text: "",
					title: "上年度实际委托利用处置量",
					isSingle: true
				}]
			}]
		}
	}
}
</script>
<style scoped>
#entrustDisposalMeasures {
  display: -webkit-flex; /* Safari */
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  /*align-items:center;*/
  align-content: center;
  overflow-y: hidden;
}
#entrustDisposalMeasures > #MyAside {
  overflow-y: scroll;
}
#entrustDisposalMeasuresPlan {
  flex: 1;
  width: 100%;
  padding: 40px 5%;
  height: 100%;
  box-sizing: border-box;
  overflow-y: scroll;
}
.footerSign {
  width: 100%;
  height: 50px;
  float: left;
}
</style>