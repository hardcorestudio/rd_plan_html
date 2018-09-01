<template>
	<div id="MyAside">
		<div class="leftAside_titleBg">
			<div class="leftAside_title">危险废物管理计划</div>
			<div class="leftAside_subtitle">{{titleInfo.title}}</div>
		</div>
		<div class="leftAside_contentArea">
			<div class="leftAside_textItem" v-for="item in titleInfo.textInfoList" :key="item">{{item}}</div>
		</div>
		<div class="leftAside_btnArea">
			<el-button plain @click="doSubmit">保存</el-button>
		</div>
	</div>
</template>
<script>
  export default {
		props: {
			titleInfo: Object
		},
    data() {
      return {
        // isCollapse: false
      };
		},
		mounted: {
			
		},
    methods: {
			doSubmit() {
				this.$emit('doSubmit')
			}
    }
  }
</script>
<style scoped>
#MyAside{
	/* display: -webkit-flex;
  display: flex; */
	/*flex:1;*/
	height: 100%;
	/*width: 200px;*/
	/*min-width: 200px;*/
	/*border-right: 0.5px solid rgba(52, 52, 52,0.5);*/
	background-color: #fff;
	width: 360px;
	min-height: 400px;
	/* flex-direction: column; */
	box-sizing: border-box;
	padding: 45px 28px;
}
.leftAside_bg{
	width: 100%
}
.leftAside_titleBg{
	border-bottom: 2px solid rgba(67,182,122);
	float: left;
	padding-bottom: 26px;
}
.leftAside_titleBg .leftAside_title {
	font-size: 24px;
}
.leftAside_titleBg .leftAside_subtitle {
	font-size: 16px;
	text-align: right;
}
.leftAside_contentArea{
	width: 100%;
	padding-top: 42px;
	float: left;
}
.leftAside_contentArea .leftAside_textItem{
	font-size: 10px;
	margin-bottom: 5px;
}
.leftAside_btnArea{
	margin-top: 50px;
	float: left;
}
.leftAside_btnArea >button{
	background: #fff;
	font-weight: unset;
	border: 1px solid rgba(67,182,122);
	color: rgba(67,182,122);
}
/*.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
}*/

</style>