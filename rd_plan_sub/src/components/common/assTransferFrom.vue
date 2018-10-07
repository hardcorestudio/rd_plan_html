<template>
	<div id="assTransferFrom">
		<div class="assTransferFrom_bg" v-for="(item, index) in formList" :key="index">
				<!-- <assTitle :userRole="userRole" :titleInfo="title1" titleType="single"></assTitle> -->
				<!-- <assSwitch :userRole="userRole" title="运输措施" :switchInfo="switchInfo2"></assSwitch>  -->
			<el-row class="assSwitchItem_row" :gutter="20">
				<el-col class="assSwitchItem_text" :span="19">运输过程中是否遵守危险货物运输管理的规定</el-col>
				<el-col class="assSwitchItem_switchArea" :span="5">
					<el-switch
						:disabled="userRole !== 'CSEP'"
						style="display: block"
						v-model="item.switchValue1"
						active-color="#13ce66"
						active-text="是"
						inactive-text="否"
						active-value="1"
						inactive-value="0"
						class="assSwitchItem_switch">
					</el-switch>
				</el-col>
			</el-row>
			<el-row class="assSwitchItem_row" :gutter="20">
				<el-col class="assSwitchItem_text" :span="19">是否按危险废物特性分类运输</el-col>
				<el-col class="assSwitchItem_switchArea" :span="5">
					<el-switch
						:disabled="userRole !== 'CSEP'"
						style="display: block"
						v-model="item.switchValue2"
						active-color="#13ce66"
						active-text="是"
						inactive-text="否"
						active-value="1"
						inactive-value="0"
						class="assSwitchItem_switch">
					</el-switch>
				</el-col>
			</el-row>
			<el-row class="assSwitchItem_row" :gutter="20">
				<el-col class="assSwitchItem_text" :span="19">是否委托运输</el-col>
				<el-col class="assSwitchItem_switchArea" :span="5">
					<el-switch
						:disabled="userRole !== 'CSEP'"
						style="display: block"
						v-model="item.switchValue3"
						active-color="#13ce66"
						active-text="是"
						inactive-text="否"
						active-value="1"
						inactive-value="0"
						class="assSwitchItem_switch">
					</el-switch>
				</el-col>
			</el-row>
			<el-row :gutter="20" class="assSwitchItem_row" >
				<el-col :span="12">
					<div class="assFromItem_title">单位名称</div>
					<div class="assFromItem_right">
						<el-input v-if="userRole=== 'CSEP'" v-model="item.compName" placeholder="必填"></el-input>
						<el-row v-else>{{item.compName}}</el-row>
					</div>
				</el-col>
				<el-col :span="12">
					<div class="assFromItem_title">运输资质</div>
					<div class="assFromItem_right">
						<el-input v-if="userRole=== 'CSEP'" v-model="item.compVal" placeholder="必填"></el-input>
						<el-row v-else>{{item.compVal}}</el-row>
					</div>
				</el-col>
			</el-row>
			<el-row :gutter="20" class="assSwitchItem_row">
				<div class="assTitleTextarea_title">运输过程中采取的污染防治措施（如自行运输危险废物的，还应包括工具种类、载重量、使用年限等）</div>
				<div class="assTitleTextarea_inputBg">
					<el-input v-if="userRole === 'CSEP'" type="textarea"
						:class="userRole !== 'CSEP' ? 'colorBlack': ''"
						:autosize="{ minRows: 4, maxRows: 6}"
						placeholder="必填(限500字)"
						v-model="item.textarea" class="assTitleTextarea_input" maxlength="500">
					</el-input>
					<el-input v-else type="textarea"
						:class="userRole !== 'CSEP' ? 'colorBlack': ''"
						:autosize="{ minRows: 4, maxRows: 6}"
						placeholder="必填(限500字)"
						v-model="item.textarea" class="assTitleTextarea_input" disabled maxlength="500">
					</el-input>
				</div>
			</el-row>
			<el-row v-if="userRole === 'CSEP'" class="assSwitchItem_rowBtn">
				<div class="assFromItem_iconBtnArea">
					<!-- <img v-if="index === formList.length - 1" @click="addSign" src="../../assets/images/plus.png">
					<img v-if="index > 0" @click="reduceSign(item)" src="../../assets/images/reduce.png"> -->
					<div v-if="index === formList.length - 1" @click="addSign">增加</div>
					<div v-if="index > 0" @click="reduceSign(item)">减少</div>
				</div>
			</el-row>
		</div>
	</div>
</template>
<script>
  export default {
		props: {
			formList: Array,
			userRole: String
		},
    data() {
      return {
        
      };
		},
		mounted: {
		},
    methods: {
			addSign() {
				let listItem = {};
				listItem.index = this.formList.length + 1;
				listItem.switchValue1 = "0"
				listItem.switchValue2 = "0"
				listItem.switchValue3 = "0"
				listItem.compName = ""
				listItem.compVal = ""
				listItem.textarea = ""
				this.formList.push(listItem)
			},
			reduceSign(item) {
				let myIndex = ""
				for(let i in this.formList) {
					if(this.formList[i].index === item.index){
						myIndex = i
					}
				}
				if(myIndex !== ""){
					this.formList.splice(myIndex, 1)
				}
			}
    }
  }
</script>
<style scoped>
#assTransferFrom{
	width: 100%;
	float: left;
}
.assTransferFrom_bg{
	width: 100%;
	float: left;
	/* height: 174px; */
	border-radius: 5px;
	background: #f3f5f7;
	box-shadow: 1px 1px 5px #989898;
	margin-bottom: 16px;
}

.assSwitchItem_row{
	/* height: 42px; */
	/* margin-top: 24px; */
	width: 100%;
	margin: 0!important;
	margin-top: 24px!important;
	float: left;
}
.assSwitchItem_rowBtn{
	width: 100%;
	margin: 0!important;
	float: left;
}
.assFromItem_itemRow{
	display: flex;
	font-size: 16px;
	/* justify-content: flex-end; */
	padding-right: 16px;
	flex-direction: row;
	align-items: center;
}
.assFromItem_col{
	/* height: 42px; */
	margin-top: 24px;
}
.assFromItem_title{
	line-height: 42px;
	/* padding: 0 10px; */
	width: 130px;
	min-width: 130px;
	box-sizing: border-box;
}
.assFromItem_titleSingle{
	line-height: 42px;
	padding: 0 10px;
	box-sizing: border-box;
	min-width: 130px;
}
.unitShow{
	line-height: 42px;
}
.assFromItem_iconBtnArea{
	text-align: right;
	width: 100%;
	padding-right: 16px;
	box-sizing: border-box;
	height: 40px;
	line-height: 40px;
	margin-top: 24px;
}
.assFromItem_iconBtnArea >div{
	font-size: 14px;
	color: #13ce66;
	float: right;
	width: 30px;
	padding: 0 4px;
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
.colorGreen {
	 color: rgba(67,182,122);
}
.colorBlack textarea{
	color: #000!important;
}
.assTitleTextarea_input{
	width: 100%;
	float: left;
}
.assTitleTextarea_title{
	width: 100%;
	font-size: 16px;
	padding: 6px 10px 12px;
	float: left;
	box-sizing: border-box;
}
.assTitleTextarea_inputBg{
	width: 100%;
	float: left;
	padding: 0 10px;
	box-sizing: border-box;
}
</style>