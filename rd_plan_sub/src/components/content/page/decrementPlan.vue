<template>
	<div id='decrementPlan'>
		<my-aside class="my-aside" :titleInfo="myTitleInfo" @doSubmit="doSubmit"></my-aside>
		<div id="decrementPlanContent">
			<assTitle :titleInfo="title1" titleType="textarea"></assTitle>
			<assTitle :titleInfo="title2" titleType="textarea"></assTitle>
			<div class="footerSign"></div>
		</div>
	</div>
</template>
<script>
	import Aside from '../Aside.vue';
	import assTitle from '../../common/assTitle.vue'
	import assForm from '../../common/assForm.vue'
	export default {
		name:'decrementPlan',
		data(){
			return {
				myTitleInfo: {
					title: "危废减量化计划和措施",
					textInfoList: []
				},
				title1: {
					title: "减少危险废物危害性的计划",
					placeholder: "必填",
					text: ""
				},
				title2: {
					title: "减少危险废物生产量和危害性的措施",
					placeholder: "可以包括以下几个方面：改进设计、采用先进的工艺技术和设备、使用清洁的能源和原料、改善管理、危险废物综合利用、提高污染防治水平等。",
					text: ""
				}
			}
		},
		components:{
			'my-aside':Aside,
			'assTitle':assTitle,
			'assForm':assForm
		},
		methods: {
			doSubmit() {
				console.log("保存save");
				console.log(this.title2.text);
			}
		}
	}
</script>
<style scoped>
#decrementPlan{
	display: -webkit-flex; /* Safari */
	display: flex;
	flex:1;
	flex-direction: row;
	justify-content:space-between;
	/*align-items:center;*/
	align-content:center;
	overflow-y: hidden;
}
#decrementPlanContent{
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