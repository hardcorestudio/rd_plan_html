<template>
	<div id="assForm">
		<div class="assForm_bg" v-for="(item, index) in formList" :key="index">
			<el-row class="assFromItem_row">
				<el-col class="assFromItem_col" :span="fItem.isSingle ? '24' : '12'" v-for="fItem in item.itemList" :key="fItem" >
					<el-row class="assFromItem_itemRow">
						<div :class="fItem.isSingle ? 'assFromItem_titleSingle' : 'assFromItem_title'">{{fItem.title}}</div>
						<div v-if="type === 'label'" class="assFromItem_right">{{fItem.text}}</div>
						<div v-else>
							<div v-if="fItem.type === 'input'" class="assFromItem_right">
								<el-input v-model="fItem.text" placeholder="必填"></el-input>
							</div>
							<div v-else-if="fItem.type === 'select'" class="assFromItem_right">
								<el-select placeholder="吨/年" v-model="fItem.text">
									<el-option
										v-for="uItem in units"
										:key="uItem.value"
										:label="uItem.label"
										:value="uItem.value">
									</el-option>
								</el-select>
							</div>
							<div v-else-if="fItem.type === 'inputWithUnit'" class="assFromItem_right">
								<el-input v-model="fItem.text" placeholder="必填">
									<template slot="append">{{fItem.unit}}</template>
								</el-input>
							</div>
							<div v-else-if="fItem.type === 'unit'" class="assFromItem_right unitShow">{{fItem.text}}</div>
						</div>
					</el-row>
				</el-col>
			</el-row>
			<el-row v-if="type !== 'label'" class="assFromItem_row">
				<div class="assFromItem_iconBtnArea">
					<!-- <i v-if="index === formList.length - 1" @click="addSign" class="el-icon-plus"></i>
					<i v-if="index > 0" @click="reduceSign(item)" class="el-icon-minus"></i> -->
					<img v-if="index === formList.length - 1" @click="addSign" src="../../assets/images/plus.png">
					<img v-if="index > 0" @click="reduceSign(item)" src="../../assets/images/reduce.png">
				</div>
			</el-row>
		</div>
	</div>
</template>
<script>
  export default {
		props: {
			formList: Array,
			listType: String,
			type: String
		},
    data() {
      return {
        units:[{
					label: "吨",
					value: "吨"
				},{
					label: "年",
					value: "年"
				}],
      };
		},
		mounted: {
		},
    methods: {
			addSign() {
				let item = {};
				item.index = this.formList.length + 1;
				item.itemList = [];
				let arr = this.formList[0].itemList
				for(let i in arr){
					let arrItem = {}
					arrItem.type = arr[i].type
					arrItem.text = ""
					arrItem.title = arr[i].title
					item.itemList.push(arrItem)
				}
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
	/* margin-top: 24px; */
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
	padding: 0 15px;
	width: 130px;
}
.assFromItem_titleSingle{
	line-height: 42px;
	padding: 0 15px;
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

</style>