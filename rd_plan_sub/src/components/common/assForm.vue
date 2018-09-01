<template>
	<div id="assForm">
		<div class="assForm_bg" v-for="(item, index) in formList" :key="index">
			<el-row class="assFromItem_row">
				<el-col class="assFromItem_col" :span="12">
					<el-row v-if="listType === 'top'" class="assFromItem_itemRow">
						<div class="assFromItem_title">原辅材料名称</div>
						<div class="assFromItem_right">
							<el-input v-model="item.first" placeholder="必填"></el-input>
						</div>
					</el-row>
					<el-row v-else-if="listType === 'middle'" class="assFromItem_itemRow">
						<div class="assFromItem_title">设备名称</div>
						<div class="assFromItem_right">
							<el-input v-model="item.first" placeholder="必填"></el-input>
						</div>
					</el-row>
					<el-row v-else-if="listType === 'bottom'" class="assFromItem_itemRow">
						<div class="assFromItem_title">产品名称</div>
						<div class="assFromItem_right">
							<el-input v-model="item.first" placeholder="必填"></el-input>
						</div>
					</el-row>
				</el-col>
				<el-col class="assFromItem_col" :span="12">
					<el-row class="assFromItem_itemRow">
						<div class="assFromItem_title">单位</div>
						<div v-if="listType === 'middle'" class="assFromItem_right">
							<el-select placeholder="吨/年">
								<el-option
								  v-model="item.second"
									v-for="uItem in units"
									:key="uItem.value"
									:label="uItem.label"
									:value="uItem.value">
								</el-option>
							</el-select>
						</div>
						<div v-else class="assFromItem_right unitShow">元</div>
					</el-row>
				</el-col>
			</el-row>
			<el-row class="assFromItem_row">
				<el-col class="assFromItem_col" :span="12">
					<el-row v-if="listType === 'top'" class="assFromItem_itemRow">
						<div class="assFromItem_title">上年度消耗量</div>
						<div class="assFromItem_right">
							<el-input v-model="item.third" placeholder="必填"></el-input>
						</div>
					</el-row>
					<el-row v-else-if="listType === 'middle'" class="assFromItem_itemRow">
						<div class="assFromItem_title">上年度数量</div>
						<div class="assFromItem_right">
							<el-input v-model="item.third" placeholder="必填"></el-input>
						</div>
					</el-row>
					<el-row v-else-if="listType === 'bottom'" class="assFromItem_itemRow">
						<div class="assFromItem_title">上年度产量</div>
						<div class="assFromItem_right">
							<el-input v-model="item.third" placeholder="必填"></el-input>
						</div>
					</el-row>
				</el-col>
				<el-col class="assFromItem_col" :span="12">
					<el-row v-if="listType === 'top'" class="assFromItem_itemRow">
						<div class="assFromItem_title">本年度计划消耗量</div>
						<div class="assFromItem_right">
							<el-input v-model="item.fourth" placeholder="必填"></el-input>
						</div>
					</el-row>
					<el-row v-else-if="listType === 'middle'" class="assFromItem_itemRow">
						<div class="assFromItem_title">本年度数量</div>
						<div class="assFromItem_right">
							<el-input v-model="item.fourth" placeholder="必填"></el-input>
						</div>
					</el-row>
					<el-row v-else-if="listType === 'bottom'" class="assFromItem_itemRow">
						<div class="assFromItem_title">本年度计划产量</div>
						<div class="assFromItem_right">
							<el-input v-model="item.fourth" placeholder="必填"></el-input>
						</div>
					</el-row>
				</el-col>
			</el-row>
			<el-row class="assFromItem_row">
				<div class="assFromItem_iconBtnArea">
					<i v-if="index === formList.length - 1" @click="addSign" class="el-icon-plus"></i>
					<i v-if="index > 0" @click="reduceSign(item)" class="el-icon-minus"></i>
				</div>
			</el-row>
		</div>
	</div>
</template>
<script>
  export default {
		props: {
			formList: Array,
			listType: String
		},
    data() {
      return {
        units:[{
					label: "吨",
					value: "10"
				},{
					label: "年",
					value: "20"
				}]
      };
		},
		mounted: {
			
		},
    methods: {
			addSign() {
				let item = {};
				item.index = this.formList.length + 1;
				item.first = "";
				item.second = "";
				item.third = "";
				item.fourth = "";
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
<style scoped>
#assForm{
	width: 100%;
	float: left;
}
.assForm_bg{
	width: 100%;
	float: left;
	/* height: 174px; */
	border-radius: 5px;
	background: #f3f5f7;
	box-shadow: 1px 1px 5px #989898;
	margin-bottom: 16px;
}
.assFromItem_row{
	/* height: 42px; */
	margin-top: 24px;
}
.assFromItem_itemRow{
	display: flex;
	font-size: 16px;
	/* justify-content: flex-end; */
	padding-right: 16px;
}
.assFromItem_col{
	/* height: 42px; */
}
.assFromItem_title{
	line-height: 42px;
	padding: 0 15px;
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
}

</style>