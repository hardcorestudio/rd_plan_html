<template>
	<div id="assTitle">
		<div v-if="titleInfo.title && titleInfo.title !== ''" class="assTitle_titleArea">
			<div class="assTitleArea_text">{{ titleInfo.title }}</div>
			<div v-if="titleType === 'reset' && userRole === 'CSEP'" class="assTitleArea_reset" @click="doReset">重置</div>
			<div v-if="numTitle && numTitle !== ''" class="assTitleArea_num">{{numTitle}}</div>
		</div>
		<div v-if="titleType === 'textarea' || titleType === 'hint'" :class="titleType === 'hint' ? 'colorGreen assTitle_textarea' : 'assTitle_textarea'">
			<div v-if="titleInfo.subTitle && titleInfo.subTitle !== ''" class="assTitleTextarea_title">{{ titleInfo.subTitle }}</div>
			<el-input v-if="titleType === 'textarea' && userRole === 'CSEP'" type="textarea"
				:class="userRole !== 'CSEP' ? 'colorBlack': ''"
				:autosize="{ minRows: 4, maxRows: 6}"
				:placeholder="titleInfo.placeholder"
				v-model="titleInfo.text" class="assTitleTextarea_input">
			</el-input>
			<el-input v-if="titleType === 'textarea' && userRole !== 'CSEP'" type="textarea"
				:class="userRole !== 'CSEP' ? 'colorBlack': ''"
				:autosize="{ minRows: 4, maxRows: 6}"
				:placeholder="titleInfo.placeholder"
				v-model="titleInfo.text" class="assTitleTextarea_input" disabled>
			</el-input>
		</div>
	</div>
</template>
<script>
  export default {
		props: {
			titleInfo: Object,
			titleType: String,
			numTitle: String,
			userRole: String
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
<style>
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
.assTitleArea_num{
	height: 100%;
	float: right;
	font-size: 14px;
	padding: 0 5px;
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
.colorGreen {
	 color: rgba(67,182,122);
}
.colorBlack textarea{
	color: #000!important;
}
</style>