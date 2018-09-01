<template>
	<div id="assTitle">
		<div v-if="titleInfo.title && titleInfo.title !== ''" class="assTitle_titleArea">
			<div class="assTitleArea_text">{{ titleInfo.title }}</div>
			<div v-if="titleType === 'reset'" class="assTitleArea_reset" @click="doReset">重置</div>
		</div>
		<div v-if="titleType === 'textarea'" class="assTitle_textarea">
			<div v-if="titleInfo.subTitle && titleInfo.subTitle !== ''" class="assTitleTextarea_title">{{ titleInfo.subTitle }}</div>
			<el-input
				type="textarea"
				:autosize="{ minRows: 4, maxRows: 6}"
				:placeholder="titleInfo.placeholder"
				v-model="titleInfo.text" class="assTitleTextarea_input">
			</el-input>
		</div>
	</div>
</template>
<script>
  export default {
		props: {
			titleInfo: Object,
			titleType: String
		},
    data() {
      return {
        // isCollapse: false
      };
		},
		mounted: {
			
		},
    methods: {
			doReset() {
				this.$emit('doReset')
			}
    }
  }
</script>
<style scoped>
#assTitle{
	width: 100%;
	float: left;
}
.assTitle_titleArea{
	width: 100%;
	height: 44px;
	line-height: 44px;
	float: left;
}
.assTitleArea_text{
	height: 100%;
	float: left;
	font-size: 20px;
	color: black;
	font-weight: bold;
}
.assTitleArea_reset{
	height: 100%;
	float: left;
	font-size: 14px;
	margin-left: 10px;
	width: 50px;
	text-align: center;
	color: rgba(67,182,122)
}
.assTitle_textarea{
	width: 100%;
	float: left;
}
.assTitleTextarea_title{
	width: 100%;
	font-size: 16px;
	padding: 6px 0 12px;
	float: left;
}
.assTitleTextarea_input{
	width: 100%;
	float: left;
}
</style>