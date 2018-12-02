<template>
	<div id="assFormCascadeItem">
		<div class="assFormCascadeItem_bg">
			<el-row class="assFromItem_row">
				<!-- 单位名称块 -->
				<el-col class="assFromItem_col" span="24">
					<el-row class="assFromItem_itemRow">
						<div class="assFromItem_titleSingle">委托利用处置单位名称</div>
						<div v-if="type === 'label'" class="assFromItem_right">
							<div v-for="lItem in compList" :key="lItem.EN_ID_CZ" v-if="formItem.EN_ID_CZ && lItem.EN_ID_CZ === formItem.EN_ID_CZ">{{lItem.EN_NAME_CZ}}</div>
						</div>
						<div v-else class="assFromItem_right">
							<el-select placeholder="请选择" v-model="formItem.EN_ID_CZ" @change="compChange" class="assFromItem_unitBgSelect">
								<el-option
									v-for="uItem in compList"
									:key="uItem.EN_ID_CZ"
									:label="uItem.EN_NAME_CZ"
									:value="uItem.EN_ID_CZ">
								</el-option>
							</el-select>
						</div>
					</el-row>
				</el-col>
				<el-col class="assFromItem_col" span="24">
					<el-row	class="assFromItem_itemRow">
						<div class="assFromItem_titleSingle">许可证编号</div>
						<div class="assFromItem_right unitShow">{{formItem.LICENSE_NO}}</div>
					</el-row>
				</el-col>
				<!-- 废物名称块 -->
				<el-col class="assFromItem_col" span="24">
					<el-row class="assFromItem_itemRow">
						<div class="assFromItem_titleSingle">废物名称</div>
						<div v-if="type === 'label'" class="assFromItem_right">
							<div v-for="lItem in nameList" :key="lItem.D_NAME" v-if="lItem.D_NAME === formItem.D_NAME">{{lItem.D_NAME}}</div>
						</div>
						<div v-else class="assFromItem_right">
							<el-select placeholder="请选择" v-model="formItem.D_NAME" @change="nameChange" class="assFromItem_unitBgSelect">
								<el-option
									v-for="uItem in nameList"
									:key="uItem.D_NAME"
									:label="uItem.D_NAME"
									:value="uItem.D_NAME">
								</el-option>
							</el-select>
						</div>
					</el-row>
				</el-col>
				<el-col class="assFromItem_col" span="12">
					<el-row	class="assFromItem_itemRow">
						<div class="assFromItem_titleSingle">废物类别</div>
						<div class="assFromItem_right unitShow">{{formItem.BIG_CATEGORY_ID}}</div>
					</el-row>
				</el-col>
				<el-col class="assFromItem_col" span="12">
					<el-row	class="assFromItem_itemRow">
						<div class="assFromItem_titleSingle">废物代码</div>
						<div class="assFromItem_right unitShow">{{formItem.SAMLL_CATEGORY_ID}} {{formItem.SAMLL_CATEGORY_NAME}}</div>
					</el-row>
				</el-col>
				<el-col class="assFromItem_col" span="12">
					<el-row class="assFromItem_itemRow">
						<div class="assFromItem_title">利用处置方式</div>
						<div v-if="type === 'label'" class="assFromItem_right">{{formItem.HANDLE_TYPE}}</div>
						<div v-else class="assFromItem_right">
							<div class="assFromItem_unitBg">
								<el-select placeholder="请选择" v-model="formItem.HANDLE_TYPE" class="assFromItem_unitBgSelect">
									<el-option
										v-for="uItem in methodList"
										:key="uItem"
										:label="uItem"
										:value="uItem">
									</el-option>
								</el-select>
							</div>
						</div>
					</el-row>
				</el-col>
				<el-col class="assFromItem_col" span="24">	
					<el-row class="assFromItem_itemRow">
						<div class="assFromItem_title">本年度计划委托利用处置量</div>
						<div v-if="type === 'label'" class="assFromItem_right">{{formItem.YEAR_NUM}}</div>
						<div v-else class="assFromItem_right">
							<el-input v-model="formItem.YEAR_NUM" placeholder="必填(限10位)" type="number" maxlength="10" @input="numChange" oninput="if(value.length > 10)value=value.slice(0,10)">
								<template slot="append">{{formItem.UNIT}}</template>
							</el-input>
						</div>
					</el-row>
				</el-col>
				<el-col class="assFromItem_col" span="24">	
					<el-row class="assFromItem_itemRow">
						<div class="assFromItem_title">上年度实际委托利用处置量</div>
						<div v-if="type === 'label'" class="assFromItem_right">{{formItem.LAST_NUM}}</div>
						<div v-else class="assFromItem_right">
							<el-input v-model="formItem.LAST_NUM" placeholder="必填(限10位)" type="number" maxlength="10" @input="numChange" oninput="if(value.length > 10)value=value.slice(0,10)">
								<template slot="append">{{formItem.UNIT}}</template>
							</el-input>
						</div>
					</el-row>
				</el-col>
			</el-row>
			<el-row v-if="type !== 'label'" class="assFromItem_row">
				<div class="assFromItem_iconBtnArea">
					<div v-if="index === listLength - 1" @click="addSign">增加</div>
					<div @click="reduceSign">减少</div>
				</div>
			</el-row>
		</div>
	</div>
