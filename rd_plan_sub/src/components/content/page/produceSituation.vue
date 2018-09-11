<template>
	<div id='produceSituation'>
		<my-aside :userRole="userRole" class="my-aside" :titleInfo="myTitleInfo" @doSubmit="doSubmit"></my-aside>
		<div id="produceSituationPlan">
			<assTitle :userRole="userRole" :titleInfo="title1" titleType="reset" @doReset="doReset" numTitle="计划产生量合计：0   实际产生量合计：0"></assTitle>
			<assForm :formList="title1fromList" :type="userRole === 'manager' ? '' : 'label'"></assForm>
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
		name:'produceSituation',
		data(){
			return {
				myTitleInfo: {
					title: "危险废物产生概况",
					textInfoList: [
						'本表应包括产生的所有危险废物(包括自行利用处置过程中产生的废渣)的有关情况;',
						'废物名称、废物代码、废物类别:根据《国家危险废物名录》中对应的废物名称、代码和类别填写，如某化工厂在生产四氯化碳过程中产生蒸馏残渣，则废物名称为“四氯化碳生产过程中产生的蒸馏残渣”，废物代码为“261-010-11”，废物类别为“HW11精(蒸)馏残渣”;',
						'有害物质名称:废物中的有害物质名称(每种废物可包含多种有害物质);',
						'物理性状:废物在常温、常压下的物理状态，包括固态(固态废物，S)、半固态(泥态废物，SS)、液态(高浓度液态废 物，L)、气态(置于容器中的气态废物，G)等;',
						'危险特性:根据《国家危险废物名录》和《危险废物鉴别标准》中规定的危害特性填写，包括“腐蚀性”“毒性”“易燃性”,“反应性”和“感染性”等;',
						'本年度计划产生量:计划期限内的危险废物产生量，计量单位为吨，以升、立方米等体积计量的，应折算成重量吨;以个数作为计量单位的，除填写个数外，还应折算成重量吨;半固态危险废物(如电镀污泥等)，以脱水后的干泥重量计;',
						'上年度产生量:计划期限上一年度的危险废物产生量，计量单位为吨，以升、立方米等体积计量的，应折算成重量吨;以个数作为计量单位的，除填写个数外，还应折算成重量吨;半固态危险废物(如电镀污泥等)，以脱水后的干泥重量计;',
						'来源及产生工序:产生该种废物的部门、车间名称及其相应产生工段、工序名称。'
					]
				},
				userRole: 'manager',
				title1: {
					title: " "
				},
				title1fromList: [{
					index: 1,
					itemList: [{
						type: "input",
						text: "",
						title: "废物名称"
					},{
						type: "select",
						text: "",
						title: "废物代码"
					},{
						type: "select",
						text: "",
						title: "类别选择"
					},{
						type: "input",
						text: "",
						title: "有害物质名称"
					},{
						type: "input",
						text: "",
						title: "物理性状"
					},{
						type: "input",
						text: "",
						title: "危险特性"
					},{
						type: "input",
						text: "",
						title: "计划生产量"
					},{
						type: "select",
						text: "",
						title: "单位"
					},{
						type: "input",
						text: "",
						title: "实际生产量"
					},{
						type: "select",
						text: "",
						title: "单位"
					},{
						type: "input",
						text: "",
						title: "来源及产生工序",
						isSingle: true
					}]
				}]
			}
		},
		components:{
			'my-aside':Aside,
			'assTitle':assTitle,
			'assForm':assForm
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
			doReset() {
				console.log("原辅材料及消耗量");
			}
		}
	}
</script>
<style scoped>
#produceSituation{
	display: -webkit-flex; /* Safari */
	display: flex;
	flex:1;
	flex-direction: row;
	justify-content:space-between;
	/*align-items:center;*/
	align-content:center;
	overflow-y: hidden;
}
#produceSituation >#MyAside{
	overflow-y: scroll;
}
#produceSituationPlan{
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