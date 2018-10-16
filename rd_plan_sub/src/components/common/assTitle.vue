<template>
	<div id="assTitle">
		<div v-if="titleInfo.title && titleInfo.title !== ''" class="assTitle_titleArea">
			<div class="assTitleArea_text">{{ titleInfo.title }}</div>
			<div v-if="titleType === 'reset' && userRole === 'CSEP'" class="assTitleArea_reset" @click="doReset">重置</div>
			<div v-if="formStatus && titleType === 'reset' && userRole !== 'CSEP' && userRole !== 'ifsave'" class="assTitleArea_reset" @click="formStatusChange">{{formStatus === 'card' ? '表格' : '卡片'}}</div>
			<div v-if="numTitle && numTitle.length > 0" class="assTitleArea_num">
				<div :class="numTitle.length == '1' ? 'assTitleArea_numItem' : ''" v-for="numItem in numTitle" :key="numItem">计划产生量合计：{{numItem.year_num_sum}} 实际产生量合计：{{numItem.last_num_sum}}</div>
			</div>
		</div>
		<div v-if="titleType === 'textarea' || titleType === 'hint'" :class="titleType === 'hint' ? 'colorGreen assTitle_textarea' : 'assTitle_textarea'">
			<div v-if="titleInfo.subTitle && titleInfo.subTitle !== ''" class="assTitleTextarea_title">{{ titleInfo.subTitle }}</div>
			<el-input v-if="titleType === 'textarea' && userRole === 'CSEP'" type="textarea"
				:class="userRole !== 'CSEP' ? 'colorBlack': ''"
				:autosize="{ minRows: 4, maxRows: 6}"
				:placeholder="titleInfo.placeholder + '(限500字)'"
				v-model="titleInfo.text" class="assTitleTextarea_input" maxlength="500">
			</el-input>
			<el-input v-if="titleType === 'textarea' && userRole !== 'CSEP'" type="textarea"
				:class="userRole !== 'CSEP' ? 'colorBlack': ''"
				:autosize="{ minRows: 4, maxRows: 6}"
				:placeholder="titleInfo.placeholder + '(限500字)'"
				v-model="titleInfo.text" class="assTitleTextarea_input" disabled maxlength="500">
			</el-input>
		</div>
	</div>
</template>
<script>
  export default {
		props: {
			titleInfo: Object,
			titleType: String,
			numTitle: Array,
			userRole: String,
			formStatus: String
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
			},
			formStatusChange() {
				if(this.formStatus === 'card'){
					this.formStatus = 'table'
				}else{
					this.formStatus = 'card'
				}
				this.$emit('formStatusChange',this.formStatus)
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
	/* height: 44px;
	line-height: 44px; */
	float: left;
}
.assTitleArea_text{
	height: 100%;
	float: left;
	font-size: 20px;
	color: black;
	font-weight: bold;
	line-height: 44px;
}
.assTitleArea_reset{
	height: 100%;
	float: left;
	font-size: 14px;
	margin-left: 10px;
	width: 50px;
	text-align: center;
	color: rgba(67,182,122);
	line-height:44px;
}
.assTitleArea_numItem{
	line-height: 44px;
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