</template>
<script>
import { checkBrowser, getQueryString } from '../utils/browserCheck.js'
import fetch from '../utils/fetch.js'
  export default {
		props: {
			index: String,
			listLength: String,
			formItem: Object,
			type: String,
			compList: Array,
			nameList: Array,
			methodList: Array,
		},
    data() {
      return {
				
      };
		},
    methods: {
			addSign() {
				this.$emit('addSign')
			},
			reduceSign() {
				this.$emit('reduceSign',this.index)
				this.$emit('numChange')
			},
			compChange(){
				for(let i in this.compList){
					if(this.compList[i].EN_ID_CZ === this.formItem.EN_ID_CZ){
						this.formItem.EN_NAME_CZ = this.compList[i].EN_NAME_CZ
						this.formItem.LICENSE_NO = this.compList[i].LICENSE_NO
						break
					}
				}
				if(this.formItem.D_NAME && this.formItem.D_NAME != ""){
					//调用接口获取年度数据 TODO
					
					let queryJson = getQueryString()
					queryJson.D_NAME = this.formItem.D_NAME
					queryJson.EN_ID_CZ = this.formItem.EN_ID_CZ
					queryJson.UNIT = this.formItem.UNIT
					queryJson.BIG_CATEGORY_ID = this.formItem.BIG_CATEGORY_ID
					queryJson.SAMLL_CATEGORY_ID = this.formItem.SAMLL_CATEGORY_ID
					const loading = this.$loading({
						lock: true,
						text: 'Loading',
						spinner: 'el-icon-loading',
						background: 'rgba(0, 0, 0, 0.3)'
					});
					fetch({
						url: '/plan/getLastTBSum',
						method: 'POST',
						data: 'params=' + JSON.stringify(queryJson)
					}).then(res => {
						if (res.resFlag == '0') {
							let lastYear = res.last_unit_num
							this.formItem.LAST_NUM = lastYear

							this.$emit('numChange')
						} else {
							this.$notify.error({
								title: '失败',
								message: res.resMsg
							});
						}
						loading.close();
					})
				}
				
			},
			nameChange(){
				for(let i in this.nameList){
					if(this.nameList[i].D_NAME === this.formItem.D_NAME){
						this.formItem.BIG_CATEGORY_ID = this.nameList[i].BIG_CATEGORY_ID
						this.formItem.SAMLL_CATEGORY_ID = this.nameList[i].SAMLL_CATEGORY_ID
						this.formItem.BIG_CATEGORY_NAME = this.nameList[i].BIG_CATEGORY_NAME
						this.formItem.SAMLL_CATEGORY_NAME = this.nameList[i].SAMLL_CATEGORY_NAME
						this.formItem.UNIT = this.nameList[i].UNIT
						break
					}
				}
				if(this.formItem.EN_ID_CZ && this.formItem.EN_ID_CZ != ""){
					//调用接口获取年度数据 TODO

					let queryJson = getQueryString()
					queryJson.D_NAME = this.formItem.D_NAME
					queryJson.EN_ID_CZ = this.formItem.EN_ID_CZ
					queryJson.UNIT = this.formItem.UNIT
					queryJson.BIG_CATEGORY_ID = this.formItem.BIG_CATEGORY_ID
					queryJson.SAMLL_CATEGORY_ID = this.formItem.SAMLL_CATEGORY_ID
					const loading = this.$loading({
						lock: true,
						text: 'Loading',
						spinner: 'el-icon-loading',
						background: 'rgba(0, 0, 0, 0.3)'
					});
					fetch({
						url: '/plan/getLastTBSum',
						method: 'POST',
						data: 'params=' + JSON.stringify(queryJson)
					}).then(res => {
						if (res.resFlag == '0') {
							let lastYear = res.last_unit_num;
							this.formItem.LAST_NUM = lastYear

							this.$emit('numChange')
						} else {
							this.$notify.error({
								title: '失败',
								message: res.resMsg
							});
						}
						loading.close();
					})
				}
			},
			numChange(value){
				this.$emit('numChange')
			}
		}
  }
</script>
<style scoped>
#assFormCascadeItem{
	width: 100%;
	float: left;
}
.assFormCascadeItem_bg{
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