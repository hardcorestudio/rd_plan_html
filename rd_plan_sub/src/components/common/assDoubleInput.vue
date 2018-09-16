<template>
	<div id="assDoubleInput">
		<div class="assDoubleInput_titleArea">
			<div class="assDoubleInputArea_text">{{ title }}</div>
			<div v-if="type === 'input' && userRole === 'CSEP'" class="assDoubleInputArea_reset" @click="doReset">重置</div>
		</div>
		<div v-if="type === 'input'" class="assDoubleInput_textarea" v-for="(item, index) in formList" :key="index">
			<el-form :model="item">
				<el-row :gutter="20">
					<el-col v-if="itemTitleLeft && itemTitleLeft !== ''" :span="11">
						<el-form-item :label="itemTitleLeft">
							<el-input v-if="userRole=== 'CSEP'" v-model="item.text1" placeholder="必填"></el-input>
							<el-row v-else>{{item.text1}}</el-row>
						</el-form-item>
					</el-col>
					<el-col v-if="itemTitleRight && itemTitleRight !== ''" :span="11">
						<el-form-item :label="itemTitleRight">
							<el-input v-if="userRole=== 'CSEP'" v-model="item.text2" placeholder="必填"></el-input>
							<el-row v-else>{{item.text2}}</el-row>
						</el-form-item>
					</el-col>
					<el-col :span="2">
						<div v-if="userRole === 'CSEP'" class="assDoubleInputItem_iconBtnArea">
							<div v-if="index === formList.length - 1" @click="addSign">增加</div>
							<div v-if="index > 0" @click="reduceSign(item)">减少</div>
						</div>
					</el-col>
				</el-row>		
			</el-form>	
		</div>
		<div v-if="type === 'switch'" class="assDoubleInput_textarea" v-for="(item, index) in formList" :key="index">
			<el-form :model="item">
				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item :label="item.title1">
							<el-switch
								:disabled="userRole !== 'CSEP'"
								style="display: block"
								v-model="item.text1"
								active-color="#13ce66"
								active-text="有"
								inactive-text="无"
								active-value="1"
								inactive-value="0"
								class="assSwitchItem_switch">
							</el-switch>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item :label="item.title2">
							<el-switch
								:disabled="userRole !== 'CSEP'"
								style="display: block"
								v-model="item.text2"
								active-color="#13ce66"
								active-text="有"
								inactive-text="无"
								active-value="1"
								inactive-value="0"
								class="assSwitchItem_switch">
							</el-switch>
						</el-form-item>
					</el-col>
				</el-row>		
			</el-form>	
		</div>
	</div>
</template>
<script>
  export default {
		props: {
			title: String,
			formList: Array,
			itemTitleLeft: String,
			itemTitleRight: String,
			type: String,
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
				this.formList = [];
				let item = {};
				item.index = this.formList.length + 1;
				item.text1 = "";
				item.text2 = "";
				this.formList.push(item);
			},
			addSign() {
				let item = {};
				item.index = this.formList.length + 1;
				item.text1 = "";
				item.text2 = "";
				this.formList.push(item);
			},
			reduceSign(item) {
				let myFormList = [];
				for(let i in this.formList) {
					if(this.formList[i].index !== item.index){
						myFormList.push(this.formList[i]);
					}
				}
				this.formList = myFormList;
			}
    }
  }
</script>
<style>
#assDoubleInput{
	width: 100%;
	float: left;
}
.assDoubleInput_titleArea{
	width: 100%;
	height: 44px;
	line-height: 44px;
	float: left;
}
.assDoubleInputArea_text{
	height: 100%;
	float: left;
	font-size: 16px;
	color: black;
	font-weight: bold;
}
.assDoubleInputArea_reset{
	height: 100%;
	float: left;
	font-size: 14px;
	margin-left: 10px;
	width: 50px;
	text-align: center;
	color: rgba(67,182,122)
}
.assDoubleInput_textarea{
	width: 100%;
	float: left;
}
.assDoubleInputTextarea_title{
	width: 100%;
	font-size: 16px;
	padding: 6px 0 12px;
	float: left;
}
.assDoubleInputTextarea_input{
	width: 100%;
	float: left;
}
.assDoubleInputItem_iconBtnArea{
	text-align: right;
	width: 100%;
	box-sizing: border-box;
	height: 40px;
	line-height: 40px;
}
.assDoubleInputItem_iconBtnArea >div {
	font-size: 12px;
	color: #13ce66;
	float: right;
	width: 26px;
	padding: 0 2px;
}
.assSwitchItem_switch{
	height: 40px;
	line-height: 40px;
}
.assSwitchItem_switch .el-switch__label.is-active{ 
	color:#13ce66;
}
.assSwitchItem_switch .el-switch__label{ 
	height: 40px;
}

</style>