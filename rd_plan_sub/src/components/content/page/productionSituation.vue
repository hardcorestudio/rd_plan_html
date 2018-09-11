<template>
	<div id='productionSituation'>
		<my-aside :userRole="userRole" class="my-aside" :titleInfo="myTitleInfo" @doSubmit="doSubmit"></my-aside>
		<div id="dangerRubbishManagerPlan">
			<assTitle :userRole="userRole" :titleInfo="title1" titleType="reset" @doReset="resetRawMaterial"></assTitle>
			<assForm :formList="title1fromList" :type="userRole === 'manager' ? '' : 'label'"></assForm>
			<assTitle :userRole="userRole" :titleInfo="title2" titleType="reset" @doReset="resetRawMaterial"></assTitle>
			<assForm :formList="title2fromList" :type="userRole === 'manager' ? '' : 'label'"></assForm>
			<assTitle :userRole="userRole" :titleInfo="title3" titleType="reset" @doReset="resetRawMaterial"></assTitle>
			<assForm :formList="title3fromList" :type="userRole === 'manager' ? '' : 'label'"></assForm>
			<assTitle :userRole="userRole" :titleInfo="title4" titleType="textarea"></assTitle>
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
		name:'productionSituation',
		data(){
			return {
				myTitleInfo: {
					title: "产品生产情况",
					textInfoList: [
						"主要原辅材料及消耗量：计划期限上一年度及本年度计划用于生产的主要原辅材料的商品名称或化学名称，及其实际与计划年消耗量；",
						"主要生产设备及数量：用于生产的主要设备名称及其数量；",
						"主要产品及产量：主要产品的商品名称或化学名称，及其年生产量；",
						"生产工艺说明：文字说明所有危险废物的生产环节。"
					]
				},
				userRole: 'manager',
				title1: {
					title: "原辅材料及消耗量",
				},
				title2: {
					title: "生产设备及数量",
				},
				title3: {
					title: "产品及产量",
				},
				title4: {
					title: "生产工艺说明",
					placeholder: "必填",
					text: ""
				},
				title1fromList: [{
					index: 1,
					itemList: [{
						type: "input",
						text: "",
						title: "原辅材料名称"
					},{
						type: "select",
						text: "",
						title: "单位"
					},{
						type: "input",
						text: "",
						title: "上年度消耗量"
					},{
						type: "input",
						text: "",
						title: "本年度计划消耗量"
					}]
				}],
				title2fromList: [{
					index: 1,
					itemList: [{
						type: "input",
						text: "",
						title: "设备名称"
					},{
						type: "unit",
						text: "台",
						title: "单位"
					},{
						type: "input",
						text: "",
						title: "上年度数量"
					},{
						type: "input",
						text: "",
						title: "本年度数量"
					}]
				}],
				title3fromList: [{
					index: 1,
					itemList: [{
						type: "input",
						text: "",
						title: "产品名称"
					},{
						type: "select",
						text: "",
						title: "单位"
					},{
						type: "input",
						text: "",
						title: "上年度产量"
					},{
						type: "input",
						text: "",
						title: "本年度计划产量"
					}]
				}],
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
			resetRawMaterial() {
				console.log("原辅材料及消耗量");
			}
		}
	}
</script>
<style scoped>
#productionSituation{
	display: -webkit-flex; /* Safari */
	display: flex;
	flex:1;
	flex-direction: row;
	justify-content:space-between;
	/*align-items:center;*/
	align-content:center;
	overflow-y: hidden;
}
#dangerRubbishManagerPlan{
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