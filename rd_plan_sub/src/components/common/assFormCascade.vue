<template>
	<div id="assFormCascade">
		<div class="assFormCascade_bg" v-for="(item, index) in formList" :key="index">
			<el-row class="assFromItem_row">
				<div v-for="fItem in item.itemList" :key="fItem" >
					<el-col v-if="fItem.type!=='selectLevel' && fItem.type!=='selectLevelText' && fItem.type!=='selectLevelTwoText'" class="assFromItem_col" :span="fItem.isSingle ? '24' : '12'">
						<el-row class="assFromItem_itemRow">
							<div :class="fItem.isSingle ? 'assFromItem_titleSingle' : 'assFromItem_title'">{{fItem.title}}</div>
							<div v-if="type === 'label'" class="assFromItem_right">{{fItem.text}}</div>
							<div v-else class="assFromItem_right">
								<div v-if="fItem.type === 'input'">
									<el-input v-model="fItem.text" :placeholder="'必填' + fItem.limit ? '(限' + fItem.limit + '位)' : ''" :maxlength="fItem.limit ? fItem.limit : '500'"></el-input>
								</div>
								<div v-else-if="fItem.type === 'selectDIY'" class="assFromItem_unitBg">
									<el-select placeholder="请选择" v-model="fItem.text" class="assFromItem_unitBgSelect">
										<el-option
											v-for="uItem in cateList"
											:key="uItem.value"
											:label="uItem.label"
											:value="uItem.value">
										</el-option>
									</el-select>
								</div>
								<div v-else-if="fItem.type === 'select'" class="assFromItem_unitBg">
									<el-select placeholder="吨/个" v-model="fItem.text" @change="unitChange(item.index,fItem.text)" class="assFromItem_unitBgSelect">
										<el-option
											v-for="uItem in units"
											:key="uItem.value"
											:label="uItem.label"
											:value="uItem.value">
										</el-option>
									</el-select>
								</div>
								<div v-else-if="fItem.type === 'selectThree'" class="assFromItem_unitBg">
									<el-select placeholder="吨/个/公升" v-model="fItem.text" @change="unitChange(item.index,fItem.text)" class="assFromItem_unitBgSelect">
										<el-option
											v-for="uItem in unitsThree"
											:key="uItem.value"
											:label="uItem.label"
											:value="uItem.value">
										</el-option>
									</el-select>
								</div>
								<div v-else-if="fItem.type === 'inputWithUnit' || fItem.type === 'inputWithUnitSelect'">
									<el-input v-model="fItem.text" placeholder="必填(限10位)" type="number" maxlength="10">
										<template slot="append">{{fItem.unit}}</template>
									</el-input>
								</div>
								<div v-else-if="fItem.type === 'unit'" class="unitShow">{{fItem.text}}</div>
							</div>
						</el-row>
					</el-col>
					<el-col v-if="fItem.type==='selectLevelTwoText'" class="assFromItem_col" :span="fItem.isSingle ? '24' : '12'">
						<el-row class="assFromItem_itemRow">
							<div :class="fItem.isSingle ? 'assFromItem_titleSingle' : 'assFromItem_title'">{{fItem.title1}}</div>
							<div v-if="type === 'label'" class="assFromItem_right">{{fItem.text1}}</div>
							<div v-else class="assFromItem_right">
								<el-select placeholder="请选择" v-model="fItem.text1" @change="levelOneChange(fItem,item.index)" class="assFromItem_unitBgSelect">
									<el-option
										v-for="uItem in levelTwoData"
										:key="uItem.value"
										:label="uItem.label"
										:value="uItem.value">
									</el-option>
								</el-select>
							</div>
						</el-row>
					</el-col>
					<el-col v-if="fItem.type==='selectLevelTwoText'" class="assFromItem_col" span="12">
						<el-row	v-if="fItem.type==='selectLevelTwoText'" class="assFromItem_itemRow">
							<div :class="fItem.isSingle ? 'assFromItem_titleSingle' : 'assFromItem_title'">{{fItem.title2}}</div>
							<div class="assFromItem_right unitShow">{{fItem.text2}}</div>
						</el-row>
					</el-col>
					<el-col v-if="fItem.type==='selectLevelTwoText'" class="assFromItem_col" span="12">
						<el-row	v-if="fItem.type==='selectLevelTwoText'" class="assFromItem_itemRow">
							<div :class="fItem.isSingle ? 'assFromItem_titleSingle' : 'assFromItem_title'">{{fItem.title3}}</div>
							<div class="assFromItem_right unitShow">{{fItem.text3}}</div>
						</el-row>
					</el-col>
					<el-col v-if="fItem.type==='selectLevelText'" class="assFromItem_col" :span="fItem.isSingle ? '24' : '12'">
						<el-row class="assFromItem_itemRow">
							<div :class="fItem.isSingle ? 'assFromItem_titleSingle' : 'assFromItem_title'">{{fItem.title1}}</div>
							<div v-if="type === 'label'" class="assFromItem_right">{{fItem.text1}}</div>
							<div v-else class="assFromItem_right">
								<el-select placeholder="请选择" v-model="fItem.text1" @change="levelChange(fItem)" class="assFromItem_unitBgSelect">
									<el-option
										v-for="uItem in levelOneData"
										:key="uItem.value"
										:label="uItem.label"
										:value="uItem.value">
									</el-option>
								</el-select>
							</div>
						</el-row>
					</el-col>
					<el-col v-if="fItem.type==='selectLevelText'" class="assFromItem_col" :span="fItem.isSingle ? '24' : '12'">
						<el-row	v-if="fItem.type==='selectLevelText'" class="assFromItem_itemRow">
							<div :class="fItem.isSingle ? 'assFromItem_titleSingle' : 'assFromItem_title'">{{fItem.title2}}</div>
							<div class="assFromItem_right unitShow">{{fItem.text2}}</div>
						</el-row>
					</el-col>
				</div>
			</el-row>
			<el-row v-if="type !== 'label'" class="assFromItem_row">
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
			listType: String,
			type: String,
			levelOneData: Array,
			levelTwoData: Array,
			cateList: Array,
		},
    data() {
      return {
        units:[{
					label: "吨",
					value: "吨"
				},{
					label: "个",
					value: "个"
				}],
				unitsThree:[{
					label: "吨",
					value: "吨"
				},{
					label: "个",
					value: "个"
				},{
					label: "公升",
					value: "公升"
				}],
      };
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
					if(arr[i].type === "selectLevel" || arr[i].type === "selectLevelText"){
						arrItem.text1 = ""
						arrItem.title1 = arr[i].title1
						arrItem.text2 = ""
						arrItem.title2 = arr[i].title2
					}else if(arr[i].type === "selectLevelTwoText"){
						arrItem.text1 = ""
						arrItem.title1 = arr[i].title1
						arrItem.text2 = ""
						arrItem.title2 = arr[i].title2
						arrItem.text3 = ""
						arrItem.title3 = arr[i].title3
						if(arr[i].unit){
							arrItem.unit = arr[i].unit
						}
					}else{
						arrItem.text = ""
						arrItem.title = arr[i].title
						if(arr[i].unit){
							arrItem.unit = arr[i].unit
						}
						if(arr[i].limit){
							arrItem.limit = arr[i].limit
						}
					}
					if(arr[i].isSingle){
						arrItem.isSingle = arr[i].isSingle
					}
					
					item.itemList.push(arrItem)
				}
				this.formList.push(item);
			},
			reduceSign(item) {
				// let myFormList = [];
				// for(let i in this.formList) {
				// 	if(this.formList[i].index !== item.index){
				// 		myFormList.push(this.formList[i]);
				// 	}
				// }
				// this.formList = myFormList;

				let myIndex = ""
				for(let i in this.formList) {
					if(this.formList[i].index === item.index){
						myIndex = i
					}
				}
				if(myIndex !== ""){
					this.formList.splice(myIndex, 1)
				}
			},
			levelOneChange(item,index){
				for(let i in this.levelTwoData){
					if(this.levelTwoData[i].value === item.text1){
						item.text2 = this.levelTwoData[i].big_name
						item.text3 = this.levelTwoData[i].small_name
						if(item.unit && item.unit === '1'){
							for(let m in this.formList){
								if(this.formList[m].index === index){
									for(let j in this.formList[m].itemList){
										let formItem = this.formList[m].itemList[j]
										// if(formItem.type === "selectThree" || formItem.type === "select"){
										// 	formItem.text = this.levelTwoData[i].UNIT
										// }
										if(formItem.type === "inputWithUnitSelect"){
											formItem.unit = this.levelTwoData[i].UNIT
										}
									}
									break
								}
							}
						}
						break
					}
				}
			},
			levelChange(item){
				for(let i in this.levelOneData){
					if(this.levelOneData[i].value === item.text1){
						item.text2 = this.levelOneData[i].category
						break
					}
				}
			},
			unitChange(index,text) {
				for(let i in this.formList){
					if(this.formList[i].index === index){
						for(let j in this.formList[i].itemList){
							let item = this.formList[i].itemList[j]
							if(item.type === "inputWithUnitSelect"){
								item.unit = text
							}
						}
						break
					}
				}
			}
    }
  }
</script>
<style scoped>
#assFormCascade{
	width: 100%;
	float: left;
}
.assFormCascade_bg{
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
	min-width: 130px;
	box-sizing: border-box;
}
.assFromItem_titleSingle{
	line-height: 42px;
	padding: 0 15px;
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
.assFromItem_unitBg{
	width: 100%;
}
.assFromItem_unitBgSelect{
	width: 100%;
}
.assFromItem_right{
	flex: 1;
}
</style>