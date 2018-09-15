<template>
	<div id="assSwitch">
		<div class="assSwitch_bg">
			<div v-if="title && title !== ''" class="assSwitchBg_title">{{ title }}</div>
			<div class="assSwitch_item" v-for="item in switchInfo" :key="item">
				<el-row class="assSwitchItem_row">
					<el-col class="assSwitchItem_text" :span="19">{{item.name}}</el-col>
					<el-col class="assSwitchItem_switchArea" :span="5">
						<el-switch
							:disabled="userRole !== 'CSEP'"
							style="display: block"
							v-model="item.value"
							active-color="#13ce66"
							:active-text="item.type && item.type === 'reach' ? '达标' : '是'"
							:inactive-text="item.type && item.type === 'reach' ? '不达标' : '否'"
							class="assSwitchItem_switch">
						</el-switch>
					</el-col>
				</el-row>
			</div>
		</div>
	</div>
</template>
<script>
  export default {
		props: {
			switchInfo: Array,
			title: String,
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
#assSwitch{
	width: 100%;
	float: left;
}
.assSwitch_bg{
	width: 100%;
	float: left;
	border-bottom: 2px solid #43b67a;
	margin-bottom: 15px;
}
.assSwitchBg_title{
	width: 100%;
	font-size: 18px;
	padding: 6px 0 12px;
	float: left;
}
.assSwitch_item{
	width: 100%;
	margin-bottom: 24px;
	float: left;
}
.assSwitchItem_row{

}
.assSwitchItem_text{
	font-size: 16px;
	color: #666;
}
.assSwitchItem_switchArea{
	text-align: right;
}
.assSwitchItem_switch .el-switch__label.is-active{ 
	color:#13ce66;
}
</style>