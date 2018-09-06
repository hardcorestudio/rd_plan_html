<template>
	<div id='lastYearManagePlanRecord'>
		<my-aside class="my-aside" :titleInfo="myTitleInfo" @doSubmit="doSubmit"></my-aside>
		<div id="lastYearManagePlanRecordContent">
			<assTitle :titleInfo="title1" titleType="textarea"></assTitle>
			<assTitle :titleInfo="title2" titleType="textarea"></assTitle>
			<assTitle :titleInfo="title3" titleType="single"></assTitle>
			<assSwitch title="危险废物经营许可证制度" :switchInfo="switchInfo1"></assSwitch>
			<assSwitch title="危险废物转移审批制度" :switchInfo="switchInfo2"></assSwitch>
			<assSwitch title="危险废物识别标志制度" :switchInfo="switchInfo3"></assSwitch>
			<assSwitch title="危险废物建立台账登记制度" :switchInfo="switchInfo4"></assSwitch>
			<assSwitch title="建设项目固废污染防治设施环境影响评价及验收制度" :switchInfo="switchInfo5"></assSwitch>
			<div class="footerSign"></div>
		</div>
	</div>
</template>
<script>
import Aside from '../Aside.vue';
import assTitle from '../../common/assTitle.vue'
import assForm from '../../common/assForm.vue'
import assSwitch from '../../common/assSwitch.vue'
export default {
	name: 'lastYearManagePlanRecord',
	data () {
		return {
			myTitleInfo: {
				title: "上年度管理计划回顾",
				textInfoList: [
					"上年度各级环保部门检查、环境监测、信息公开情况：如实记录各级环保部门对其检查情况，包括时间、存在的问题、下一步措施；环境监测是否都达标，原因分析；是否公开信息，公开内容等；",
					"危险废物比较分析：上年度危险废物实际产生数量、种类、贮存、利用处置等情况，并与上年度管理计划中预期结果进行比较分析；",
					"管理制度执行情况：对是否执行危险废物经营许可证制度、转移审批及联单制度、识别标志标签制度等进行勾选。"
				]
			},
			title1: {
				title: "检查、监测和公开",
				subTitle: "上年度各级环保部门检查、环境监测、信息公开情况",
				placeholder: "包括检查时间、存在的问题、下一步措施；环境监测达标情况和原因分析；信息公开内容",
				text: ""
			},
			title2: {
				title: "危险废物比较分析",
				subTitle: "上年度实际产生的危险废物数量、种类、转移、贮存、利用处置情况，并与上年度管理计划对比分析",
				placeholder: "必填",
				text: ""
			},
			title3: {
				title: "管理制度执行情况",
			},
			switchInfo1: [{
				id: "1",
				name: "是否将危险废物委托给有资质的单位收集、贮存、利用、处置",
				value: ""
			}, {
				id: "2",
				name: "是否与有资质的单位签订危险废物利用处置合同/协议",
				value: ""
			}, {
				id: "3",
				name: "是否对危险废物许可证进行审查确认",
				value: ""
			}],
			switchInfo2: [{
				id: "1",
				name: "转移危险废物是否经过环保部门批准",
				value: ""
			}],
			switchInfo3: [{
				id: "1",
				name: "危险废物收集、贮存、处置设施场所是否设置危险废物识别标志",
				value: ""
			}, {
				id: "2",
				name: "危险废物的容器和包装物是否设置危险废物标签",
				value: ""
			}],
			switchInfo4: [{
				id: "1",
				name: "是否按照国家规定建立危险废物台账",
				value: ""
			}],
			switchInfo5: [{
				id: "1",
				name: "危险废物收集、贮存、处置等污染防治设施是否通过环评审批",
				value: ""
			}, {
				id: "2",
				name: "上述危险废物相关污染防治设施是否与主体工程同时通过环保验收",
				value: ""
			}]
		}
	},
	components: {
		'my-aside': Aside,
		'assTitle': assTitle,
		'assForm': assForm,
		'assSwitch': assSwitch
	},
	methods: {
		doSubmit () {
			console.log("保存save");
			console.log(this.title2.text);
		}
	}
}
</script>
<style scoped>
#lastYearManagePlanRecord {
  display: -webkit-flex; /* Safari */
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  /*align-items:center;*/
  align-content: center;
	overflow-y: hidden;
}
#lastYearManagePlanRecordContent {
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