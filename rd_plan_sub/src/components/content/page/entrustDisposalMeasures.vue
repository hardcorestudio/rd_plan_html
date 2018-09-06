<template>
	<div id='entrustDisposalMeasures'>
		<my-aside class="my-aside" :titleInfo="myTitleInfo" @doSubmit="doSubmit"></my-aside>
		<div id="entrustDisposalMeasuresPlan">
			<assTitle :titleInfo="title1" titleType="reset" @doReset="doReset" numTitle="本年度计划委托利用处置量：0   上年度实际委托利用处置量：0"></assTitle>
			<assForm :formList="title1fromList"></assForm>
			<div class="footerSign"></div>
		</div>
	</div>
</template>
<script>
	import Aside from '../Aside.vue';
	import assTitle from '../../common/assTitle.vue'
	import assForm from '../../common/assForm.vue'
	export default {
		name:'entrustDisposalMeasures',
		data(){
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
				title1: {
					title: " "
				},
				title1fromList: [{
					index: 1,
					itemList: [{
						type: "input",
						text: "",
						title: "委托利用处置单位名称",
						isSingle: true
					},{
						type: "input",
						text: "",
						title: "有害物质名称"
					},{
						type: "select",
						text: "",
						title: "废物名称"
					},{
						type: "select",
						text: "",
						title: "利用处置方式"
					},{
						type: "inputWithUnit",
						text: "",
						title: "本年度计划委托利用处置量",
						unit: "吨",
						isSingle: true
					},{
						type: "inputWithUnit",
						text: "",
						title: "上年度实际委托利用处置量",
						unit: "吨",
						isSingle: true
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
#entrustDisposalMeasures{
	display: -webkit-flex; /* Safari */
	display: flex;
	flex:1;
	flex-direction: row;
	justify-content:space-between;
	/*align-items:center;*/
	align-content:center;
	overflow-y: hidden;
}
#entrustDisposalMeasures >#MyAside{
	overflow-y: scroll;
}
#entrustDisposalMeasuresPlan{
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