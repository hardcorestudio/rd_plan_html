<template>
	<div id='productionSituation'>
		<my-aside class="my-aside" :titleInfo="myTitleInfo" @doSubmit="doSubmit"></my-aside>
		<div id="dangerRubbishManagerPlan">
			<assTitle :titleInfo="title1" titleType="reset" @doReset="resetRawMaterial"></assTitle>
			<assForm :formList="title1fromList" listType="top"></assForm>
			<assTitle :titleInfo="title2" titleType="reset" @doReset="resetRawMaterial"></assTitle>
			<assForm :formList="title2fromList" listType="middle"></assForm>
			<assTitle :titleInfo="title3" titleType="reset" @doReset="resetRawMaterial"></assTitle>
			<assForm :formList="title3fromList" listType="bottom"></assForm>
			<assTitle :titleInfo="title4" titleType="textarea"></assTitle>
			<div class="footerSign"></div>
		</div>
	</div>
</template>
<script>
	import Aside from '../Aside.vue';
	import assTitle from '../../common/assTitle.vue'
	import assForm from '../../common/assForm.vue'
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
					first: "",
					second: "",
					third: "",
					fourth: ""
				}],
				title2fromList: [{
					index: 1,
					first: "",
					second: "",
					third: "",
					fourth: ""
				}],
				title3fromList: [{
					index: 1,
					first: "",
					second: "",
					third: "",
					fourth: ""
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